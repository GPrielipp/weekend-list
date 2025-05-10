function validateLogin(event) {
	event.preventDefault();

	const form = new FormData(document.getElementById('loginForm'));
	const params = new URLSearchParams(form).toString();
	window.location.href = 'index.php?' + params;

	// fetch('./login_backend.php', {
	// 	method: 'POST',
	// 	headers: { 'Content-Type': 'application/json' },
	// 	body: JSON.stringify({
	// 		alpha: alpha,
	// 	}),
	// })
	// 	.then((response) => {
	// 		if (!response.ok) {
	// 			console.error(response.json());
	// 			throw new Error('Network response was not ok');
	// 		}
	// 		return response.json();
	// 	})
	// 	.then((data) => {
	// 		console.log(data);
	// 	})
	// 	.catch((error) => console.error('Error:', error));
}

// bring the form into focus
window.addEventListener('load', function () {
	this.document.getElementById('alpha').focus();
});
