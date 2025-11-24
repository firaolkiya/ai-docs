# PowerShell helper: install frontend deps and start Vite dev server

# ensure we're at repo root
Set-Location -Path "$(Resolve-Path .)"

# Install and run
npm install
npm run dev
