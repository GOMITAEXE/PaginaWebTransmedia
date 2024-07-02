document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("message-form");
    const messagesDiv = document.getElementById("forum-messages");

    // Función para cargar los mensajes desde localStorage
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem("forumMessages")) || [];
        messagesDiv.innerHTML = ""; // Limpiar el div de mensajes
        messages.forEach(message => {
            const messageElement = document.createElement("div");
            messageElement.innerHTML = `<strong>${message.username}</strong>: ${message.text}`;
            messagesDiv.appendChild(messageElement);
        });
    }

    // Función para guardar un mensaje en localStorage
    function saveMessage(username, message) {
        const messages = JSON.parse(localStorage.getItem("forumMessages")) || [];
        messages.push({ username, text: message });
        localStorage.setItem("forumMessages", JSON.stringify(messages));
    }

    // Cargar los mensajes al iniciar la página
    loadMessages();

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const usernameInput = document.getElementById("username");
        const messageInput = document.getElementById("message");

        const username = usernameInput.value;
        const message = messageInput.value;

        if (username.trim() !== "" && message.trim() !== "") {
            const messageElement = document.createElement("div");
            messageElement.innerHTML = `<strong>${username}</strong>: ${message}`;
            messagesDiv.appendChild(messageElement);

            // Guardar el mensaje en localStorage
            saveMessage(username, message);

            // Limpiar los campos después de enviar el mensaje
            usernameInput.value = "";
            messageInput.value = "";
        } else {
            alert("Por favor, ingrese su nombre de usuario y mensaje.");
        }
    });
});
