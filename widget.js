(function() {
    let customerId = localStorage.getItem('customer_email');

    function createWidget() {
        const container = document.createElement('div');
        container.className = 'chat-widget';
        container.innerHTML = `
            <style>
                .chat-widget {
                    width: 300px;
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    background-color: #fff;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    border: 1px solid #ccc;
                    border-radius: 8px;
                    font-family: Arial, sans-serif;
                }

                .chat-header {
                    background-color: #f0f0f0;
                    padding: 10px;
                    border-bottom: 1px solid #ccc;
                    border-top-left-radius: 8px;
                    border-top-right-radius: 8px;
                }

                .chat-body {
                    padding: 10px;
                }

                .chat-messages {
                    max-height: 200px;
                    overflow-y: auto;
                }

                .chat-input {
                    display: flex;
                    margin-top: 10px;
                }

                .chat-input input {
                    flex: 1;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px 0 0 4px;
                    outline: none;
                }

                .chat-input button {
                    padding: 8px 12px;
                    border: none;
                    background-color: #007bff;
                    color: #fff;
                    border-radius: 0 4px 4px 0;
                    cursor: pointer;
                    outline: none;
                }

                .message {
                    padding: 8px;
                    margin-bottom: 5px;
                    word-wrap: break-word;
                }

                .client-message {
                    background-color: #f0f0f0;
                    border-radius: 8px 8px 0 8px;
                    text-align: left;
                }

                .server-message {
                    background-color: #007bff;
                    color: #fff;
                    border-radius: 8px 8px 8px 0;
                    text-align: right;
                }
            </style>
            <div class="chat-widget">
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

            fetch('https://239b-105-233-51-198.ngrok-free.app/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                const responseMessage = data.response ? `Response: ${data.response}` : `Error: ${data.error}`;
                appendMessage(`${customerId}: ${message}`, 'client');
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
            if (sender === 'server') {
                messageElement.style.textAlign = 'right';
            }
            messagesContainer.appendChild(messageElement);
        }
    }

    document.addEventListener('DOMContentLoaded', createWidget);
})();
