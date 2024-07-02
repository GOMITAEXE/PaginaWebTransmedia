document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("message-form");
    const messagesDiv = document.getElementById("forum-messages");

    // Función para cargar los mensajes desde el servidor
    async function loadMessages() {
        try {
            const response = await fetch('http://localhost:3000/messages');
            const messages = await response.json();
            messagesDiv.innerHTML = ""; // Limpiar el div de mensajes
            messages.forEach(message => {
                const messageElement = document.createElement("div");
                messageElement.innerHTML = `<strong>${message.username}</strong>: ${message.text}`;
                messagesDiv.appendChild(messageElement);
            });
        } catch (error) {
            console.error('Error al cargar los mensajes:', error);
        }
    }

    // Función para enviar un nuevo mensaje al servidor
    async function saveMessage(username, message) {
        try {
            const response = await fetch('http://localhost:3000/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, text: message })
            });
            const newMessage = await response.json();
            const messageElement = document.createElement("div");
            messageElement.innerHTML = `<strong>${newMessage.username}</strong>: ${newMessage.text}`;
            messagesDiv.appendChild(messageElement);
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
        }
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
            // Guardar el mensaje en el servidor
            saveMessage(username, message);

            // Limpiar los campos después de enviar el mensaje
            usernameInput.value = "";
            messageInput.value = "";
        } else {
            alert("Por favor, ingrese su nombre de usuario y mensaje.");
        }
    });
});
