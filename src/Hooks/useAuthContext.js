import { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'

const useAuthContext = () => {
  const { authState, login, logout } = useContext(AuthContext)
  return {
    authState,
    login,
    logout,
  }
}

export default useAuthContext
