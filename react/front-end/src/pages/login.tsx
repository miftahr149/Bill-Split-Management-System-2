import '../assets/css/login.css'
import favicon from '../assets/img/favicon.png'

const Login = () => {
  return (
    <>
      <div className="login d-flex">
        <div className="login--form box d-flex flex-column">
          <div className="form--header d-flex">
            <div className="header--left">
              <img src={favicon} alt="" />
            </div>
            <div className="header--right">
              <h1>Bill Split Management System</h1>
              <p>Login Page</p>
            </div>
          </div>
          <form className="form--body" method="POST">
            <div className="field d-flex flex-column">
              <label htmlFor="username">Username</label>
              <input type="text" placeholder="username" />
            </div>
            <div className="field d-flex flex-column">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="password" />
            </div>
            <div className="d-flex justify-content-center align-items-center">
              <input className="login-button btn btn-success" type="submit" value="Login" />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login