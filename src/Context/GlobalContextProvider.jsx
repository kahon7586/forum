import React from 'react'
import DataBaseContextProvider from './DataBaseContextProvider'

const GlobalContextProvider = ( {children} ) => {
  return (
    <DataBaseContextProvider>
      {children}
    </DataBaseContextProvider>
  )
}

export default GlobalContextProvider
