/* This example requires Tailwind CSS v2.0+ */
import { BrowserRouter } from 'react-router-dom'
import AuthContextProvider from './Context/AuthContext'
import Pages from './Pages'
import Header from './Components/Header'
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux';
import { useStore } from './Store'

function App(pageProps) {
  const store = useStore(pageProps.initialReduxState)
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <BrowserRouter>
        <SnackbarProvider maxSnack={3}>
            <div className="h-screen bg-appbg ">
              <Header/>
              <Pages {...pageProps}/>
            </div>
          </SnackbarProvider>
        </BrowserRouter>
      </Provider>
    </AuthContextProvider>
 )
}

export default App
