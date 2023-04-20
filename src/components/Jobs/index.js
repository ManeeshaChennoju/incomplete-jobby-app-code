import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {BsSearch} from 'react-icons/bs'
import {Component} from 'react'
import Header from '../Header'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const failureViewUrl =
  'https://assets.ccbp.in/frontend/react-js/failure-img.png'

const apiStatusViews = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    apiStatus: apiStatusViews.initial,
    profileDetails: {},
    isProfileFailure: false,
    isLoading: true,
    searchInput: '',
    employmentType: [],
    salaryType: '',
    jobsList: [],
    isChecked: false,
  }

  componentDidMount() {
    this.getProfile()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusViews.in_progress})
    const {employmentType, salaryType, searchInput} = this.state
    console.log(employmentType, '------------type')
    const employeeString = employmentType.join(',')
    console.log(employeeString, '----------------string')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeString}&minimum_package=${salaryType}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data, 'jobs list--------------')
      const updatedData = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({jobsList: updatedData, apiStatus: apiStatusViews.success})
    } else {
      this.setState({apiStatus: apiStatusViews.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.setState({apiStatus: apiStatusViews.in_progress}, this.getJobs)
  }

  handleCheckboxChange = event => {
    this.setState(prevState => ({
      employmentType: [...prevState.employmentType, event.target.value],
    }))
    // this.setState({employmentType: event.target.value})
    // const isChecked = event.target.checked
    // const checkedValue = event.target.value

    // this.setState({
    //   isChecked,
    //   employmentType: checkedValue,
    // })
  }

  handleRadioChange = event => {
    this.setState({salaryType: event.target.value})
  }

  getProfile = async () => {
    const profileApiUrl = `https://apis.ccbp.in/profile`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(profileApiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const profileData = data.profile_details
      const updatedData = {
        name: profileData.name,
        profileImageUrl: profileData.profile_image_url,
        shortBio: profileData.short_bio,
      }
      this.setState({
        profileDetails: updatedData,
        isLoading: false,
      })
    } else {
      this.setState({isProfileFailure: true}, this.getProfile)
    }
  }

  renderProfile = () => {
    const {profileDetails, isLoading} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <>
        {isLoading ? (
          <div className="profile_loader" data-testid="loader">
            <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
          </div>
        ) : (
          <div className="profile_container">
            <img
              className="profile_image"
              src={profileImageUrl}
              alt="profile"
            />
            <p className="profile_name">{name}</p>
            <p className="profile_bio">{shortBio}</p>
          </div>
        )}
      </>
    )
  }

  renderProfileViews = () => {
    const {isProfileFailure} = this.state
    return (
      <>
        {isProfileFailure ? (
          <div>
            <button type="button" className="retry_button">
              Retry
            </button>
          </div>
        ) : (
          this.renderProfile()
        )}
      </>
    )
  }

  renderTypesOfEmployment = () => {
    const {employmentType, isChecked} = this.state
    return (
      <div className="employement_types_container">
        <h1 className="filter_headings">Type of Employment</h1>
        <ul className="filter_ul_containers">
          {employmentTypesList.map(eachType => (
            <li
              className="filter_li_containers"
              key={eachType.employmentTypeId}
            >
              <input
                type="checkbox"
                value={eachType.employmentTypeId}
                id="myCheckbox"
                className="checkboxes"
                // checked={employmentType === eachType.employmentTypeId}
                onChange={this.handleCheckboxChange}
              />
              <label className="filter_labels" htmlFor="myCheckbox">
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderSalaryRanges = () => {
    const {salaryType} = this.state
    return (
      <div className="salaryType_container">
        <h1 className="filter_headings">Type of Employment</h1>
        <ul className="filter_ul_containers">
          {salaryRangesList.map(eachType => (
            <li className="filter_li_containers" key={eachType.salaryRangeId}>
              <input
                type="radio"
                value={eachType.salaryRangeId}
                id="myRadio"
                className="radios"
                checked={salaryType === eachType.salaryRangeId}
                onChange={this.handleRadioChange}
              />
              <label className="filter_labels" htmlFor="myRadio">
                {eachType.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderNoJobsView = () => (
    <div className="no_jobs_container">
      <img
        className="no_jobs_img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no_jobs_heading">No Jobs Found</h1>
      <p className="no_jobs_para">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state
    return (
      <>
        {jobsList.length > 0 ? (
          <ul className="jobs_list_container">
            {jobsList.map(eachJob => (
              <JobCard jobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsView()
        )}
      </>
    )
  }

  renderJobsLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getJobs()
  }

  renderJobsFailureView = () => (
    <div className="jobs_failure_view_container">
      <img
        className="jobs_failure_img"
        src={failureViewUrl}
        alt="failure view"
      />
      <h1 className="jobs_failure_heading">Oops! Something Went Wrong</h1>
      <p className="jobs_failure_para">
        We cannot seem to find the page you are looking for
      </p>
      <div>
        <button
          onClick={this.onClickRetry}
          className="job_failure_button"
          type="button"
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderJobsApiViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusViews.in_progress:
        return this.renderJobsLoadingView()
      case apiStatusViews.success:
        return this.renderJobsList()
      case apiStatusViews.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs_container">
          <div className="mobile_view_input_container">
            <input
              type="search"
              value={searchInput}
              onChange={this.onChangeSearchInput}
              placeholder="Search"
              className="searchInput"
            />
            <button
              type="button"
              data-testid="searchButton"
              className="searchIcon_button"
              onClick={this.onClickSearchIcon}
            >
              <BsSearch className="search_icon" />
            </button>
          </div>

          <div className="profile_and_filters_container">
            {this.renderProfileViews()}
            <hr className="hr_line" />
            {this.renderTypesOfEmployment()}
            <hr className="hr_line" />
            {this.renderSalaryRanges()}
          </div>

          <div className="input_and_jobs_container">
            <div className="desktop_view_input_container">
              <input
                type="search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                placeholder="Search"
                className="searchInput"
              />
              <button
                type="button"
                className="searchIcon_button"
                data-testid="searchButton"
                onClick={this.onClickSearchIcon}
              >
                <BsSearch className="search_icon" />
              </button>
            </div>
            {this.renderJobsApiViews()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
