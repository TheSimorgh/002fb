// import { useEffect, useRef, useState } from "react";
// import "./style.css";
// import useClickOutside from "../../helpers/clickOutside";
// import { useSelector } from "react-redux";
// import UpdateProfilePicture from "./UpdateProfilePicture";


// const ProfilePicture = ({ setShow,show,pRef }) => {
//   const [image, setImage] = useState("");
//   const [error, setError] = useState("");
//   const refInput = useRef(null);
//   const popup = useRef(null);
//   const { user } = useSelector((state) => state.user);
//   // useClickOutside(popup,()=>setShow(false))
//     useEffect(()=>{},[show])
//     const handleImage = (e) => {
//       let file = e.target.files[0];
//       if (
//         file.type !== "image/jpeg" &&
//         file.type !== "image/png" &&
//         file.type !== "image/webp" &&
//         file.type !== "image/gif"
//       ) {
//         setError(`${file.name} format is not supported.`);
//         return;
//       } else if (file.size > 1024 * 1024 * 5) {
//         setError(`${file.name} is too large max 5mb allowed.`);
//         return;
//       }
  
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = (event) => {
//         setImage(event.target.result);
//       };
//     };
//   return (
//     <div className="blur" >
//       <input
//         type="file"
//         ref={refInput}
//         hidden
//         onChange={handleImage}
//         accept="image/jpeg,image/png,image/webp,image/gif"
//       />
//       <div className="postBox pictureBox" ref={popup}>
//         <div className="box_header">
//           <div className="small_circle" onClick={() => setShow(false)}>
//             <i className="exit_icon"></i>
//           </div>
//           <span>Update profile picture</span>
//         </div>
//         <div className="update_picture_wrap">
//           <div className="update_picture_buttons">
//             <button
//               className="light_blue_btn"
//               onClick={() => refInput.current.click()}
//             >
//               <i className="plus_icon filter_blue"></i>
//               Upload photo
//             </button>
//             <button className="gray_btn">
//               <i className="frame_icon"></i>
//               Add frame
//             </button>
//           </div>
//         </div>
//         {error && (
//           <div className="postError comment_error">
//             <div className="postError_error">{error}</div>
//             <button className="blue_btn" onClick={() => setError("")}>
//               Try again
//             </button>
//           </div>
//         )}
//         <div className="old_pictures_wrap scrollbar">
//           <h4>your profile pictures</h4>
//           <div className="old_pictures"></div>
//           <h4>other pictures</h4>
//           <div className="old_pictures"></div>
//         </div>
//       </div>
//       {image && (
//         <UpdateProfilePicture
//           setImage={setImage}
//           image={image}
//           setShow={setShow}
//           setError={setError}
//            pRef={pRef}
//         />
//       )}
//     </div>
//   );
// };

// export default ProfilePicture;
