import { createContext, useCallback, useLayoutEffect, useReducer } from 'react'
import Api from '../Api/Api'

const storedToken = localStorage.getItem('token')
const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
}
const initialState = {
  token: storedToken || null,
}

const authReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        token: payload.token,
      }
    case actionTypes.LOGOUT:
      return {
        ...state,
        token: null,
      }
    default:
      return state
  }
}

export const AuthContext = createContext(initialState)

const reducer = (state, action) => authReducer(state, action)

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(reducer, initialState)
  useLayoutEffect(() => {
    const setToken = async () => {
      await Api.setAccessToken(authState.token)
    }
    if (authState.token) {
      setToken()
    }
  }, [authState.token])

  const login = useCallback(async (payload) => {
    
    await Api.setAccessToken(payload.token)
    dispatch({
      type: actionTypes.LOGIN,
      payload,
    })
    localStorage.setItem('token', payload.token)
  }, [])

  const logout = useCallback(async () => {
    dispatch({
      type: actionTypes.LOGOUT,
    })
    localStorage.removeItem('token')
  }, [])

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  )
}
//read about callback
// AuthContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// }

export default AuthContextProvider
