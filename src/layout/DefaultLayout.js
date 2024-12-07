import React from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = ({token, onLogout, userAuth}) => {
  return (
    <div>
      <AppSidebar token={token}
                    userAuth={userAuth}
                    onLogout={onLogout}/>
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader token={token}
                    userAuth={userAuth}
                    onLogout={onLogout}/>
        <div className="body flex-grow-1">
          <AppContent token={token}
                    userAuth={userAuth}
                    onLogout={onLogout}/>
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
