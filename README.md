# InsightAI — Intelligent RAG Analytics Assistant

An AI-powered analytics and Retrieval-Augmented Generation (RAG) platform that allows users to upload datasets, generate insights, and interact with their data using natural language conversations.

Built with a modern SaaS-style architecture using React, FastAPI, OpenAI, LangChain, and ChromaDB.

---

# 🚀 Features

## ✅ AI Chat with Your Data

Upload datasets and ask questions in natural language.

Examples:

* “What are the top-selling products?”
* “Which days generated the most revenue?”
* “Are there unusual spending patterns?”
* “Summarize this dataset for an executive meeting.”

---

## ✅ Retrieval-Augmented Generation (RAG)

InsightAI uses semantic retrieval to ground AI responses in uploaded documents and datasets.

The system:

* chunks uploaded data
* generates embeddings
* stores vectors in ChromaDB
* retrieves relevant context
* sends retrieved context to the LLM

---

## ✅ AI-Generated Insights

Automatically generates:

* trends
* anomalies
* recommendations
* business summaries
* performance insights

---

## ✅ Streaming AI Responses

Responses stream token-by-token for a real ChatGPT-like experience.

---

## ✅ Dynamic Dataset Handling

The system is NOT tied to a specific CSV schema.

Users can upload:

* coffee sales
* retail analytics
* finance data
* inventory data
* marketing reports
* operational logs

The platform dynamically analyzes uploaded data structures.

---

## ✅ Modern SaaS UI

Includes:

* dark AI dashboard
* animated chat experience
* analytics panels
* insight cards
* responsive layout
* real-time streaming

---

# 🏗️ System Architecture

```text
                ┌────────────────────┐
                │     React UI       │
                │  SaaS Dashboard    │
                └─────────┬──────────┘
                          │
                          ▼
                ┌────────────────────┐
                │     FastAPI API    │
                │  Upload + Chat     │
                └─────────┬──────────┘
                          │
          ┌───────────────┼────────────────┐
          │                                │
          ▼                                ▼
┌──────────────────┐             ┌──────────────────┐
│   Analytics      │             │   RAG Pipeline   │
│   Engine         │             │                  │
└────────┬─────────┘             └────────┬─────────┘
         │                                 │
         ▼                                 ▼
┌──────────────────┐             ┌──────────────────┐
│ AI Insight Layer │             │ Chroma Vector DB │
└────────┬─────────┘             └────────┬─────────┘
         │                                 │
         └──────────────┬──────────────────┘
                        ▼
              ┌──────────────────┐
              │    OpenAI LLM    │
              └──────────────────┘
```

---

# 🧠 How RAG Works

## 1. File Upload

User uploads a CSV, PDF, or text document.

---

## 2. Document Processing

The backend:

* extracts text
* cleans data
* chunks large documents

---

## 3. Embedding Generation

Chunks are converted into vector embeddings using OpenAI embeddings.

---

## 4. Vector Storage

Embeddings are stored inside ChromaDB.

---

## 5. User Question

User asks a question through the chat UI.

---

## 6. Semantic Retrieval

The system:

* embeds the question
* searches vector DB
* retrieves the most relevant chunks

---

## 7. AI Response Generation

Retrieved context is injected into the LLM prompt to generate grounded responses.

---

# 🧰 Tech Stack

## Frontend

* React
* Tailwind CSS
* Framer Motion
* React Markdown

---

## Backend

* FastAPI
* SQLAlchemy
* SQLite

---

## AI / RAG

* LangChain
* ChromaDB
* OpenAI API
* OpenAI Embeddings

---

# 📂 Project Structure

```text
InsightAI/
│
├── backend/
│   ├── app/
│   │   ├── routes/
│   │   │   ├── upload.py
│   │   │   └── chat.py
│   │   │
│   │   ├── services/
│   │   │   ├── llm_engine.py
│   │   │   ├── insight_engine.py
│   │   │   └── rag/
│   │   │       ├── ingest.py
│   │   │       ├── retriever.py
│   │   │       ├── chunker.py
│   │   │       └── vector_store.py
│   │   │
│   │   ├── models/
│   │   │   ├── dataset.py
│   │   │   └── insight.py
│   │   │
│   │   ├── schemas/
│   │   │   └── chat.py
│   │   │
│   │   └── main.py
│   │
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── analytics/
│   │   ├── chat/
│   │   └── context/
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Backend Setup

## 1. Create Virtual Environment

```bash
python -m venv venv
```

---

## 2. Activate Environment

### Windows

```bash
venv\Scripts\activate
```

### Mac/Linux

```bash
source venv/bin/activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Configure Environment Variables

Create `.env`

```env
OPENAI_API_KEY=your_api_key_here
```

---

## 5. Start Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://localhost:8000
```

---

# ⚙️ Frontend Setup

## 1. Install Dependencies

```bash
npm install
```

---

## 2. Start Frontend

```bash
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

# 📡 API Endpoints

## Upload Dataset

```http
POST /upload
```

Uploads CSV/PDF files.

---

## Chat with Dataset

```http
POST /chat-stream
```

Streams AI responses using RAG retrieval.

---

## Fetch Latest AI Insight

```http
GET /latest-insight/{file_id}
```

Returns latest generated AI insight.

---

# 🧠 Example Workflow

## Upload CSV

```csv
date,coffee_name,money
2024-03-01,Latte,38.7
2024-03-01,Americano,28.9
```

---

## Ask Questions

```text
What product generates the highest revenue?
```

```text
What trends can you identify?
```

```text
Summarize this dataset for stakeholders.
```

---

# 🎯 Recruiter Highlights

This project demonstrates:

## AI Engineering Skills

* LLM integration
* prompt engineering
* semantic retrieval
* embeddings
* vector databases
* streaming AI systems

---

## Backend Engineering

* FastAPI architecture
* API design
* async streaming
* SQLAlchemy ORM
* data pipelines

---

## Frontend Engineering

* modern React architecture
* state management
* streaming UI
* responsive SaaS interfaces

---

## Data Engineering

* dynamic CSV ingestion
* preprocessing
* chunking
* AI-ready pipelines

---

# 🔥 Future Improvements

* multi-document retrieval
* PDF support
* citation rendering
* conversational memory
* Pinecone integration
* authentication
* cloud deployment
* Docker support
* WebSocket streaming
* hybrid search
* anomaly detection models

---

# 📸 Suggested Demo Flow

1. Upload dataset
2. Ask business questions
3. Show streaming AI responses
4. Open analytics panel
5. Show AI-generated insights
6. Demonstrate semantic retrieval
7. Explain RAG architecture

---

# 👨‍💻 Author

Morglin Olivier
Full Stack & AI-Focused Software Engineer
Johannesburg, South Africa
 
LinkedIn: [LinkedIn Profile](https://www.linkedin.com/in/morglin-olivier/)

GitHub: [GitHub Profile](https://github.com/morglinF)
