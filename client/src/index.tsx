import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import App from './App'
import { AuthProvider } from './hooks/useAuth'
import { ContextProvider } from './hooks/useFollowing'
import './index.css'
import ApiService from './services/ApiService'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

ApiService.init()
ApiService.setHeader()

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ContextProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <App />
      </ContextProvider>
    </AuthProvider>
  </React.StrictMode>,
)
