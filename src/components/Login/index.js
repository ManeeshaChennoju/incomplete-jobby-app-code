import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'

import './index.css'

const websiteLogoUrl = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitLoginForm = async event => {
    console.log('on submit cliked------')
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.setState({isError: true, errorMsg: data.error_msg})
    }
  }

  renderUsername = () => {
    const {username} = this.state
    return (
      <>
        <label className="form_labels" htmlFor="Username">
          USERNAME
        </label>

        <input
          id="Username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
          className="form_inputs"
        />
      </>
    )
  }

  renderPassword = () => {
    const {password} = this.state
    return (
      <>
        <label className="form_labels" htmlFor="Password">
          PASSWORD
        </label>

        <input
          id="Password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
          className="form_inputs"
        />
      </>
    )
  }

  render() {
    const {isError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="Login_container">
        <form
          className="login_form_container"
          onSubmit={this.onSubmitLoginForm}
        >
          <div className="logo_container">
            <img
              className="website_logo"
              src={websiteLogoUrl}
              alt="website logo"
            />
          </div>
          <div className="inputs_container">
            {this.renderUsername()}
            <br />
            {this.renderPassword()}
          </div>
          <div className="login_button_container">
            <button type="submit" className="login_button">
              Login
            </button>
          </div>
          {isError && <p className="error_msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
