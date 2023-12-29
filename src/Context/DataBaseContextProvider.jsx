import React, { createContext } from 'react'
import { db } from './FirebaseAuth';
import { ref, set, get } from "firebase/database";
import Card from '../Components/Card/Card';

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

  async function readArticle( setState ) {

    get(ref(db, 'articles')).then((snapshot) => {
      if(snapshot.exists()){
        const result = snapshot.val()
        console.log(result)

        let temp = []
        for (const [ID, {category, title, content}] of Object.entries(result)) {
          const component = <Card info={ {category, title, content} } key={ID}/>
          temp.push(component)
        }

        setState(temp)
      }else{
        console.log("No data")
        setState(null)
      }
    }).catch((error) => {
      console.log(error)
    })
  }

  const contextValue = {
    writeArticle,
    readArticle
  }

  return (
    <DataBaseContext.Provider value={contextValue}>
      {children}
    </DataBaseContext.Provider>
  )
}

export default DataBaseContextProvider
