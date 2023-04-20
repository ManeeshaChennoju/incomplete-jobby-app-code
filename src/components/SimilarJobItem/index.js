import {AiFillStar} from 'react-icons/ai'
import {GoLocation} from 'react-icons/go'
import {FaSuitcase} from 'react-icons/fa'
import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
    id,
  } = similarJobDetails
  return (
    <li className="li_similarJob_item_container" key={id}>
      <div className="jobItem_logo_and_rating_container">
        <img
          className="similar_job_logo"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="jobItem_title_and_rating_container">
          <p className="similar_jobItem_title">{title}</p>
          <div className="jobItem_star_and_rating">
            <AiFillStar className="jobItem_star_icon" />
            <p className="jobItem_rating">{rating}</p>
          </div>
        </div>
      </div>

      <div className="similar_job_description_container">
        <h1 className="similar_description_heading">Description</h1>
        <p className="similar_job_description">{jobDescription}</p>
      </div>

      <div className="similar_location_and_job_type">
        <div className="location_container">
          <GoLocation className="card_location_icon" />
          <p className="card_paras"> {location}</p>
        </div>
        <div className="employ_type_container">
          <FaSuitcase className="suitcase_icon" />
          <p className="card_paras">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
