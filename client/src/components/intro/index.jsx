/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Bio from "./Bio";
import "./style.css";
import axios from "axios";
import { useSelector } from "react-redux";
import EditDetails from "./EditDetails";

const Intro = ({ visitor, otherName, details }) => {
  const [detailsS, setDetails] = useState();
  const { user } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(false);
  console.log("details");

  console.log(details);
  const initial = {
    bio: details?.bio ? details?.bio : "",
    otherName: details?.otherName ? details?.otherName : "23",
    job: details?.job ? details?.job : "23",
    workplace: details?.workplace ? details?.workplace : "23",
    highSchool: details?.highSchool ? details?.highSchool : "23",
    college: details?.college ? details?.college : "23",
    currentCity: details?.currentCity ? details?.currentCity : "34",
    hometown: details?.hometown ? details?.hometown : "",
    relationship: details?.relationship ? details?.relationship : "",
    instagram: details?.instagram ? details?.instagram : "",
  };
  const [infos, setInfos] = useState(initial);
  const [showBio, setShowBio] = useState(true);
  const [max, setMax] = useState(infos?.bio ? 100 - infos?.bio.length : 100);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfos({ ...infos, [name]: value });
    setMax(100 - e.target.value.length);
  };
  const updateDetails = () => {};
  console.log("Intro visitor");
  console.log(visitor);
  console.log(infos);
  return (
    <div className="profile_card">
      <div className="profile_card_header">Intro</div>
      {details?.bio && !showBio && (
        <div className="info_col">
          <span className="info_text">{details?.bio} </span>
          {!visitor && (
            <button
              className="gray_btn hover1"
              onClick={() => setShowBio(true)}
            >
              Edit Bio
            </button>
          )}
          {!details?.bio && !showBio && !visitor && (
            <button
              className="gray_btn hover1 w100"
              onClick={() => setShowBio(true)}
            >
              Add Bio
            </button>
          )}
        </div>
      )}
      {showBio && (
        <Bio
          infos={infos}
          max={max}
          handleChange={handleChange}
          setShowBio={setShowBio}
          updateDetails={updateDetails}
          placeholder="Add Bio"
          name="bio"
        />
      )}

      {details?.job && details?.workplace ? (
        <div className="info_profile">
          <img src="./icons/job.png" alt="" />
          works as {details?.job} at <b>{details?.workplace}</b>
        </div>
      ) : details?.job && !details?.workplace ? (
        <div className="info_profile">
          <img src="./icons/job.png" alt="" />
          works as {details?.job}
        </div>
      ) : (
        details?.workplace &&
        !details?.job && (
          <div className="info_profile">
            <img src="./icons/job.png" alt="" />
            works at {details?.workplace}
          </div>
        )
      )}
      {details?.relationship && (
        <div className="info_profile">
          <img src="./icons/relationship.png" alt="" />
          {details?.relationship}
        </div>
      )}
      {details?.college && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          studied at {details?.college}
        </div>
      )}
      {details?.highSchool && (
        <div className="info_profile">
          <img src="../../../icons/studies.png" alt="" />
          studied at {details?.highSchool}
        </div>
      )}
      {details?.currentCity && (
        <div className="info_profile">
          <img src="../../../icons/home.png" alt="" />
          Lives in {details?.currentCity}
        </div>
      )}
      {details?.hometown && (
        <div className="info_profile">
          <img src="./icons/home.png" alt="" />
          From {details?.hometown}
        </div>
      )}
      {!visitor && (
        <button
          className="gray_btn hover1 w100"
          onClick={() => setVisible(true)}
        >
          Edit Details
        </button>
      )}
      {details?.hometown && (
        <div className="info_profile">
          <img src="./icons/instagram.png" alt="" />
          <a
            href={`https://www.instagram.com/${details?.instagram}`}
            target="_blank"
            rel="noreferrer"
          >
            {details?.instagram}
          </a>
        </div>
      )}
      {visible && !visitor && (
        <EditDetails
          details={details}
          handleChange={handleChange}
          updateDetails={updateDetails}
          infos={infos}
          setVisible={setVisible}
        />
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Hobbies</button>
      )}
      {!visitor && (
        <button className="gray_btn hover1 w100">Add Featured</button>
      )}
    </div>
  );
};

export default Intro;
