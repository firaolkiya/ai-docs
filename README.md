# Document Chat AI

A React application that allows users to upload documents and chat with an AI based on the document's content.

## ✨ Features

- 📄 **Upload multiple file types: PDF, DOCX, TXT (max 10MB)**
- 🤖 **Smart chat: AI responds based on document content**
- 🔍 **Accurate search: AI only uses information from uploaded documents**
- 💾 **API key storage: Automatically saves OpenAI API key in localStorage**
- 📱 **Responsive: User-friendly interface on all devices**


## 🛠 Technologies Used

# ai-docs-chat — Document Chat AI (short)

A small web app to upload documents and chat with an AI that uses the uploaded documents as its knowledge source.

Quick overview
- Frontend: React + Vite (development server)
- Backend: FastAPI (uvicorn) + MongoDB (Motor)
- Dev recommended: Docker Compose for local development

Repository layout (important files)

```
./
├─ backend/ai-docs-chat/     # FastAPI backend (Dockerfile, requirements.txt, src/)
│  └─ src/                   # backend source (main.py, routes, services, models)
├─ public/                   # static assets
├─ src/                      # frontend source (React + Vite)
│  ├─ components/
│  ├─ context/
│  ├─ services/
│  └─ pages/
├─ Dockerfile                 # frontend image (dev) in this repo
├─ docker-compose.yml         # recommended local orchestration (frontend + backend)
├─ package.json               # frontend npm scripts and deps
└─ README.md
```

Clone the repository

```bash
# clone (use the repo URL for this project)
git clone https://github.com/firaolkiya/ai-docs.git
cd ai-docs
```

Quick setup — Docker (recommended)

1. Install Docker and Docker Compose.

- Docker Desktop for Windows: https://docs.docker.com/desktop/windows/install/
- Linux / macOS: follow the platform docs at https://docs.docker.com/get-started/

2. Setup enviromental variables
The backend expects several environment variables. At minimum set `MONGO_URI` and `OPENAI_API_KEY` (and others if you use Pinecone / HuggingFace features). Create a `backend/ai-docs-chat/.env` (or set environment entries in your compose file) with values like:
```
MONGO_URI=mongodb://mongo:27017
OPENAI_API_KEY=sk-...           # OpenAI API key (if using OpenAI)
GROK_API_KEY=...                # optional, used in some services
PINECONE_API_KEY=...            # optional, if using Pinecone
HUGGINGFACE_API_KEY=...         # optional, if using HuggingFace
PINECONE_INDEX_NAME=document-chat
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200
```


3. From the project root run:

```bash
docker compose up --build
```

This will build and start the backend on http://localhost:8000 and the frontend dev server on http://localhost:5173.

Important: .env keys must be set


If you run MongoDB as a service in the same compose stack, point `MONGO_URI` to that service (e.g. `mongodb://mongo:27017`).


Local (without Docker)

Frontend:
```bash
cd ./
npm install
npm run dev
# open http://localhost:5173/
```

Backend:
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r backend/ai-docs-chat/requirements.txt
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

Notes
- The backend reads `MONGO_URI` from the environment (or a .env). If using Compose, add an env_file or environment entry pointing to your MongoDB. For example: `mongodb://mongo:27017` when running a Mongo container.
- Dev convenience: the frontend Docker setup may mount the project into the container — ensure `node_modules` are available (use a named volume for `/app/node_modules` if needed).
- For production, build a static frontend and serve with a static server (or behind a reverse proxy).

Troubleshooting
- If Vite reports `Local: http://localhost:5173` but the browser cannot connect, make sure Vite is started with `--host 0.0.0.0` so Docker can expose the port.

License
- MIT

If you want, I can expand this README with more details (environment variables, running tests, or a sample `.env`).
   - Verify your OpenAI API key
