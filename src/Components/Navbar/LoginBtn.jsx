import React,{ useState, useEffect, useRef} from 'react'
import './LoginSignInModal.css'
import { useAuth } from '../../Context/AuthContextProvider'

const MODE_LOGIN = 'login'
const MODE_SIGNIN = 'signIn'



const LoginForm = ( {currentMode} ) => {

  const { login } = useAuth()

  const [error, setError] = useState('')

  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  async function handleLogin() {

    const email = emailRef.current
    const password = passwordRef.current

    const inputElements = [email, password]

    function checkValidity() {

      let isFormValid = true

      inputElements.forEach(el => {
        if(!el.checkValidity()){
          el.classList.add('is-invalid')
          isFormValid = false
          el.addEventListener('focus', event=> {
            el.classList.remove('is-invalid')
          }, {once: true} )
        }
      })

      return isFormValid
    }

    if(checkValidity()){
        console.log('email value: ' + email.value)
        console.log('password value: ' + password.value)
        try{
          await login(email.value, password.value)
          console.log('login sucessed')

        }catch(error){
          if(error.code === 'auth/invalid-credential'){
            setError('Invalid Email or password, try again.')
            return
          }
          setError('error occured: ' + error.code)
        }
    }

  }
  

  if(currentMode !== MODE_LOGIN) {return null}

  return (
    <form noValidate >
      <div className="alert alert-danger mb-3" role='alert'>{error}</div>
      <div className="mb-3">
        <label className="form-label" htmlFor="Login-Email">E-mail</label>
        <input className="form-control " ref={emailRef} type="email" id='Login-Email' placeholder='Enter your E-mail' required />
        <div className="invalid-feedback">
          Invalid E-mail.
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="Login-Password">Password</label>
        <input className="form-control" ref={passwordRef} type="password" id='Login-Password' placeholder='Enter your password' required />
        <div className="invalid-feedback">
          Invalid password.
        </div>
      </div>
      <div className="wrapper mt-5 d-flex justify-content-center" >
        <button className='btn btn-primary' type='button' onClick={handleLogin}>Login</button>
      </div>
    </form>
  )
}

const SignInForm = ( {currentMode} ) => {

  const { createNewUser } = useAuth()

  const [error, setError] = useState('')

  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const passwordConfirmRef = useRef(null)

  async function handleSignIn() {

    const email = emailRef.current
    const password = passwordRef.current
    const passwordConfirm = passwordConfirmRef.current

    const inputElements = [email, password, passwordConfirm]

    if( password.value !== passwordConfirm.value ) {
      setError('Passwords not matched.')
      return
    }

    function checkValidity() {

      let isFormValid = true

      inputElements.forEach(el => {
        if(!el.checkValidity()){
          el.classList.add('is-invalid')
          isFormValid = false
          el.addEventListener('focus', event=> {
            el.classList.remove('is-invalid')
          }, {once: true} )
        }
      })

      return isFormValid
    }

    if(checkValidity()){
        console.log('email value: ' + email.value)
        console.log('password value: ' + password.value)
        try{
          await createNewUser(email.value, password.value)
          console.log('SignIn sucessed')

        }catch(error){
          if(error.code === 'auth/invalid-credential'){
            setError('Invalid Email or password, try again.')
            return
          }
          setError('error occured: ' + error.code)
        }
    }

  }
  

  if(currentMode !== MODE_SIGNIN) {return null}

  return (
    <form noValidate >
      <div className="alert alert-danger mb-3" role='alert'>{error}</div>
      <div className="mb-3">
        <label className="form-label" htmlFor="SignIn-Email">E-mail</label>
        <input className="form-control " ref={emailRef} type="email" id='SignIn-Email' placeholder='Enter your E-mail' required />
        <div className="invalid-feedback">
          Invalid E-mail.
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="SignIn-Password">Password</label>
        <input className="form-control" ref={passwordRef} type="password" id='SignIn-Password' placeholder='Enter your password' required />
        <div className="invalid-feedback">
          Invalid password.
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="SignIn-Password-Confirm">Password Confirm</label>
        <input className="form-control" ref={passwordConfirmRef} type="password" id='SignIn-Password-Confirm' placeholder='Confirm your password' required />
        <div className="invalid-feedback">
          Invalid password.
        </div>
      </div>
      <div className="wrapper mt-5 d-flex justify-content-center" >
        <button className='btn btn-primary' type='button' onClick={handleSignIn}>Sign In</button>
      </div>
    </form>
  )

}



const LoginBtn = () => {



  const [currentMode, setCurrentMode] = useState(MODE_LOGIN)


  function onClickLogin() {
    setCurrentMode(MODE_LOGIN)
  }

  function onClickSignIn() {
    setCurrentMode(MODE_SIGNIN)
  }


  useEffect(() => {
    console.log('current mode:' + currentMode)

  })

  return (
    <div className="wrapper">
      <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#LoginsignInModal">Login</button>
      <div className="modal " tabIndex="-1" id="LoginsignInModal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-center modal-header-loginsignIn">
            <input className="btn-check" type="radio" name="login-signIn" id="Login" onClick={onClickLogin} autoComplete="off" defaultChecked/>
            <label className="btn" htmlFor="Login">Login</label>
            <input className="btn-check" type="radio" name="login-signIn" id="signIn" onClick={onClickSignIn} autoComplete="off"/>
            <label className="btn" htmlFor="signIn">Sign In</label>
          </div>
          <div className="modal-body">
            <LoginForm currentMode={currentMode}/>
            <SignInForm currentMode={currentMode}/>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default LoginBtn