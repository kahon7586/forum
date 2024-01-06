import React,{ useState, useEffect} from 'react'
import './LoginSignInModal.css'

const LoginForm = ( {currentMode} ) => {

  if(currentMode !== 'login') return null
  

  return (
    <form>
      <div className="mb-3">
        <label className="form-label" htmlFor="Login-Email">E-mail</label>
        <input className="form-control" type="email" id='Login-Email' placeholder='Enter your E-mail' />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="Login-Password">Password</label>
        <input className="form-control" type="password" id='Login-Password' placeholder='Enter your password' />
      </div>
      <div className="wrapper mt-5 d-flex justify-content-center" >
        <button className='btn btn-primary' type='button'>Login</button>
      </div>
    </form>
  )

}


const LoginBtn = () => {

  const [currentMode, setCurrentMode] = useState('login')

  function onClickLogin() {
    setCurrentMode('login')
  }

  function onClickSignIn() {
    setCurrentMode('signIn')
  }


  useEffect(() => {
    console.log('current mode:' + currentMode)
  })

  return (
    <div className="wrapper">
      <button className="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#LoginsignInModal">Login</button>
      <div className="modal" tabIndex="-1" id="LoginsignInModal">
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
            <div >SignIn</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default LoginBtn