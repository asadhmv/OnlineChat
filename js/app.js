function updateUsername(name) {
	var strong = document.createElement('strong');
	strong.textContent = name.toUpperCase();
	var username = document.querySelector('.username')
	username.appendChild(strong);
	username.setAttribute('id', name);
}

var loginUrl = "http://kevin-chapron.fr:8080/login";

const authData = {
	Code: 'HOSA24030200'
};

var authRequestOptions = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	body: JSON.stringify(authData)
};

fetch(loginUrl, authRequestOptions)
	.then(response => response.json())
	.then(data => {
		if (data.Token) {
			updateUsername(data.Name);
			const token = data.Token;

			var messagesUrl = "http://kevin-chapron.fr:8080/messages";

			var requestOptions = {
				method: 'GET',
				headers: {
					'Authorization': 'Basic ' + token
				}
			};


			fetch(messagesUrl, requestOptions)
				.then(response => response.json())
				.then(messages => {
					messages.forEach(element => {
						ajouterMessage(element);
					});
					scrollMessages();
					connectionWebSocket(token);
				});
		} else {
			throw new Error('Token d\'authentification non trouvé dans la réponse.');
		}
	})
	.catch(error => {
		console.error('Erreur :', error);
	});
