import { Dots } from "../../svg";
import P1 from "/stories/profile1.jpg"
import P2 from "/stories/profile2.jpg"
import P3 from "/stories/profile3.jpg"
import P4 from "/stories/profile4.jpg"
import P5 from "/stories/profile5.jpg"
import I1 from "/stories/1.jpg"
import I2 from "/stories/2.jpg"
import I3 from "/stories/3.jpg"
import I4 from "/stories/4.jpg"
import I5 from "/stories/5.jpg"
import AddFriendSmallCard from "./AddFriendSmallCard";



const PlpUMayKnow = () => {

     const stories = [
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
      
  return (
<div className="pplumayknow">
      <div className="pplumayknow_header">
        People You May Know
        <div className="post_header_right ppl_circle hover1">
          <Dots />
        </div>
      </div>
      <div className="pplumayknow_list">
        {stories.map((item, i) => (
          <AddFriendSmallCard item={item} key={i} />
        ))}
      </div>
    </div>  )
}

export default PlpUMayKnow