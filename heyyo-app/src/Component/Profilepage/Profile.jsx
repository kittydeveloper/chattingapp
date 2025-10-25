import React, { useState } from 'react';
import "./Profile.css";
import useProfile from './useProfile';
import { apiurl } from '../url';
import ClearIcon from "@mui/icons-material/Clear";
import FileDownloadDoneIcon from "@mui/icons-material/FileDownloadDone";
import blankimage from '../../Assest/blankimages.jpg'

const Profile = ({profiledata}) => {
  const {
    handleUploadFile,
    handleupdate,
    setProfile_image,
    profilevalue,
    handlechange,
    handleGenderChange,
    selectedGender,
    interests,
    handleChange1,
    ageOptions,
    hidePopup,
    error,
    errorMessage,
    success,
    successMessage,
    disablevalue
  } = useProfile();
  
  const [open, setOpen] = useState(false);
  console.log(profiledata, "profile data");

  return (
    <div className="container-fluid">
      <div className="px-md-4 profile-main">
        <div className="row g-4">
          {/* Left Card - Profile Picture and Basic Info */}
          <div className="col-lg-5 col-md-6">
            <div className="profile-card profile-card-left p-4 h-100 fade-in">
              <div className="text-center mb-4">
                <div className="position-relative d-inline-block bounce-in">
                  <img
                    key={profiledata} 
                    src={profiledata ? `${apiurl}/profileimages/${profiledata}` : blankimage}
                    className="profile-pic"
                    alt="Profile"
                  />
                  <div className="camera-icon">
                    <label htmlFor="profile-image-upload" style={{ cursor: 'pointer' }}>
                      <i className="fa fa-camera" style={{ fontSize: '20px' }}></i>
                      <input
                        type="file"
                        id="profile-image-upload"
                        style={{ display: "none" }}
                        onChange={handleUploadFile}
                        accept="image/*"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Email Address</label>
                <input 
                  type="email"  
                  className="form-control border-bottom-only" 
                  name="Email" 
                  value={profilevalue.Email || ''} 
                  onChange={handlechange}
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Bio</label>
                <textarea    
                  className="form-control border-bottom-only" 
                  name="Bio_data"  
                  value={profilevalue.Bio_data || ''}
                  rows="4" 
                  onChange={handlechange}
                  placeholder="Tell us about yourself..."
                  style={{ resize: 'vertical' }}
                />
              </div>
            </div>
          </div>

          {/* Right Card - Gender, Interests, and Age */}
          <div className="col-lg-7 col-md-6">
            <div className="profile-card profile-card-right p-4 h-100 fade-in">
              
              {/* Gender Selection */}
              <div className="mb-4">
                <div className="section-header">Gender</div>
                <div className="row g-3 gender-options">
                  <div className="col-4 gender-option">
                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      id="gender-male"
                      value="Male"
                      checked={selectedGender === 'Male'}
                      onChange={handleGenderChange}
                    />
                    <label className="btn custom-radio w-100" htmlFor="gender-male">
                      <i className="fa fa-mars me-2"></i>Male
                    </label>
                  </div>
                  <div className="col-4 gender-option">
                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      id="gender-female"
                      value="Female"
                      checked={selectedGender === 'Female'}
                      onChange={handleGenderChange}
                    />
                    <label className="btn custom-radio w-100" htmlFor="gender-female">
                      <i className="fa fa-venus me-2"></i>Female
                    </label>
                  </div>
                  <div className="col-4 gender-option">
                    <input
                      type="radio"
                      className="btn-check"
                      name="gender"
                      id="gender-others"
                      value="Others"
                      checked={selectedGender === 'Others'}
                      onChange={handleGenderChange}
                    />
                    <label className="btn custom-radio w-100" htmlFor="gender-others">
                      <i className="fa fa-transgender me-2"></i>Others
                    </label>
                  </div>
                </div>
              </div>

              {/* Interests Selection */}
              <div className="mb-4">
                <div className="section-header">Interested In</div>
                <div className="row g-3 interest-options">
                  <div className="col-4 interest-option">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="interest-men"
                      name="men"
                      checked={interests.men}
                      onChange={handleChange1}
                    />
                    <label className="btn custom-radio w-100" htmlFor="interest-men">
                      <i className="fa fa-mars me-2"></i>Men
                    </label>
                  </div>
                  <div className="col-4 interest-option">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="interest-women"
                      name="women"
                      checked={interests.women}
                      onChange={handleChange1}
                    />
                    <label className="btn custom-radio w-100" htmlFor="interest-women">
                      <i className="fa fa-venus me-2"></i>Women
                    </label>
                  </div>
                  <div className="col-4 interest-option">
                    <input
                      type="checkbox"
                      className="btn-check"
                      id="interest-others"
                      name="others"
                      checked={interests.others}
                      onChange={handleChange1}
                    />
                    <label className="btn custom-radio w-100" htmlFor="interest-others">
                      <i className="fa fa-transgender me-2"></i>Others
                    </label>
                  </div>
                </div>
              </div>

              {/* Age Selection */}
              <div className="mb-4">
                <div className="section-header">Age</div>
                <div className="d-flex align-items-center gap-3 age-select-container">
                  <label htmlFor="ageSelect" className="form-label mb-0">
                    <i className="fa fa-birthday-cake me-2"></i>Select Age
                  </label>
                  <select
                    id="ageSelect"
                    className="form-select"
                    style={{ maxWidth: '200px' }}
                    name="Age"
                    value={profilevalue.Age || ''}
                    onChange={handlechange}
                  >
                    <option value="">-- Select Age --</option>
                    {ageOptions.map((age) => (
                      <option key={age} value={age}>
                        {age} years old
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Update Button */}
              <div className="d-flex justify-content-center mt-4">
                <button 
                  className="btn btn-update"
                  onClick={handleupdate}
                  disabled={disablevalue}
                >
                  <i className="fa fa-save me-2"></i>
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Popups */}
        <div className="alert-popup-main">
          {error && (
            <div className="alert-popup Error">
              <div className="popup-icon" onClick={hidePopup}>
                <ClearIcon color="error" />
              </div>
              <div>
                <strong>Error!</strong>
                <p className="mb-0">{errorMessage}</p>
              </div>
            </div>
          )}

          {success && (
            <div className="alert-popup Success">
              <div className="popup-icon">
                <FileDownloadDoneIcon color="success" />
              </div>
              <div className="popup-icon" onClick={hidePopup} style={{ marginLeft: 'auto' }}>
                <ClearIcon color="action" />
              </div>
              <div>
                <strong>Success!</strong>
                <p className="mb-0">{successMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;