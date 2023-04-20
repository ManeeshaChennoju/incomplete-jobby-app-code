import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {FaSuitcase} from 'react-icons/fa'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const navLogoUrl = 'https://assets.ccbp.in/frontend/react-js/logo-img.png'

const Header = props => {
  const onClickLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const onClickLogoutIcon = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="nav_container_desktop">
        <div className="nav_logo_container">
          <img src={navLogoUrl} alt="website logo" className="nav_logo_img" />
        </div>
        <div className="nav_items_container">
          <Link to="/" className="nav_link_items">
            <p className="nav_item">Home</p>
          </Link>
          <Link to="/jobs" className="nav_link_items">
            <p className="nav_item">Jobs</p>
          </Link>
        </div>

        <div className="logout_btn_container">
          <button
            className="logout_button"
            type="button"
            onClick={onClickLogoutBtn}
          >
            Logout
          </button>
        </div>
      </nav>

      <nav className="nav_container_mobile">
        <div className="nav_logo_container">
          <img src={navLogoUrl} alt="website logo" className="nav_logo_img" />
        </div>
        <div className="nav_icons_container">
          <Link to="/">
            <AiFillHome className="nav_icons" color="white" />
          </Link>
          <Link to="/jobs">
            <FaSuitcase className="nav_icons" color="white" />
          </Link>
          <button
            type="button"
            onClick={onClickLogoutIcon}
            className="logout_icon_btn"
          >
            <FiLogOut className="logout_icon_btn" />
          </button>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Header)
