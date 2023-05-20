/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useClickOutside from "../../helpers/clickOutside";

const Cover = ({ cover }) => {
    const [showCoverMneu, setShowCoverMenu] = useState(false);

    const { user } = useSelector((state) =>state.user);
  
    const menuRef = useRef(null);

  
    useClickOutside(menuRef, () => setShowCoverMenu(false));

    
    return (
    <div className="profile_cover">
      {cover ? <img src={cover} className="cover" alt="" /> : null}
      <div className="update_cover_wrapper">
        <div className="open_cover_update"  onClick={() => setShowCoverMenu((prev) => !prev)}>
          <i className="camera_filled_icon"></i>
          Add Cover Photo
        </div>
        {showCoverMneu && (
            <div className="open_cover_menu" ref={menuRef}>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => setShow(true)}
              >
                <i className="photo_icon"></i>
                Select Photo
              </div>
              <div
                className="open_cover_menu_item hover1"
                onClick={() => refInput.current.click()}
              >
                <i className="upload_icon"></i>
                Upload Photo
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default Cover;
