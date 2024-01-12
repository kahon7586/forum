import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from './FirebaseAuth'
import { useDataBase } from './DataBaseContextProvider'


const AuthContext = createContext(null)

export function useAuth() {
  return useContext(AuthContext)
}

const AuthContextProvider = ({children}) => {

  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const { checkUserExist } = useDataBase()
  
  useEffect(() => {

 

    //Calling onAuthStateChanged() 
    //1. adds an observer/listener for changes to the user's sign-in state , AND
    //2. returns an unsubscribe function.

    //Unsubscribe funtion will remove the user state listener when being called

    //So this is how everything work:

    //1. <AuthContextProvider> is builded when app initialized
    //2. This useEffect is triggered. 
    //3. call onAuthStateChanged(), which add a listener to user state, and return a unsubcribe function into const varible unsubscribe.
    //4. When user state changed(ex: Sign in), listener triggered and set urrentUser with user. Noticed that this listener will keep existing because unsubcribe function is not being called.
    //5. In some case(not here), when app leave from AuthContextProvider, unsubcribe will be called as clean up function, and finally remove this listener.

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])


  useEffect(() => {
    if(currentUser){
      console.log('current user: ' + currentUser.email)

      checkUserExist(currentUser)

    }else{
      console.log('current user: ' + currentUser)
    }
  }, [currentUser, checkUserExist])

  function createNewUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  function login(email, password){
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    return signOut(auth)
  }


  const contextValue = {
    currentUser,
    createNewUser,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={contextValue} >
      {loading ? null : children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
