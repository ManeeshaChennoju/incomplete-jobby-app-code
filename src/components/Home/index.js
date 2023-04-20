import Header from '../Header'
import './index.css'

const Home = props => {
  const onClickFind = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <div className="Home_container">
      <Header />
      <div className="content_container">
        <h1 className="content_heading">Find The Job That Fits Your Life </h1>
        <p className="content_para">
          Millions of people are searching for jobs, salary, information,
          company reviews. Find the job that fits your abilities and potential.
        </p>
        <div className="content_btn_container">
          <button className="find_button" type="button" onClick={onClickFind}>
            Find Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home
