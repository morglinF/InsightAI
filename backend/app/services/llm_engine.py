from openai import OpenAI
import hashlib
import json

client = OpenAI()

# simple in-memory cache
LLM_CACHE = {}


def create_cache_key(question, insights):
    """
    Create a unique fingerprint for each request
    """
    raw = json.dumps({
        "question": question,
        "insights": insights
    }, sort_keys=True)

    return hashlib.md5(raw.encode()).hexdigest()


def build_prompt(question, context):

    return f"""
    You are InsightAI,
    an AI data assistant.

    Use ONLY the retrieved context below
    to answer the user's question.

    CONTEXT:
    {context}

    QUESTION:
    {question}

    If the answer is not present in context,
    say you do not know.
    """


def generate_llm_response(question, insights):

    cache_key = create_cache_key(question, insights)

    # 1. CACHE HIT
    if cache_key in LLM_CACHE:
        return {
            "response": LLM_CACHE[cache_key],
            "cached": True
        }

    # 2. CACHE MISS → call OpenAI
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "system",
                    "content": "You are a data analyst assistant."
                },
                {
                    "role": "user",
                    "content": build_prompt(question, insights)
                }
            ]
        )

        answer = response.choices[0].message.content

        # store in cache
        LLM_CACHE[cache_key] = answer

        return {
            "response": answer,
            "cached": False
        }

    except Exception as e:
        return {
            "response": f"Error generating response: {str(e)}",
            "cached": False
        }

def stream_llm_response(question, insights):

    prompt = build_prompt(question, insights)

    stream = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "You are a data analyst assistant."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        stream=True
    )

    for chunk in stream:

        delta = chunk.choices[0].delta.content

        if delta:
            yield delta