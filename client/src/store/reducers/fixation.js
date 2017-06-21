import {LOGIN, SERVER_LOGIN, LOGOUT, UPDATE_USER, SET_CANDIDATE, ADD_ITEM, ADD_LIKE,
        LOGIN_PENDING, UPDATE_MY_ITEMS, SET_FILTER, REFRESH_ITEMS, DELETE_ITEM, SET_SEARCH}
  from '../actions'
import update from 'immutability-helper';
import axios from 'axios'

const INITIAL_STATE = {
  clientLoggedIn: false,
  serverLoggedIn: false,
  loginPending: false,
  loginMethod: '',
  user: { username: '',
          screen_name: '',
          image: '',
          likedItems: []
        },
  fixes: [],
  myItems: [],
  filter: 'all',
/*    {_id: 1, img: '/img/dataviz_static.png', title: 'D3 visualization gallery', text: "A gallery of charts made with D3.js and react by genestd, hosted on github.", user: "testuser", thumbnail: "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"},
    {_id: 2, img: '/img/nflviz_static.png', title: "NFL Custom Charts", text: 'This is a D3.js app to let you play with charting different variables for NFL teams based on 2016 season data.', user: "testuser", thumbnail: "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"},
    {_id: 3, img: '/img/roguelike_static.png', title: "Roguelike Dungeon Crawler Game", text: 'A dungeon crawler game made for freeCodeCamp. Built on React and canvas, with custom homemade icons', user: "testuser", thumbnail: "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"},
    {_id: 4, img: '/img/simon_static.png', title: "Simon clone", text: 'Pure html/css/javascript version of Simon. Sounds produced through web audio API', user: "testuser", thumbnail: "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"},
  ],*/
  default_url: "https://placehold.it/100x200",
  candidate_image: '',
  searchterm: ''
}
function fixation(state=INITIAL_STATE, action){

  switch(action.type){
    case LOGIN:
      return Object.assign({}, state, action.payload)
      break
    case SERVER_LOGIN:
      return Object.assign({}, state, {serverLoggedIn: true})
      break
    case LOGOUT:
      return Object.assign({}, state, {clientLoggedIn: false, user:{}, serverLoggedIn: false})
      break
    case LOGIN_PENDING:
      return Object.assign({}, state, {loginPending: true})
      break
    case UPDATE_USER:
      return Object.assign({}, state, {user: Object.assign({}, action.payload)})
      break
    case SET_CANDIDATE:
      return Object.assign({}, state, {candidate_image: action.payload})
      break
    case ADD_ITEM:
      //action.payload is an array
      return update(state, {fixes: {$push: action.payload}})
      break
    case ADD_LIKE:
      for(var i=0; i<state.fixes.length;i++){
        if(state.fixes[i]._id === action.payload[0]){
          console.log(state, state.fixes[i])
          return update(state, {fixes: {[i]: {likes: {$apply: function(x){console.log(x);return ++x}}}},
                                              user: {likedItems: {$push: action.payload}}
                                             })
        }
      }
    case UPDATE_MY_ITEMS:
      return Object.assign({}, state, {myItems: action.payload})
      break
    case SET_FILTER:
      return Object.assign({}, state, {filter: action.payload})
      break
    case REFRESH_ITEMS:
      return update(state, {fixes: {$set: action.payload}})
      break
    case DELETE_ITEM:
      var item_to_delete = -1
      for( var i=0; i<state.myItems.length; i++){
        if(state.myItems[i]._id === action.payload){
          item_to_delete = i
        }
      }
      if( item_to_delete>=0){
        return update(state, {myItems: {$splice: [[item_to_delete, 1]]}})
      } else {
        return state
      }
    case SET_SEARCH:
      return Object.assign({}, state, {searchterm: action.payload})
      break
    default:
      return state
  }
}


export default fixation;
