import './index.css'

const notFoundUrl =
  'https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'

const NotFound = () => (
  <div className="not_found_container">
    <img src={notFoundUrl} alt="not found" className="not_found_image" />
    <h1 className="not_found_heading">Page Not Found</h1>
    <p className="not_found_para">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
