/* Empty actions file */
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE_USER = 'UPDATE_USER'

export function login(network){
  return({
    type: LOGIN,
    payload: network
  })
}

export function logout(){
  return({
    type: LOGOUT
  })
}
export function updateUser(user){
  return({
    type: UPDATE_USER,
    payload: user
  })
}
