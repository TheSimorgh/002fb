import { useNavigate } from "react-router-dom"

useNavigate
const NotFound = () => {
    const navigate=useNavigate()
  return (
    <div style={{display:"flex",flexDirection:"column", justifyItems:"center",alignItems:"center",height:"95vh",width:"100vw"}} >
        <h1 style={{textAlign:"center",marginTop:"25%"}} >404 Page Not Found</h1>
        <button style={{padding:"10px",borderRadius:"5px", width:"100px",marginTop:"20px"}}  onClick={()=>navigate("/login")} >Login</button>
    </div>
  )
}

export default NotFound