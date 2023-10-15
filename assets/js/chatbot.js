const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatbotToggle = document.querySelector(".chatbot-toggle");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;

const predefinedResponses = {
    "where are the portfolio details located": "The portfolio details are located on the Portfolio page. Click the link icon to access them.",
    "another user query": "The response to the query",
    "services": "Website Development, Website Design, Graphic Design",
    "graphic design": "We provide logo making.",
    "website development": "We can make a PHP Website",
    "website design": "We can make you a UI using Figma, with prototype",
    // Add more predefined responses as needed
};

const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const messageElement = incomingChatLi.querySelector("p");

    const userQuery = userMessage.toLowerCase();
    // Check for specific user query and provide predefined response
    if (userQuery in predefinedResponses) {
        messageElement.textContent = predefinedResponses[userQuery];
    } else {
        // If the query is not predefined, provide a default response
        messageElement.textContent = "I'm here to help. What's on your mind?";
    }

    chatbox.scrollTo(0, chatbox.scrollHeight);
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("close-btn"));
chatbotToggle.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
