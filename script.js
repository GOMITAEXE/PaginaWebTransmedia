document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("message-form");
    const messagesDiv = document.getElementById("forum-messages");

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

            // Limpiar los campos después de enviar el mensaje
            usernameInput.value = "";
            messageInput.value = "";
        } else {
            alert("Por favor, ingrese su nombre de usuario y mensaje.");
        }
    });
});
