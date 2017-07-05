import fetch from 'isomorphic-fetch'
import * as types from './mutation-types'

const login = ({ commit }, creds) => {
  commit(types.LOGIN) // show spinner
  return fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json'
//      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(creds)
  })
    .then((response) => {
      if (response.status === 200) {
        response.json().then(json => commit(types.LOGIN_SUCCESS, json))
      }
    })
}

const logout = ({ commit }) => {
  localStorage.removeItem('token')
  commit(types.LOGOUT)
}

export default {
  [types.LOGIN]: login,
  [types.LOGOUT]: logout
}

