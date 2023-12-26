import React, { createContext } from 'react'
import { db } from './FirebaseAuth';
import { ref, set } from "firebase/database";

export const DataBaseContext = createContext({});

export const DataBaseContextProvider = ({children}) => {

  function writeArticle( category, title, content ) {

    const articleId = Date.now()

    set(ref(db, 'articles/' + articleId), {
      category: category,
      title: title,
      content: content
    });
  }

  const contextValue = {
    writeArticle
  }

  return (
    <DataBaseContext.Provider value={contextValue}>
      {children}
    </DataBaseContext.Provider>
  )
}

export default DataBaseContextProvider
