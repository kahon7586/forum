import React from 'react'
import DataBaseContextProvider from './DataBaseContextProvider'
import AuthContextProvider from './AuthContextProvider'

const GlobalContextProvider = ( {children} ) => {
  return (
    <AuthContextProvider>
    <DataBaseContextProvider>
      {children}
    </DataBaseContextProvider>
    </AuthContextProvider>
  )
}

export default GlobalContextProvider
