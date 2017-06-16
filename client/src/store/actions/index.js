/* Empty actions file */
export const LOGIN = 'LOGIN'
export const SERVER_LOGIN = 'SERVER_LOGIN'
export const LOGOUT = 'LOGOUT'
export const SERVER_LOGOUT = 'SERVER_LOGOUT'
export const LOGIN_PENDING = 'LOGIN_PENDINT'
export const UPDATE_USER = 'UPDATE_USER'
export const SET_CANDIDATE = 'SET_CANDIDATE'
export const ADD_ITEM = 'ADD_ITEM'
export const ADD_LIKE = 'ADD_LIKE'
export const DELETE_ITEM = 'DELETE_ITEM'
export const UPDATE_MY_ITEMS = 'UPDATE_MY_ITEMS'
export const SET_FILTER = 'SET_FILTER'
export const REFRESH_ITEMS = 'REFRESH_ITEMS'


export function login(mutations){
  return({
    type: LOGIN,
    payload: mutations
  })
}

export function serverLogin(){
  return({
    type: SERVER_LOGIN,
  })
}

export function logout(){
  return({
    type: LOGOUT
  })
}

export function serverLogout(){
  return({
    type: SERVER_LOGOUT
  })
}

export function updateUser(user){
  return({
    type: UPDATE_USER,
    payload: user
  })
}

export function setCandidate(url){
  return({
    type: SET_CANDIDATE,
    payload: url
  })
}

export function addItem(item){
  return({
    type: ADD_ITEM,
    payload: item
  })
}

export function addLike(item){
  return({
    type: ADD_LIKE,
    payload: item
  })
}

export function loginPending(){
  return({
    type: LOGIN_PENDING
  })
}

export function updateMyItems(items){
  return ({
    type: UPDATE_MY_ITEMS,
    payload: items
  })
}

export function setFilter(filter){
  return({
    type: SET_FILTER,
    payload: filter
  })
}

export function refreshItems(items){
  return({
    type: REFRESH_ITEMS,
    payload: items
  })
}

export function deleteItem(item){
  return({
    type: DELETE_ITEM,
    payload: item
  })
}
