import {LOGIN, LOGOUT, UPDATE_USER} from '../actions'

const INITIAL_STATE = {
  loggedIn: false,
  loginMethod: '',
  user: { username: '',
          screen_name: '',
          image: ''
        },
  fixes: [
    {_id: 1, img: '/img/dataviz_static.png', title: 'D3 visualization gallery', text: "A gallery of charts made with D3.js and react by genestd, hosted on github.", user: "testuser", thumbnail: "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"},
    {_id: 2, img: '/img/nflviz_static.png', title: "NFL Custom Charts", text: 'This is a D3.js app to let you play with charting different variables for NFL teams based on 2016 season data.', user: "testuser", thumbnail: "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"},
    {_id: 3, img: '/img/roguelike_static.png', title: "Roguelike Dungeon Crawler Game", text: 'A dungeon crawler game made for freeCodeCamp. Built on React and canvas, with custom homemade icons', user: "testuser", thumbnail: "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"},
    {_id: 4, img: '/img/simon_static.png', title: "Simon clone", text: 'Pure html/css/javascript version of Simon. Sounds produced through web audio API', user: "testuser", thumbnail: "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"},
  ]
}
function fixation(state=INITIAL_STATE, action){

  switch(action.type){
    case LOGIN:
      console.log('logging in')
      return Object.assign({}, state, {loggedIn: true, loginMethod: action.payload})
      break
    case LOGOUT:
      return Object.assign({}, state, {loggedIn: false, user:{}})
      break
    case UPDATE_USER:
      return Object.assign({}, state, {user: Object.assign({}, action.payload)})
    default:
      return state
  }
}
export default fixation;
