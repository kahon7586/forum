import React from 'react'
import DataBaseContextProvider from './DataBaseContextProvider'
import AuthContextProvider from './AuthContextProvider'

const GlobalContextProvider = ( {children} ) => {
  return (
    <DataBaseContextProvider>
      <AuthContextProvider>
      {children}
      </AuthContextProvider>
    </DataBaseContextProvider>
  )
}

export default GlobalContextProvider
