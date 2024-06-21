(function() {
    function createWidget() {
        const container = document.createElement('div');
        container.style.border = '1px solid #000';
        container.style.padding = '10px';
        container.style.margin = '10px 0';

        const title = document.createElement('h3');
        title.innerText = 'Echo Widget';
        container.appendChild(title);

        const input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'Type something...';
        container.appendChild(input);

        const output = document.createElement('div');
        output.style.marginTop = '10px';
        container.appendChild(output);

        const sendButton = document.createElement('button');
        sendButton.innerText = 'Send';
        container.appendChild(sendButton);

        sendButton.addEventListener('click', function() {
            const data = {
                message: input.value,
                customer_id: '{{ customer.id }}',
                customer_email: '{{ customer.email }}'  
            };

            fetch('https://https://2677-105-233-51-198.ngrok-free.app/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.response) {
                    output.innerText = `Server response: ${data.response}`;
                } else {
                    output.innerText = `Error: ${data.error}`;
                }
            })
            .catch((error) => {
                console.error('Error:', error);
                output.innerText = 'Error sending data to server.';
            });
        });

        document.body.appendChild(container);
    }

    document.addEventListener('DOMContentLoaded', createWidget);
})();
