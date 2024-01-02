import React, { createContext } from 'react'
import { db } from './FirebaseAuth';
import { getDoc, limit, getCountFromServer ,collection, setDoc, getDocs, doc, serverTimestamp, query, where, orderBy, updateDoc, } from 'firebase/firestore';

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

   function buildQuery (currentCategory, currentPage = undefined) {

    const dbRef = collection(db, "posts")

    let postNumberPerPage = 5

    const wholeRef = ( 
      currentCategory === "All" ? 
      query(dbRef, orderBy('postIndex', 'desc')) : 
      query(dbRef, where("category", "==", currentCategory), orderBy('postIndex', 'desc')) 
      )
    
    if ( currentPage === undefined ) return wholeRef


    const partialRef = query(wholeRef, limit( postNumberPerPage * currentPage ))
    return partialRef
    
  }

  async function countDoc( ref ) {
    const snapshotForMaxPage = await getCountFromServer(ref)
    const result = snapshotForMaxPage.data().count
    console.log('count: ', result)
    return result
  }

  async function fetchArticles( ref ) {

    let postNumberPerPage = 5

    const dataList = []
    const querySnapshot = await getDocs(ref)

      const finalPagePostNum = querySnapshot.docs.length % postNumberPerPage
      const n = ( finalPagePostNum === 0 ? 5 : finalPagePostNum)

      const finalSnapshot = querySnapshot.docs.slice(-n)

      finalSnapshot.forEach((doc) => {
      const data = doc.data()
      dataList.push(data)
    })

    console.log(dataList)
    return dataList
  }

  const contextValue = {
    writePost,
    buildQuery,
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
