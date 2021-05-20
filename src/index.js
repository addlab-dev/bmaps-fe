import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Api from './Api/Api'
import App from './App'
import reportWebVitals from './reportWebVitals'


// make sure to define api base url before rendering the app
const initApp = async () => {
    await Api.init({
      baseURL : process.env.REACT_APP_API_BASE_URL
    })
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
      document.getElementById('root'),
    )
}

;(async () => {
  await initApp()
})().catch((err) => {
  document.body.innerHTML = err.message
})



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
