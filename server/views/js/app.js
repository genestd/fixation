$(document).foundation()

hello.init({
	twitter: 'xDrgVrRCgfGQgh5aiEm2DXuT8',
}
);


function checkLoginStatus(session){
	var currentTime = (new Date()).getTime() / 1000;
	//console.log(session, currentTime)
	return session && session.access_token && session.expires > currentTime;
};
