import { useRef, useState } from "react";
import { ProfilePicture } from "../../components";
import Friendship from "./Friendship";

const ProfilePicturesInfos = ({ profile, loading, othername,visitor,photos }) => {
  const [show, setShow] = useState(false);
  const pRef = useRef(null);
  return (
    <div className="profile_img_wrap">
      {show ? <ProfilePicture setShow={setShow} photos={photos}/> : null}
      <div className="profile_w_left">
        <div className="profile_w_img">
          <div
            className="profile_w_bg"
            ref={pRef}
            style={{
              backgroundSize: "cover",
              backgroundImage: `url(${profile?.picture})`,
            }}
          ></div>
             {!visitor && (
            <div
              className="profile_circle hover1"
              onClick={() => setShow(true)}
            >
              <i className="camera_filled_icon"></i>
            </div>
          )}
        </div>
        <div className="profile_w_col">
          <div className="profile_name">
            {profile?.first_name} {profile?.last_name}
            <div className="othername">{othername && `(${othername})`}</div>
          </div>
          <div className="profile_friend_count">
            {profile?.friends && (
              <div className="profile_card_count">
                {profile?.friends?.length === 0
                  ? ""
                  : profile?.friends?.length === 1
                  ? "1 Friend"
                  : `${profile?.friends?.length} Friends`}
              </div>
            )}
          </div>
        </div>
      </div>
      {visitor ? (
        
       <Friendship friendshipp={profile?.friendship} profileid={profile._id}  />
      ) : (
        <div className="profile_w_right">
          <div className="blue_btn">
            <img src="../../../icons/plus.png" alt="" className="invert" />
            <span>Add to story</span>
          </div>
          <div className="gray_btn">
            <i className="edit_icon"></i>
            <span>Edit profile</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePicturesInfos;
