$(document).foundation()

hello.init({
	twitter: 'II7hpGaWFZ1n2dbpGzr59bxko',
}
);

hello.on('auth.login', function(auth) {
	// Call user information, for the given network
	console.log('hello auth login')
});

hello.on('auth.logout', function(auth) {
	// Call user information, for the given network
	console.log('hello auth logout')
});


function checkLoginStatus(session){
	var currentTime = (new Date()).getTime() / 1000;
	return session && session.access_token && session.expires > currentTime;
};
