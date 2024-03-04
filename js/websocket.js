
function sendMessage() {
    var messageInput = document.getElementById('messageInput');
    var message = messageInput.value;

    var messageToSend = {
        message: message
    };
    messageInput.value = '';
    return messageToSend;
    //socket.send(JSON.stringify(messageToSend));
}

function connectionWebSocket(token) {
    const socket = new WebSocket('ws://kevin-chapron.fr:8080/ws');
    socket.addEventListener('open', (event) => {
        console.log('Connexion WebSocket ouverte');
        var div = document.getElementById('interaction');

        div.classList.remove('hidden');
        div.classList.add('visible');

        setTimeout(() => {
            div.classList.remove('visible');
            div.classList.add('hidden');
            setTimeout(() => { div.style.display = 'none'; }, 1000);
        }, 1500);


        var authMessage = {
            auth: token
        };
        socket.send(JSON.stringify(authMessage));
    });


    socket.addEventListener('message', (event) => {
        var messageData = JSON.parse(event.data);
        ajouterMessage(messageData);
        scrollMessages();
    });

    var sendMessageButton = document.getElementById('sendMessageButton');
    var messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('keydown', function (event) {
        if (event.key === "Enter")
            socket.send(JSON.stringify(sendMessage()));

    });
    sendMessageButton.addEventListener('click', function () {
        socket.send(JSON.stringify(sendMessage()));
    });


    socket.addEventListener('close', (event) => {
        var div = document.getElementById('interaction');
        div.innerText = 'Connexion au WebSocket fermée';
        div.style.display = 'block';
        console.log('Connexion WebSocket fermée');
    });

    socket.addEventListener('error', (event) => {
        console.error('Erreur WebSocket:', event);
    });
}
