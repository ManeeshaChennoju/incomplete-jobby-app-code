import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {FaSuitcase} from 'react-icons/fa'
import {FiExternalLink} from 'react-icons/fi'
import {Component} from 'react'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import './index.css'

const apiStatuViews = {
  initial: 'INITIAL',
  in_progress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const failureViewUrl =
  'https://assets.ccbp.in/frontend/react-js/failure-img.png'

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatuViews.initial,
    jobDetails: {},
    similarJobDetails: [],
  }

  componentDidMount() {
    this.getJobItem()
  }

  getJobItem = async () => {
    this.setState({apiStatus: apiStatuViews.in_progress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data, 'job item details -----------')
      const JobDetailsData = data.job_details
      const similarJobsData = data.similar_jobs
      const updatedJobDetailsData = {
        companyLogoUrl: JobDetailsData.company_logo_url,
        companyWebsiteUrl: JobDetailsData.company_website_url,
        employmentType: JobDetailsData.employment_type,
        id: JobDetailsData.id,
        jobDescription: JobDetailsData.job_description,
        skills: JobDetailsData.skills,
        lifeAtCompany: JobDetailsData.life_at_company,
        location: JobDetailsData.location,
        packagePerAnnum: JobDetailsData.package_per_annum,
        rating: JobDetailsData.rating,
        title: JobDetailsData.title,
      }
      const updatedSimilarJobs = similarJobsData.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobDetails: updatedJobDetailsData,
        similarJobDetails: updatedSimilarJobs,
        apiStatus: apiStatuViews.success,
      })
    } else {
      this.setState({apiStatus: apiStatuViews.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    const updatedSkillsList = skills.map(eachSkill => ({
      skillImageUrl: eachSkill.image_url,
      name: eachSkill.name,
    }))

    const updatedLifeAtCompany = {
      lifeDescription: lifeAtCompany.description,
      lifeImageUrl: lifeAtCompany.image_url,
    }
    const {lifeDescription, lifeImageUrl} = updatedLifeAtCompany

    return (
      <div className="specific_jobItem_container">
        <div className="jobItem_logo_and_rating_container">
          <img
            className="job_item_company_logo"
            src={companyLogoUrl}
            alt="job details company logo"
          />
          <div className="jobItem_title_and_rating_container">
            <p className="jobItem_title">{title}</p>
            <div className="jobItem_star_and_rating">
              <AiFillStar className="jobItem_star_icon" />
              <p className="jobItem_rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="location_and_salary_container">
          <div className="location_and_job_type">
            <div className="location_container">
              <GoLocation className="card_location_icon" />
              <p className="card_paras"> {location}</p>
            </div>
            <div className="employ_type_container">
              <FaSuitcase className="suitcase_icon" />
              <p className="card_paras">{employmentType}</p>
            </div>
          </div>
          <p className="card_package">{packagePerAnnum}</p>
        </div>

        <hr className="card_hr_line" />

        <div className="job_item_description_container">
          <div className="description_and_visitLink">
            <h1 className="jobItem_description_heading">Description</h1>
            <a href={companyWebsiteUrl} className="anchor_link_item">
              <p className="visit">Visit</p>
              <FiExternalLink className="visit_icon" />
            </a>
          </div>

          <p className="description_paras">{jobDescription}</p>
        </div>

        <div className="skills_container">
          <h1 className="skill_heading">Skills</h1>
          <ul className="ul_skills_container">
            {updatedSkillsList.map(eachSkill => (
              <li className="li_skill_item" key={eachSkill.name}>
                <img
                  className="skill_images"
                  src={eachSkill.skillImageUrl}
                  alt={eachSkill.name}
                />
                <p className="skill_names">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="lift_at_company_container">
          <h1 className="life_at_heading">Life at Company</h1>
          <div className="life_para_and_image">
            <p className="life_para">{lifeDescription}</p>
            <img
              src={lifeImageUrl}
              alt="life at company"
              className="life_at_company_image"
            />
          </div>
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobDetails} = this.state
    return (
      <div className="similar_jobs_container">
        <h1 className="similar_jobs_heading">Similar Jobs </h1>
        <ul className="ul_similar_jobs_container">
          {similarJobDetails.map(eachSimilarJob => (
            <SimilarJobItem
              similarJobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetryJobItem = () => {
    this.getJobItem()
  }

  renderJobDetailsFailure = () => (
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
          onClick={this.onClickRetryJobItem}
          className="job_failure_button"
          type="button"
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderJobDetailsApiViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatuViews.in_progress:
        return this.renderLoadingView()
      case apiStatuViews.success:
        return this.renderJobDetails()
      case apiStatuViews.failure:
        return this.renderJobDetailsFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="job_item_details_container">
          <Header />
          {this.renderJobDetailsApiViews()}
          {this.renderSimilarJobs()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
