from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow requests from your GitHub Pages domain
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://vickbarca11.github.io"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

@app.post("/contact")
async def contact(name: str = Form(...), email: str = Form(...), message: str = Form(...)):
    print(f"New message from {name} ({email}): {message}")
    return {"status": "success", "message": "Message received!"}
