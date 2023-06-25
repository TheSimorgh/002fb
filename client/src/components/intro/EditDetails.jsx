import useClickOutside from "../../helpers/clickOutside";
import Detail from "./Detail";
import { useRef,useState } from "react";


const EditDetails = ({  
   details,
  handleChange,
  updateDetails,
  infos,
  setVisible, }) => {
  const modal = useRef(null);
  useClickOutside(modal, () => setVisible(false));

  const editData=[
    {
    header:"Other Name",
    value:details?.otherName,
    img:"studies",
    placeholder:"Add other name",
    name:"otherName",
    text:"other Name",
    handleChange:handleChange,
    updateDetails:updateDetails,
    infos:infos
  },
    {
      header:"Work",
      value:details?.job,
      img:"job",
      placeholder:"Add job title",
      name:"job",
      text:"a job",
      handleChange:handleChange,
      updateDetails:updateDetails,
      infos:infos,
    },
    {
      header:"",
      value:details?.workplace,
      img:"job",
      placeholder:"Add a workplace",
      name:"workplace",
      text:"workplace",
      handleChange:handleChange,
      updateDetails:updateDetails,
      infos:infos,
    },
    {  
      header:"Education",
      value:details?.highSchool,
      img:"studies",
      placeholder:"Add a high school",
      name:"highSchool",
      text:"a high school",
      handleChange:handleChange,
      updateDetails:updateDetails,
      infos:infos,
  },

  { 
    header:"",
    value:details?.college,
    img:"studies",
    placeholder:"Add a college",
    name:"college",
    text:"college",
    handleChange:handleChange,
    updateDetails:updateDetails,
    infos:infos
  },
  { 
    header:"Current City",
    value:details?.currentCity,
    img:"home",
    placeholder:"Add a current city",
    name:"currentCity",
    text:"a current city",
    handleChange:handleChange,
    updateDetails:updateDetails,
    infos:infos
  },
  {
    header:"Hometown",
    value:details?.hometown,
    img:"home",
    placeholder:"Add hometown",
    name:"hometown",
    text:"hometown",
    handleChange:handleChange,
    updateDetails:updateDetails,
    infos:infos,
  },
  {
    header:"Relationship",
    value:details?.relationship,
    img:"relationship",
    placeholder:"Add instagram",
    name:"relationship",
    text:"relationship",
    handleChange:handleChange,
    updateDetails:updateDetails,
    infos:infos,
    rel:"rel",
  },
  {
    header:"Instagram",
    value:details?.instagram,
    img:"home",
    placeholder:"Add instagram",
    name:"instagram",
    text:"instagram",
    handleChange:handleChange,
    updateDetails:updateDetails,
    infos:infos,
  },

  ]
  return (
    <div className="blur">
      <div className="postBox infosBox" ref={modal}>
        <div className="box_header">
          <div className="small_circle" onClick={() => setVisible(false)}>
            <i className="exit_icon"></i>
          </div>
          <span>Edit Details</span>
        </div>
        <div className="details_wrapper scrollbar">
      <div className="details_col">
            <span>Customize Your Intro</span>
            <span>Details you select will be public</span>
          </div>

    


          
          {editData.map((e,i)=>(

<div key={i} >
    <div className="details_header">{e.header}</div>
    <Detail 
    value={e.value}
    img={e.img}
    placeholder={e.placeholder}
    name={e.name}
    text={e.text}
    handleChange={e.handleChange}
    updateDetails={e.updateDetails}
    infos={e.infos}
    rel={e.rel} />

</div>
)
)}
        </div>
      </div>

      </div>
     

  );
};

export default EditDetails;
