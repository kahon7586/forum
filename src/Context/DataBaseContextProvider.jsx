import React, { createContext } from 'react'
import { db } from './FirebaseAuth';
import { collection, setDoc, getDocs, doc } from 'firebase/firestore';

export const DataBaseContext = createContext({});

export const DataBaseContextProvider = ({children}) => {

  async function writeArticle( category, title, content ) {

    const TEST_USER = "anonymous"
    const currentTime = Date.now()
    const postRef = doc(collection(db, "posts"))

    const articleData = {
      category: category,
      title: title,
      content: content,
      user: TEST_USER,
      postTime: currentTime,
      ID: postRef.id
    }

    try{
      await setDoc(postRef, articleData);
      console.log("Document written with ID: ", postRef.id)
    }catch(error){
      console.log("Error adding document: ", error)
    }


  }

  async function fetchArticles( currentCategory , currentPage  ) {

    let dataList = []
    const querySnapshot = await getDocs(collection(db, "posts"))
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      console.log(data)
      dataList.unshift(data)
    })

    console.log(dataList)
    return dataList
  }

  const contextValue = {
    writeArticle,
    fetchArticles,
  }

  return (
    <DataBaseContext.Provider value={contextValue}>
      {children}
    </DataBaseContext.Provider>
  )
}

export default DataBaseContextProvider
