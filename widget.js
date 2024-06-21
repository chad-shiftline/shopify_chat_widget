(function() {
    let customerId = localStorage.getItem('customer_email');

    function createWidget() {
        const container = document.createElement('div');
        container.className = 'chat-widget';
        container.innerHTML = `
            <div class="chat-header">
                <h3>Echo Widget</h3>
            </div>
            <div class="chat-body">
                <div class="chat-messages" id="chat-messages"></div>
                <div class="chat-input">
                    <input type="text" id="message-input" placeholder="Type something...">
                    <button id="send-button">Send</button>
                </div>
            </div>
        `;
        
        const messagesContainer = container.querySelector('#chat-messages');
        const input = container.querySelector('#message-input');
        const sendButton = container.querySelector('#send-button');

        sendButton.addEventListener('click', function() {
            const message = input.value.trim();
            if (!message) return;

            if (!customerId) {
                const email = prompt('Please enter your email:');
                if (email && email.trim() !== '') {
                    customerId = email.trim();
                    localStorage.setItem('customer_email', customerId);
                } else {
                    alert('Email cannot be empty. Please try again.');
                    return;
                }
            }

            const data = {
                message: message,
                customer_id: customerId
            };

            fetch('https://50c5-105-233-51-198.ngrok-free.app/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                const responseMessage = data.response ? `Server response: ${data.response}` : `Error: ${data.error}`;
                appendMessage(responseMessage, 'server');
            })
            .catch((error) => {
                console.error('Error:', error);
                appendMessage('Error sending data to server.', 'server');
            });

            input.value = '';
        });

        document.body.appendChild(container);

        function appendMessage(message, sender) {
            const messageElement = document.createElement('div');
            messageElement.className = `message ${sender === 'server' ? 'server-message' : 'client-message'}`;
            messageElement.innerText = message;
            messagesContainer.appendChild(messageElement);
        }
    }

    document.addEventListener('DOMContentLoaded', createWidget);
})();
