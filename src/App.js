/* This example requires Tailwind CSS v2.0+ */
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout'
import AuthContextProvider from './Context/AuthContext'
import Pages from './Pages'

import { Provider } from 'react-redux';
import { useStore } from './Store'

function App(pageProps) {
  const store = useStore(pageProps.initialReduxState)
  return (
    <AuthContextProvider>
      <Provider store={store}>
        <Layout>
          <BrowserRouter>
            <Pages {...pageProps}/>
          </BrowserRouter>
        </Layout>
      </Provider>
    </AuthContextProvider>
 )
}

export default App
