/* This example requires Tailwind CSS v2.0+ */
import { BrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout'
import AuthContextProvider from './Context/AuthContext'
import Pages from './Pages'
function App() {

  return (
    <AuthContextProvider>
    <Layout>
     <BrowserRouter>
       <Pages/>
     </BrowserRouter>
      </Layout>
      </AuthContextProvider>
 )
}

export default App
