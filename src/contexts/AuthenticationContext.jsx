import React, { useState } from "react";

export const AuthenticationContext = React.createContext({})

const AuthenticationProvider = ({ children }) => {
  const [signedInUsername, setSignedInUsername] = useState(sessionStorage.getItem('bonik-shop-user'))

  return (
    <AuthenticationContext.Provider value={{
      signedInUsername,
      setSignedInUsername
    }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export default AuthenticationProvider