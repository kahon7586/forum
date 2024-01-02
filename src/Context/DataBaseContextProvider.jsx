import React, { createContext } from 'react'
import { db } from './FirebaseAuth';
import { getDoc, limit, getCountFromServer ,collection, setDoc, getDocs, doc, serverTimestamp, query, where, orderBy, updateDoc } from 'firebase/firestore';

export const DataBaseContext = createContext({});

export const DataBaseContextProvider = ({children}) => {

  async function getPostIndex() {
    const postIndexRef = doc(db, "variables", "postIndex")
    const snapshot = await getDoc(postIndexRef)
    const { Index } = snapshot.data()
    return Index
  }

  async function updatePostIndex() {
    const currentPostIndex = await getPostIndex() 
    const postIndexRef = doc(db, "variables", "postIndex")
    await updateDoc(postIndexRef, {
      Index: currentPostIndex + 1
    })
  }

  async function writePost( category, title, content ) {

    const TEST_USER = "anonymous"
    const postIndex = await getPostIndex()
    const postRef = doc(collection(db, "posts"))

    const articleData = {
      category: category,
      title: title,
      content: content,
      user: TEST_USER,
      postTime: serverTimestamp(),
      ID: postRef.id,
      postIndex: postIndex
    }

    try{
      await setDoc(postRef, articleData);
      await updatePostIndex()
      console.log("Document written with ID: ", postRef.id)
    }catch(error){
      console.log("Error adding document: ", error)
      throw error
    }
  }

  function buildRef (currentCategory, currentPage) {

    const dbRef = collection(db, "posts")
    const ref = ( currentCategory === "All" ? query(dbRef, orderBy('postTime', 'asc'), limit(5)) 
      : query(dbRef, where("category", "==", currentCategory), orderBy('postTime', 'asc'), limit(5)) )

    return ref
  }

  async function countDoc(ref) {
    const snapshotForMaxPage = await getCountFromServer(ref)
    const result = snapshotForMaxPage.data().count
    console.log('count: ', result)
    return result
  }

  async function fetchArticles( ref ) {

    await getPostIndex()


    const dataList = []
    const querySnapshot = await getDocs(ref)
    querySnapshot.forEach((doc) => {
      const data = doc.data()
      dataList.unshift(data)
    })

    console.log(dataList)
    return dataList
  }

  const contextValue = {
    writePost,
    buildRef,
    countDoc,
    fetchArticles,
  }

  return (
    <DataBaseContext.Provider value={contextValue}>
      {children}
    </DataBaseContext.Provider>
  )
}

export default DataBaseContextProvider
