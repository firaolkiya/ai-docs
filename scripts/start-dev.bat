@echo off
REM Batch helper: create backend venv, install deps, and start backend. Run from repo root (Windows cmd.exe)

cd backend\ai-docs-chat
if not exist .venv (
    python -m venv .venv
)
call .venv\Scripts\activate
pip install -r requirements.txt
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

REM To run frontend separately, open a new cmd window and run:
REM cd \path\to\repo
REM npm install
REM npm run dev
