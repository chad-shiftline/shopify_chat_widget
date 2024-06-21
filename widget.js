(function() {
            function createWidget() {
            const container = document.createElement('div');
            container.style.border = '1px solid #000';
            container.style.padding = '10px';
            container.style.margin = '10px 0';
            container.style.position = 'fixed'; // Make it fixed to the bottom
            container.style.bottom = '0';
            container.style.width = '100%';
            container.style.backgroundColor = '#fff';
            container.style.zIndex = '1000'; // Ensure it's on top of other elements

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
                const data = { message: input.value };
                fetch('http://cpdev.pythonanywhere.com/api/message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    output.innerText = `You typed: ${input.value}`;
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
