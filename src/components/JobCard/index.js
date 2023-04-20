import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="job_card_link_item">
      <li className="jobCard_container">
        <div className="companyLogo_and_title_and_rating_container">
          <img
            className="card_company_logo"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="title_and_rating_container">
            <p className="card_title">{title}</p>
            <div className="star_and_rating">
              <AiFillStar className="star_icon" />
              <p className="card_rating">{rating}</p>
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

        <div className="description_container">
          <h1 className="description_heading">Description</h1>
          <p className="description_paras">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
