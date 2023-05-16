/* eslint-disable no-unused-vars */
import { ArrowRight, Plus } from "../../../svg";
import "./style.css";

import { useMediaQuery } from "react-responsive";
import Story from "./Story";
// import { stories } from "../../../data/home";

// import P1 from "../../../assets/stories/profile1.jpg"
// import P2 from "../../../assets/stories/profile2.jpg"
// import P3 from "../../../assets/stories/profile3.jpg"
// import P4 from "../../../assets/stories/profile4.jpg"
// import P5 from "../../../assets/stories/profile5.jpg"
// import I1 from "../../../assets/stories/1.jpg"
// import I2 from "../../../assets/stories/2.jpg"
// import I3 from "../../../assets/stories/3.jpg"
// import I4 from "../../../assets/stories/4.jpg"
// import I5 from "../../../assets/stories/5.jpg"

import P1 from "../../../assets/stories/profile1.jpg"
import P2 from "../../../assets/stories/profile2.jpg"
import P3 from "../../../assets/stories/profile3.jpg"
import P4 from "../../../assets/stories/profile4.jpg"
import P5 from "../../../assets/stories/profile5.jpg"
import I1 from "../../../assets/stories/1.jpg"
import I2 from "../../../assets/stories/2.jpg"
import I3 from "../../../assets/stories/3.jpg"
import I4 from "../../../assets/stories/4.jpg"
import I5 from "../../../assets/stories/5.jpg"

// import P1  from "../../../../public/stories/profile1.jpg"
// import P2  from "../../../../public/stories/profile2.jpg"
// import P3  from "../../../../public/stories/profile3.jpg"
// import P4  from "../../../../public/stories/profile4.jpg"
// import P5  from "../../../../public/stories/profile5.jpg"
// import I1  from "../../../../public/stories/1.jpg"
// import I2  from "../../../../public/stories/2.jpg"
// import I3  from "../../../../public/stories/3.jpg"
// import I4  from "../../../../public/stories/4.jpg"
// import I5  from "../../../../public/stories/5.jpg"
// export const stories = [
//   {
//     profile_picture: "../../../../public/stories/1.jpg",
//     profile_name: "Elon Musk",
//     image:  "../../../../public/stories/1.jpg",
//   },
//   {
//     profile_picture: "../../../../public/stories/2.png",
//     profile_name: "South park",
//     image:  "../../../../public/stories/2.png",
//   },
//   {
//     profile_picture: "../../../../public/stories/3.jpg",
//     profile_name: "The Sopranos",
//     image:  "../../../../public/stories/3.jpg",

//   },
//   {
//     profile_picture: "../../../../public/stories/4.jpg",
//     profile_name: "Football World",
//     image:  "../../../../public/stories/4.jpg",

//   },
//   {
//     profile_picture: "../../../../public/stories/5.png",
//     profile_name: "The Witcher Wild Hunt",
//     image:  "../../../../public/stories/5.jpg",
//   },
// ];

export const stories = [
  {
    profile_picture: P1,
    profile_name: "Elon Musk",
    image:I1 ,
  },
  {
    profile_picture: P2,
    profile_name: "South park",
    image: I2,
  },
  {
    profile_picture:P3 ,
    profile_name: "The Sopranos",
    image:I3 ,

  },
  {
    profile_picture: P4,
    profile_name: "Football World",
    image:I4 ,

  },
  {
    profile_picture:P5 ,
    profile_name: "The Witcher Wild Hunt",
    image:I5,
  },
];


const Stories = () => {
    const query1175px = useMediaQuery({
        query: "(max-width: 1175px)",
      });
      const query1030px = useMediaQuery({
        query: "(max-width: 1030px)",
      });
      const query960px = useMediaQuery({
        query: "(max-width: 960px)",
      });
      const query885px = useMediaQuery({
        query: "(max-width: 885px)",
      });
      const max = query885px
      ? 5
      : query960px
      ? 4
      : query1030px
      ? 5
      : query1175px
      ? 4
      : stories.length;
  return (
    <div className="stories">
    <div className="create_story_card">
      <img
        src="../../../images/default_pic.png"
        alt=""
        className="create_story_img"
      />
      <div className="plus_story">
        <Plus color="#fff" />
      </div>
      <div className="story_create_text">Create Story</div>
    </div>
    {/* <img src={stories[0]} /> */}
    {stories.slice(0, max).map((story, i) => (
     <Story
      stroy={story} key={i} />
    ))}
    <div className="white_circle">
      <ArrowRight color="#65676b" />
    </div>
  </div>
);

}

export default Stories
