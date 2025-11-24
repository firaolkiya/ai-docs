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


Backend (local dev)

1. Change into the backend folder:

```bash
cd backend/ai-docs-chat
```

2. Create a virtual environment and activate it.

Windows (PowerShell):
```powershell
python -m venv .venv
# if you get an execution policy error, run in an elevated PowerShell or:
# Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force
.\.venv\Scripts\Activate.ps1
```

Windows (Command Prompt / cmd.exe):
```bat
python -m venv .venv
call .venv\Scripts\activate
```

3. Install Python dependencies:

```bash
pip install -r requirements.txt
```

4. Create or copy a `.env` file in `backend/ai-docs-chat/` with the required keys (examples below). At minimum set `MONGO_URI` and `OPENAI_API_KEY`.

Example `backend/ai-docs-chat/.env`:
```
MONGO_URI=mongodb://localhost:27017
OPENAI_API_KEY=sk-...           # OpenAI API key (if using OpenAI)
GROK_API_KEY=...                # optional
PINECONE_API_KEY=...            # optional
HUGGINGFACE_API_KEY=...         # optional
PINECONE_INDEX_NAME=document-chat
SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=43200
```

5. Run the backend (dev mode with auto-reload):

PowerShell / cmd.exe (same command):
```bash
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

The API will be available at http://localhost:8000 and a health endpoint at `/health`.

Frontend (local dev)


Frontend (local dev)

1. From the project root (or `./` if you're already there), install dependencies and start Vite:

```bash
cd ./
npm install
npm run dev
# open http://localhost:5173/ (or the URL printed by Vite)
```

2. Windows notes — PowerShell / cmd.exe

PowerShell (recommended):
```powershell
cd .\
npm install
npm run dev
```

Command Prompt (cmd.exe):
```bat
cd .\
npm install
npm run dev
```

3. If you run the frontend in Docker or inside a container, ensure Vite binds to all interfaces so the host can reach it: start Vite with `--host 0.0.0.0` (the Compose suggestion earlier does this).

Windows helper scripts

To make it easier on Windows, this repo includes simple helper scripts you can run from the project root:

- `scripts\start-backend.ps1` — PowerShell script that creates/activates the venv, installs requirements and starts uvicorn.
- `scripts\start-frontend.ps1` — PowerShell script that runs `npm install` and `npm run dev`.
- `scripts\start-dev.bat` — Batch script for cmd.exe to start the backend (creates venv, installs deps) and the frontend.

Run PowerShell scripts from PowerShell (you may need to adjust execution policy):

```powershell
pwsh ./scripts/start-backend.ps1
pwsh ./scripts/start-frontend.ps1
```

Or with PowerShell (where pwsh is available):

```powershell
./scripts/start-backend.ps1
./scripts/start-frontend.ps1
```

Notes
- Make sure the `.env` file is present in `backend/ai-docs-chat/` (or the environment variables are exported) before starting the backend so services like Mongo and OpenAI are reachable.
- If you use Mongo locally, install and run MongoDB or point `MONGO_URI` to a running instance.
- For Windows users, adapt the activation command to your shell (`Activate.ps1` for PowerShell, `Activate` for cmd.exe).

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
