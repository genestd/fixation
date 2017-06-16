$(document).foundation()

hello.init({
	twitter: 'xDrgVrRCgfGQgh5aiEm2DXuT8',
}
);


function checkLoginStatus(session){
	console.log(session)
	var currentTime = (new Date()).getTime() / 1000;
	return session && session.access_token && session.expires > currentTime;
};
