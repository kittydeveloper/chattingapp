import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SideBar.css';

const SideBar = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState('');

  const handleNavigate = (path) => {
    setActiveItem(path); // Set the clicked menu item as active
    navigate(path);
  };

  const menuItems = [
    { label: 'DashBoard', path: '/home/MainDashboard/dashboard' },
 
                    
    { label: 'Profile', path: '/home/MainDashboard/Profile' },
    // { label: 'Settings', path: '/home/About' },
  ];

  return (
    <div className="sidebarcontainer">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`sidebarlist ${activeItem === item.path ? 'active' : ''}`}
          onClick={() => handleNavigate(item.path)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default SideBar;
