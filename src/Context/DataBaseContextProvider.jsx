import React, { createContext, useContext } from 'react'
import { db } from './FirebaseAuth';
import { getDoc, limit, getCountFromServer ,collection, setDoc, getDocs, doc, serverTimestamp, query, where, orderBy, updateDoc, deleteDoc, } from 'firebase/firestore';

export const DataBaseContext = createContext({});

export function useDataBase() {
  return useContext(DataBaseContext)
}

export const DataBaseContextProvider = ({children}) => {

  async function checkUserExist ( user ) {
    const userRef = doc(db, "users", user.uid)
    try{
      const snapshot = await getDoc(userRef)
      if(snapshot.exists()){
        console.log('user data exist')
      }else{
        console.log('user data not exist, trying to build a new one.')
        await buildUserData(user)
        console.log('user data is now set')
      }
    }catch(error){
      console.log('error occured when checking user data exist: ' + error.code)
    }
    
  }

  async function buildUserData( user ) {
    const userRef = doc(db, "users", user.uid)

    const nickName = 'anonymous'

    const userData = {
      nickname: nickName,
      email: user.email,
      uid: user.uid,
      postsID:[]
    }

    await setDoc(userRef, userData)
  }

  async function updateUserData( user ) {
    const currentUserDataRef = doc(db, "users", user.uid)
    await updateDoc(currentUserDataRef, {
      test: true
    })
  }

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

  async function writePost( user, category, title, content ) {

    const postIndex = await getPostIndex()
    const postRef = doc(collection(db, "posts"))

    const articleData = {
      category: category,
      title: title,
      content: content,
      userInfo:{
        uid: user.uid,
        email: user.email
      },
      postTime: serverTimestamp(),
      id: postRef.id,
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

  async function deletePost( id ) {
    console.log('id: ' + id)
    const dbRef = doc(db, "posts", id)
    
    try{
      const postSnapshot = await getDoc(dbRef)
      console.log(postSnapshot.data())
      await deleteDoc(dbRef)
      console.log('post deleted')
    }catch(error){
      console.log('error occured when deleting post, error code: ' + error.code)
    }

  }

   function buildQuery (currentCategory = "All", currentPage = undefined) {

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

  function turnSnapshotIntoDataList ( snapshot ) {
    let resultDataList = []
    
    snapshot.forEach((doc) => {
      resultDataList.push(doc.data())
    })

    return resultDataList
  }

  async function getAllPostData () {
    const wholeRef = buildQuery()

    const allPostSnapshot = await getDocs(wholeRef)
    const dataList = turnSnapshotIntoDataList(allPostSnapshot)
    return dataList
  }

  async function countDoc( ref ) {
    const snapshotForMaxPage = await getCountFromServer(ref)
    const result = snapshotForMaxPage.data().count
    console.log('count: ', result)
    return result
  }

  async function getShownPost( ref ) {

    let postNumberPerPage = 5

    const querySnapshot = await getDocs(ref)

      const finalPagePostNum = querySnapshot.docs.length % postNumberPerPage
      const n = ( finalPagePostNum === 0 ? 5 : finalPagePostNum)

      const finalSnapshot = querySnapshot.docs.slice(-n)

      const dataList = turnSnapshotIntoDataList(finalSnapshot)

    console.log(dataList)
    return dataList
  }

  const contextValue = {
    writePost,
    buildQuery,
    countDoc,
    getShownPost,
    checkUserExist,
    updateUserData,
    deletePost,
    getAllPostData
  }

  return (
    <DataBaseContext.Provider value={contextValue}>
      {children}
    </DataBaseContext.Provider>
  )
}

export default DataBaseContextProvider
