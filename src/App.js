/* This example requires Tailwind CSS v2.0+ */
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './Context/AuthContext'
import Pages from './Pages'
import Header from './Components/Header'

import { Provider } from 'react-redux';
import { useStore } from './Store'

function App(pageProps) {
  const store = useStore(pageProps.initialReduxState)
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <BrowserRouter>
          <div className="h-screen bg-appbg">
            <Header/>
            <Pages {...pageProps}/>
          </div>
        </BrowserRouter>
      </Provider>
    </AuthContextProvider>
 )
}

export default App
