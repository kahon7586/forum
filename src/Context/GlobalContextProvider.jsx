import React from 'react'
import DataBaseContextProvider from './DataBaseContextProvider'
import AuthContextProvider from './AuthContextProvider'
import PostboardContextProvider from './PostboardContextProvider'

const GlobalContextProvider = ( {children} ) => {
  return (
    <DataBaseContextProvider>
    <AuthContextProvider>
    <PostboardContextProvider>
      {children}
    </PostboardContextProvider>
    </AuthContextProvider>
    </DataBaseContextProvider>
  )
}

export default GlobalContextProvider
