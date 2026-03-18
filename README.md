\# AI Detector



\## Preview

![App Screenshot](https://raw.githubusercontent.com/Shakies200/ai-detector/main/docs/API.png)


Full-stack tool to analyze text and files (PDF, DOCX, Images) and estimate likelihood of AI-generated content.



\## Features

\- Text analysis

\- File upload \& extraction

\- Structured output (score, verdict, explanation, highlights) 



\## Stack

\- React + Vite (frontend)

\- Express (backend)

\- Zod (validation)

\- OpenAI API

Make sure Node.js (v18+) and pnpm are installed:

# Install pnpm if not already installed
`npm install -g pnpm`

# Install all packages
`pnpm install `

#Create a .env file inside artifacts/api-server/:

`OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxx`

\## Run the App

The first method

`pnpm install`

`cd artifacts/api-server \&\& pnpm dev`

`cd ../ai-detector \&\& pnpm dev`

If that doesn't work, try the second method.

Open two terminal windows:

Terminal 1 — Backend:

`pnpm --filter @workspace/api-server run dev`

Terminal 2 — Frontend:

`pnpm --filter @workspace/ai-detector run dev`
Then open your browser at: http://localhost:5173





