# PowerShell helper: create venv, install deps, and run backend

# Change into backend folder
Set-Location -Path "backend/ai-docs-chat"

# Create venv if missing
if (-Not (Test-Path -Path ".venv")) {
    python -m venv .venv
}

# Allow script execution for the process
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force

# Activate venv
. .\.venv\Scripts\Activate.ps1

# Install requirements
pip install -r requirements.txt

# Start uvicorn
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
