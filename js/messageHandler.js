function ajouterMessage(message) {
    if (message.From != 'Local') {
        var messages = document.getElementById('messages');
        var case_msg = document.createElement('div');
        case_msg.classList.add('case_msg');
        var msg = document.createElement('div');
        msg.classList.add('msg');
        if (message.From.toUpperCase() == document.querySelector('.username strong').textContent)
            msg.classList.add("my_msg");
        else
            msg.classList.add("others_msg");

        var strongElement = document.createElement('strong');
        strongElement.textContent = '(' + message.From + ') ';

        var emElement = document.createElement('em');
        emElement.textContent = '[' + message.Date.replace("T", "   ") + ']';

        msg.appendChild(emElement);
        msg.innerHTML += '<br>';
        msg.appendChild(strongElement);

        msg.appendChild(document.createTextNode(message.Text));
        case_msg.appendChild(msg)
        messages.appendChild(case_msg);
    }
}

function validerInput() {
    var messageInput = document.getElementById('messageInput');
    var message = messageInput.value
    if (length(message) == 0)
        return false;
}

function scrollMessages() {
    var messagesDiv = document.getElementById('messages');
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}