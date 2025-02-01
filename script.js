const OPENAI_API_KEY = "your-api-key-here";

async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput) return;

    appendMessage("👤 Ви: " + userInput, "user");
    document.getElementById('user-input').value = "";

    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: userInput,
            max_tokens: 150
        })
    });

    const data = await response.json();
    const aiResponse = data.choices[0].text.trim();
    appendMessage("🤖 AI: " + aiResponse, "ai");
}

function appendMessage(text, sender) {
    const chatBox = document.getElementById('chat-box');
    const message = document.createElement("div");
    message.classList.add(sender);
    message.innerHTML = text;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
}
