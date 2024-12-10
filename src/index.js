import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import { LoginProvider } from './context/login.context'
import { BlogProvider } from './context/blog.context'

import App from './App'
import store from './store'

createRoot(document.getElementById('root')).render(
  <LoginProvider>
    <BlogProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </BlogProvider>
  </LoginProvider>
)
