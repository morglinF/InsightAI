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


def build_prompt(question, insights):
    return f"""
You are a senior data analyst.

Answer using ONLY the data provided.

Question:
{question}

Data:
{json.dumps(insights, indent=2)}
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