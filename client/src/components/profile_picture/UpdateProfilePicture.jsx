import { useState } from "react";

const UpdateProfilePicture = ({setShow,image,setImage}) => {
    const [description, setDescription] = useState("");

  
    return (
    <div className="postBox update_img">
      <div className="box_header">
        <div className="small_circle" onClick={() => setImage("")}>
          <i className="exit_icon"></i>
        </div>
        <span>Update profile picture</span>
      </div>
      <div className="update_image_desc">
        <textarea
          placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          className="textarea_blue details_input"
        ></textarea>
      </div>
      <div className="update_center">
        <div className="crooper"></div>
        <div className="slider">
          <div className="slider_circle hover1" onClick={() => {}}>
            <i className="minus_icon"></i>
          </div>
          <input
            type="range"
            min={1}
            max={3}
            step={0.2}
            // ref={slider}
            // value={zoom}
            // onChange={(e) => setZoom(e.target.value)}
          />
          <div className="slider_circle hover1" onClick={() =>{}}>
            <i className="plus_icon"></i>
          </div>
        </div>
      </div>

      <div className="flex_up">
        <div className="gray_btn" onClick={() => {}}>
          <i className="crop_icon"></i>Crop photo
        </div>
        <div className="gray_btn">
          <i className="temp_icon"></i>Make Temporary
        </div>
      </div>
      <div className="flex_p_t">
        <i className="public_icon"></i>
        Your profile picture is public
      </div>
      <div className="update_submit_wrap">
        <div className="blue_link" onClick={() => {}}>
          Cancel
        </div>
        <button
          className="blue_btn"
        //   disabled={loading}
        //   onClick={() => updateProfielPicture()}
        >
          {/* {loading ? <PulseLoader color="#fff" size={5} /> : "Save"} */}
        </button>
      </div>
    </div>
  );
};

export default UpdateProfilePicture;
