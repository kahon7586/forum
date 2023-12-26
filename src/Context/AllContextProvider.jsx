import React from 'react'
import DataBaseContextProvider from './DataBaseContextProvider'

const AllContextProvider = ( {children} ) => {
  return (
    <DataBaseContextProvider>
      {children}
    </DataBaseContextProvider>
  )
}

export default AllContextProvider
