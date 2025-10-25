import React, { useState } from "react";
import { Outlet } from 'react-router-dom';
// import SideBar from "../SidebarPage/Sidebar";
import SideBar from "../SidebarPage/Sidebar";
import { useNavigate } from "react-router-dom";
// import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
// import ToggleButton from '@mui/material/ToggleButton';
// import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import { useSelectedRoleData } from "../Context/SelectedRoleContext";
import './MainDashboard.css'

const MainDashBoard  = () => {
  const navigate = useNavigate()
//   const {setLoginContextData} = useSelectedRoleData()
//   const [drawer, setDrawer] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("userLoginEmail")
     localStorage.removeItem("useridno")
    // setLoginContextData(null)
    navigate("/")
  }

  return (
    <>
      {/* <div className='platform'>
        <div className="header-div">
          <p className="HeaderText">  IDEA-UP</p>
        </div>
        <div >
          <button className="LogoutButton" onClick={handleLogout}>Logout</button>
        </div>
      </div> */}
      <div style={{ display: "flex", height: "100vh",marginTop:'90px', position: 'fixed' ,width:"100%"}}>

        {/* <div className="nav-btn">
          <ToggleButtonGroup>
            <ToggleButton value="justify" aria-label="justified">
              <FormatAlignJustifyIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </div> */}
        <SideBar />

        <div style={{ display:'flex',scrollBehavior:"smooth",  flexDirection: "column", marginLeft: "2px", marginTop: "6px", height: "calc(100vh - 60px)", overflowY: "auto", backgroundColor: "#e3dfde" }}>
          <Outlet />
        </div>
      </div>
    </>
  )
}


export default MainDashBoard ;