import useClickOutside from '../../helpers/clickOutside'
import Detail from './Detail'
import { useRef } from "react";
const EditDetails = ({  setVisible,}) => {
  const modal = useRef(null);
  useClickOutside(modal, () => setVisible(false));
  return (
    <div className="blur">
      <div className="postBox infosBox" 
      ref={modal}
      >

      </div>
      EditDetail
        <Detail />
    </div>
  )
}

export default EditDetails