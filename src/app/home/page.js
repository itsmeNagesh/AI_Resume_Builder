"use client"

import './home.css'
import React, { useState, useEffect, useRef,useCallback } from 'react';
import LineProgress from '../components/lineproggress/page';

import Resume from '../components/resumetemplate/page'
import { Container, Button, Box } from '@mui/material';
import ArrowTooltips from '../components/lineproggress/tooltips/page'
import Tooltip from '@mui/material/Tooltip';

import Prosummury from '../components/profsummury/page'
import DatePicker from 'react-datepicker';
import { GrAdd } from "react-icons/gr";
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import Switch from '@mui/material/Switch';
import Hamburger from 'hamburger-react'
import { debounce } from 'lodash';
import JoditEditor from 'jodit-react';
export default function Home1() {
  //#  cASE:1ccc

  const intialValue = {
    Jobtitle: "",
    imgUrl: "data:image/jpeg;base64,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",
    Fname: "Ramson ",
    Lastname: "justinger",
    Email: "justinger@gmail.com",
    Phone: "+31 8475875785",
    City: "Newyork",
    Country: "",
    content1:"",
  }
 


  const [currentStep, setCurrentStep] = useState(1); // Initialize step state
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(1);
  const [flag, setflag] = useState(false);
  const [FormData, setFormData] = useState(intialValue);
  const [formChange, setFormChange] = useState(false);


  const label = { inputProps: { 'aria-label': 'Switch demo' } };

  const [editorHtml1, setEditorHtml1] = useState('Highly skilled web developer with expertise in HTML, CSS, JavaScript, and React. Proficient in building responsive, scalable, and user-friendly web applications. Strong understanding of front-end development principles and best practices.');
 

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrlnew = URL.createObjectURL(file);
      // setUploadedImage(imageUrl);
      setFormData({ ...FormData, imgUrl: imageUrlnew })

    }
  };
  const fileInputRef = useRef(null);
  const handleSpanClick = () => {
    fileInputRef.current?.click();
  };
 
  const handleChange = (e) => {
  
    setFormData({ ...FormData, [e.target.name]: e.target.value })
  }
  const handleChange1= (html) => {
    setEditorHtml1(html);
    setFormData({...FormData,content1:html})
  
  };
  const handleince = () => {

    setProgress(progress >= 100 ? 0 : progress + 25)
  }
  const [errors, setErrors] = useState({});

  const validate = ()=> {
    const newErrors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!FormData.Jobtitle) newErrors.Jobtitle = 'Job title is required';
    if (!FormData.Fname) newErrors.Fname = 'First name is required';
    if (!FormData.Lastname) newErrors.Lastname = 'Last name is required';
    if (!FormData.Email) newErrors.Email = 'Email is required';
    else if (!regex.test(FormData.Email)) newErrors.Email = 'Email is invalid';
    if (!FormData.Phone) newErrors.Phone = 'Phone number is required';
    if (!FormData.City) newErrors.City = 'City is required';
    if (!FormData.Country) newErrors.Country = 'Country is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateSummuaryData = () => {
    const newErrors= {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!FormData2.PositionTitle) newErrors.PositionTitle = "Position title is required";
    if (!FormData2.OrganisationName) newErrors.OrganisationName = "Organisation name is required";
    if (!FormData2.City2) newErrors.City2 = "City name is required";
    if (!FormData2.State) newErrors.State = "State is required";
    // else if(!regex.test(FormData.Email)) newErrors.Email = "Email is invalid";
    if (!FormData2.StarDate) newErrors.StartDate = "Start date is required";
    if (!FormData2.EndDate) newErrors.EndDate = "End date is required";
    // if (!FormData.Country) newErrors.Country = "Country is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => {
    if (validate()) {
      // setCurrentStep((prevStep) => Math.min(prevStep + 1, 5));
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 5));
      setStep((prev) => Math.min(prev + 1, 4));
      setProgress(progress >= 100 ? 0 : progress + 25);
    }
    // setStep((prev) => Math.min(prev + 1, 4));
    // setProgress(progress >= 100 ? 0 : progress + 25);
  };
  const handleNextsummury = () => {
//     const isValid = validateSummuaryData();
// console.log('isValid',isValid)
//     if (isValid) {
//         setStep((prev) => Math.min(prev + 1, 4));
//         setProgress((prev) => (prev >= 100 ? 0 : prev + 25));
//     }
  
setCurrentStep((prevStep) => Math.min(prevStep + 1, 5));

    setStep((prev) => Math.min(prev + 1, 4));
    setProgress(progress >= 100 ? 0 : progress + 25);
  };
  const handlePrev = () => {
    setProgress(progress >= 100 ? 0 : progress - 25)
    setStep((prev) => Math.max(prev - 1, 1));
  };
//API CALL FOR CASE:1
const [responseData, setResponseData] = useState(null); // Initialize state to hold the response data
const[jobProfile, setJobProfile] = useState(FormData.Jobtitle);

// const handleSubmit = async (): Promise<void> => {
//     try {
//         const data = await sendJobProfile(FormData.Jobtitle);
       
//     } catch (error) {
//         console.error('Error during submission:', error);
//     }
// };

const sendJobProfile = useCallback(async (jobProfile) => {
  try {
    const response = await axios.post('http://192.168.29.123:5000/prompt', { jobProfile });
    console.log('Response:', response.data);
    setResponseData(response.data.resume);
    setEditorHtml1(response.data.resume);
  } catch (error) {
    console.error('Error sending job profile:', error);
    throw error;
  }
}, []);

// Debounced function to send job profile
const debouncedSendJobProfile = useCallback(
  debounce((jobProfile) => {
    sendJobProfile(jobProfile);
  }, 500), // Adjust the debounce delay as needed (500ms in this example)
  [sendJobProfile]
);

useEffect(() => {
  if (FormData.Jobtitle) {
    debouncedSendJobProfile(FormData.Jobtitle);
  }
}, [FormData.Jobtitle, debouncedSendJobProfile]);
  
  //# Case:2
  const Summary = {
    PositionTitle: "",
    OrganisationName: "",
    City2: "",
    State: "",
    StarDate: "",
    EndDate: "",
    content2:""
  };
  const [formDate, setFormDate] = useState({
    StarDate: new Date(),
    EndDate: new Date(),
});
const[FormData2,setFormData2]=useState(Summary);



const formatDate = (date)=> {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};


const handleChangeStart = (date) => {
  setFormDate({ ...formDate, StarDate: date });
  setFormData2({ ...FormData2, StarDate: formatDate(date) }); // Update FormData2 with start date
};

const handleChangeEnd = (date) => {
  
  setFormDate({ ...formDate, EndDate: date });
  setFormData2({ ...FormData2, EndDate: formatDate(date) }); // Update FormData2 with end date
};
 
    const handleChange2=(e)=>{
      // const {name}=e.target
      setFormData2({...FormData2,[e.target.name]:e.target.value})
    }
  
  const [showDates, setShowDates] = useState(true);

  const handleSwitchChange = (event) => {
    setShowDates(event.target.checked);
  };

const[response2,setResponseData2]=useState('');
  const [editorHtml2, setEditorHtml2] = useState('');

  const handleChange21= (html) => {
    setFormData2({...FormData2,content2:html})
    setEditorHtml2(html);
  };



  const sendJobProfile2 = useCallback(async (jobProfile) => {
    try {
      const response = await axios.post('http://192.168.29.123:5000/experience', { jobProfile });
      console.log('Response:', response.data);
      setResponseData2(response.data.resume);
      setEditorHtml2(response.data.resume);
    } catch (error) {
      console.error('Error sending job profile:', error);
      // alert('Error sending job profile:', error);
      throw error;
    }
  }, []);

const debouncedSendJobProfile2 = useCallback(
  debounce((jobProfile) => {
    sendJobProfile2(jobProfile);
  }, 500),
  [sendJobProfile2]
);
useEffect(() => {
  if (FormData2.PositionTitle) {
    debouncedSendJobProfile2(FormData2.PositionTitle);
  }
}, [FormData2.PositionTitle, debouncedSendJobProfile2]);


//## CASE:3
const [SKillData,setSkillData]=useState([])
console.log('123',SKillData);
const [addskill,setAddSkill]=useState('')
const handleAddSkill = (skill) => {
  setAddSkill((prev) => prev ? `${prev}${skill}, ` : `${skill}, `);
};
const handleNext3 = () => {
 
  setCurrentStep((prevStep) => Math.min(prevStep + 1, 5));
      setStep((prev) => Math.min(prev + 1, 4));
      setProgress(progress >= 100 ? 0 : progress + 25);
    };
    const handlePrev3= () => {
      setProgress(progress >= 100 ? 0 : progress - 25)
      setStep((prev) => Math.max(prev - 1, 1));
    };

    const sendJobProfile3 = useCallback(async (jobProfile) => {
      try {
        const response = await axios.post('http://192.168.29.123:5000/skills', { jobProfile });
        let skillsString = response.data.skills;

        // If the skills string contains single quotes, replace them with double quotes
        skillsString = skillsString.replace(/'/g, '"');

        // Parse the JSON string into an array
        const skillsArray = JSON.parse(skillsString);
        console.log('Parsed Skills Array:', skillsArray);

        setSkillData(skillsArray);
      
      } catch (error) {
        console.error('Error sending job profile:', error);
        throw error;
      }
    }, []);
    
    // Debounced function to send job profile
    const debouncedSendJobProfile3 = useCallback(
      debounce((jobProfile) => {
        sendJobProfile3(jobProfile);
      }, 500), // Adjust the debounce delay as needed (500ms in this example)
      [sendJobProfile3]
    );
    
    useEffect(() => {
      if (FormData.Jobtitle) {
        debouncedSendJobProfile3(FormData.Jobtitle);
      }
    }, [FormData.Jobtitle, debouncedSendJobProfile3]);



    

//CASE:4 

  const EducationalDetails={
    Sname:"Delhi Public School",
    Slocation:"Delhi",
    Sdate:"23/02/2022",
    Edate:"4/08/2024",
    Degree:"SSC",
    fieldStudy:"HISTORY",
    content4:"JFHUJDND UFHDHFF UHFUFNVF "
  }
  const [Formdata4,setformdata4]=useState(EducationalDetails);
  const handleEducationaDetails=(e)=>{
     setformdata4({...Formdata4,[e.target.name]:e.target.value})
  }
  const [formDate4, setFormDate4] = useState({
    StarDate: new Date(),
    EndDate: new Date(),
});
const handleChangeStart4 = (date) => {
  setFormDate4({ ...formDate, StarDate: date });
  setformdata4({ ...Formdata4, Sdate: formatDate(date) }); // Update FormData2 with start date
};

const handleChangeEnd4 = (date) => {
  
  setFormDate4({ ...formDate, EndDate: date });
  setformdata4({ ...Formdata4, Edate: formatDate(date) }); // Update FormData2 with end date
};

//Swith handle 
const [showDates4, setShowDates4] = useState(true);
  const handleSwitchChange4 = (event) => {
    setShowDates4(event.target.checked);
  };
// handle textediter 

const [editorHtml4, setEditorHtml4] = useState('');
const handleChange4= (html) => {
  setformdata4({...Formdata4,content4:html})
  setEditorHtml4(html);
};

// PRE
const handlePrev4 = () => {
  setProgress(progress >= 100 ? 0 : progress - 25)
  setStep((prev) => Math.max(prev - 1, 1));
};
const handleNext4= () => {

    
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 5));
  
      // setStep((prev) => Math.min(prev + 1, 4));
      setProgress(progress >= 100 ? 0 : progress + 25);
    };


const handleNextStep = () => {
  setCurrentStep((prevStep) => Math.min(prevStep + 1, 5)); // Increase step, max 5
};
  const RenderForm=(step)=>{
    switch(step){
      case 1:
        return (<>
          <div className="col-12  ms-3 mt-4 " style={{ fontSize: "25px", fontWeight: "500" }}><span>Personal Details</span></div>
           <div className="col-md-6 ps-4 pt-4 ">
                  <div className="">
                    <label className="lavelfont">Job Title</label>
                    <input type="text" className="form-control inputfield border-none rounded-none  fw-bold"
                      id="exampleFormControlInput1"
                      name="Jobtitle"
                      value={FormData.Jobtitle}
                      onChange={handleChange}
                      placeholder="job title" />
                       {errors.Jobtitle && <span style={{ color: "red" }}>{errors.Jobtitle}</span>}
                  </div>
                </div>

                 <div className="col-md-6 p-4">  
                 <div className="d-flex ">
                 {FormData.imgUrl ?<> <img src={FormData.imgUrl} alt="img" style={{ width: "100px", height: "100px" }} /></>:<> <div style={{ height: "100px", width: "100px", backgroundColor: "#f5f5f5" }} className="d-flex justify-content-center align-items-center">
                    <img src="/images/User.png" className="img-fluid" />
                  </div></>}
                 

                  <div>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                      <span className=" hover  ms-5 Aupload cursor-pointer " onClick={handleSpanClick}>Upload Photo</span>
                    </div>
                   
                    <form action="">
                      <input
                        type="file"
                        accept="png, jpeg, jpg/*"
                        className="input-file"
                        hidden
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                    </form>
                  </div>
                </div>
                </div>


                  <div className="col-md-6 ps-4 "><div className="">
                  <label className="lavelfont">First Name</label>
                  <input type="text" className="form-control inputfield border-none rounded-none  fw-bold"
                    id="exampleFormControlInput1"
                    name="Fname"
                    value={FormData.Fname}
                    onChange={handleChange}
                    placeholder="first_name" />
                     {errors.Fname && <span style={{ color: "red" }}>{errors.Fname}</span>}
                </div></div>

                  <div className="col-md-6 ps-4"><div className="">
                  <label className="lavelfont">Last name</label>
                  <input type="text" className="form-control inputfield border-none rounded-none  fw-bold" id="exampleFormControlInput1"
                    name="Lastname"
                    value={FormData.Lastname}
                    onChange={handleChange}
                    placeholder="last_name" />
                     {errors.Lastname && <span style={{ color: "red" }}>{errors.Lastname}</span>}
                </div></div>

                 <div className="col-md-6 ps-4 pt-4"><div className="">
                  <label className="lavelfont">Email </label>
                  <input type="text" className="form-control inputfield border-none rounded-none  fw-bold"
                    id="exampleFormControlInput1"
                    name="Email"
                    value={FormData.Email}
                    onChange={handleChange}
                    placeholder="youremail@gmail.com" />
                     {errors.Email && <span style={{ color: "red" }}>{errors.Email}</span>}
                </div></div>


                <div className="col-md-6 ps-4 pt-4"><div className="">
                  <label className="lavelfont">Phone </label>
                  <input type="text" className="form-control inputfield border-none rounded-none  fw-bold"
                    id="exampleFormControlInput1"
                    name="Email"
                    value={FormData.Phone}
                    onChange={handleChange}
                    placeholder="youremail@gmail.com" />
                     {errors.Email && <span style={{ color: "red" }}>{errors.Email}</span>}
                </div></div>
                <div className="col-md-6 ps-4 pt-4"><div className="">
                  <label className="lavelfont">City</label>
                  <input type="text" className="form-control inputfield border-none rounded-none  fw-bold"
                    id="exampleFormControlInput1"
                    name="City"
                    value={FormData.City}
                    onChange={handleChange}
                    placeholder="Your City" />
                     {errors.City && <span style={{ color: "red" }}>{errors.City}</span>}
                </div>
                </div>

                 <div className="col-md-6 ps-4 pt-4"><div className="">
                  <label className="lavelfont">Country</label>
                  <input type="text" className="form-control
                         inputfield border-none rounded-none  fw-bold"
                    name="Country"
                    value={FormData.Country}
                    onChange={handleChange}
                    id="exampleFormControlInput1" placeholder="Your Country" />
                     {errors.Country && <span style={{ color: "red" }}>{errors.Country}</span>}
                </div>
                
                
                </div>
                <div className="row mt-2 " style={{height:"200px",overflowY:"auto"}}>
                <ReactQuill
                    className="quill"
                    theme="snow"
                    value={editorHtml1}
                    onChange={handleChange1}
                     />
                     </div>
                <div className="col-12 d-flex  justify-content-end mt-5" >
                     <button
                onClick={handlePrev}
                className="btn btn-success me-2" style={{ backgroundColor: "rgba(15, 139, 141, 1)" }}>Prev</button>
                <button
                onClick={handleNext}
                className="btn btn-success" style={{  backgroundColor: "rgba(15, 139, 141, 1)" }}>Next</button>
                </div>

          </>)
          // 
      case 2:
        return (
         <>
          
          <div className="col-12" style={{ fontSize: "25px", fontWeight: "500" }}>
          <span>Professional Summary</span>
      </div>
      <span className="psummury my-1   " style={{fontFamily:"Poppins, sans-serif",fontWeight:600 ,color:"#6D6D6D", fontSize:"16px"}}>Write 2-4 short and energetic sentences to interest the reader! Mention your role, experience, and most importantly, your biggest achievements, best qualities, and skills.</span>
      <div className="card ms-3 p-0 " style={{ width: "95%",}}>
          <div className="card-body">
              <div className="row">
                  <div className="col-12">
                      <span className="fs-4" style={{ fontWeight: "500", fontFamily: "poppins, sans-serif" }}>{FormData2.PositionTitle}, {FormData2.OrganisationName}</span>
                  </div>
              </div>
              <div className="row mt-3">
                  <div className="col-md-6 ps-4">
                      <div className="">
                          <label className="lavelfont">Position Title</label>
                          <input type="text" className="form-control inputfield border-none rounded-none fw-bold" 
                          id="exampleFormControlInput1" 
                          onChange={handleChange2}
                          name="PositionTitle"
                          value={FormData2.PositionTitle}
                           placeholder="Position Title" />
                             {errors.PositionTitle && <span style={{ color: "red" }}>{errors.PositionTitle}</span>}
                      </div>
                  </div>
                  <div className="col-md-6 ps-4">
                      <div className="">
                          <label className="lavelfont">Organisation Name</label>
                          <input type="text" className="form-control inputfield border-none rounded-none fw-bold" 
                          id="exampleFormControlInput1" name="OrganisationName"
                          value={FormData2.OrganisationName}
                          onChange={handleChange2}
                           placeholder="organisation_Name" />
                            {errors.OrganisationName && <span style={{ color: "red" }}>{errors.OrganisationName}</span>}
                      </div>
                  </div>
                  <div className="col-md-6 ps-4 pt-4">
                      <div className="">
                          <label className="lavelfont">City</label>
                          <input type="text" 
                           onChange={handleChange2}
                           value={FormData2.City2}
                          className="form-control inputfield border-none rounded-none fw-bold" id="exampleFormControlInput1" name="City2" placeholder="city" />
                                                      {errors.City2 && <span style={{ color: "red" }}>{errors.City2}</span>}

                      </div>
                  </div>
                  <div className="col-md-6 ps-4 pt-4">
                      <div className="">
                          <label className="lavelfont">State</label>
                          <input type="text" className="form-control inputfield border-none rounded-none fw-bold" id="exampleFormControlInput1" name="State" placeholder="youremail@gmail.com" />
                      </div>
                  </div>
                  <div className="col-md-6 ps-4 pt-4">
                      <div className="">
                          <label className="lavelfont">Start Date</label>
                          <div className="input-group">
                              <DatePicker
                                  selected={formDate.StarDate}
                                  onChange={handleChangeStart}
                                  className="form-control inputfieldDate border-none rounded-none"
                                  id="startDatePicker"
                              />
                                                          {errors.StartDate && <span style={{ color: "red" }}>{errors.StartDate}</span>}

                              <span className="input-group-text inputfield border-0 p-0 fs-4">
                              <FaCalendarAlt style={{color:"rgba(15, 139, 141, 1)"}}/>
                              </span>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-6 ps-4 pt-4">
                      <div className="">
                          <label className="lavelfont">End Date</label>
                          <div className="input-group">
                              <DatePicker
                                  selected={formDate.EndDate}
                                  onChange={handleChangeEnd}
                                  className="form-control inputfield1 border-none rounded-none"
                                  id="endDatePicker"
                              />
                              <span className="input-group-text inputfield border-0 fs-4">
                             <FaCalendarAlt style={{color:"rgba(15, 139, 141, 1)"}}/>
                              </span>
                          </div>
                          {errors.EndDate && <span style={{ color: "red" }}>{errors.EndDate}</span>}

                      </div>
                  </div>
                  <div className="m-2 switch12">
                  <Switch
                   sx={{
                    '& .MuiSwitch-thumb': {
                        backgroundColor: '#0F8B8D', // Change thumb color
                        color: '#0F8B8D',
                      },
                      '& .MuiSwitch-track': {
                        color: '#0F8B8D',
                        backgroundColor: '#0F8B8D', // Change track color
                      },
                     
                }}
                
                      checked={showDates}
                      onChange={handleSwitchChange}
                      inputProps={{ 'aria-label': 'controlled' }}
        />
                      <label htmlFor="currentlyWorkingCheckbox">I currently work here</label>
                  </div>
                  <div className="row m-0 p-0">
                    <div className="d-flex justify-content-between">   <span className=""style={{color:" #272727",fontFamily:"Poppins ,sans-serif",fontWeight:"500",fontSize:"16px" }}>Description</span>  
                     <button className="p-2 mb-1" style={{border:"1px solid #0F8B8D",color:"#0F8B8D", borderRadius:"5px", backgroundColor:"white"}}>+ Add Content</button>

                    </div>
                    <div className="row mt-2 " style={{height:"200px",overflowY:"auto"}}>
                    <ReactQuill
                    theme="snow"
                    value={editorHtml2}
                    onChange={handleChange21}
                     />
                     </div>
                  </div>
                  <div className="col-12 d-flex  justify-content-end px-1 pt-1" >
                     <button
                onClick={handlePrev3}
                className="btn btn-success me-2" style={{ backgroundColor: "rgba(15, 139, 141, 1)" }}>Prev</button>
                <button
                onClick={handleNextsummury}
                className="btn btn-success" style={{  backgroundColor: "rgba(15, 139, 141, 1)" }}>Nexts</button>
                </div>
              </div>
          </div>
      </div>
  </>
        );
        case 3:
          return(
          <>
              <div className="col-12" style={{ fontSize: "25px", fontWeight: "500" }}>
          <span>Skills Suggestions</span>
      </div>
      <span className="psummury my-1   " style={{fontFamily:"Poppins, sans-serif",fontWeight:600 ,color:"#6D6D6D", fontSize:"16px"}}>
        Highlight atleast five key skills to demonstrate your suitability for the position. 
        These skills have been carefully selected using AI to match the job requirements perfectly.</span>
        <div className="row d-flex justify-content-space-around ">
      {Array.isArray(SKillData) && SKillData.length > 0 ? (
        SKillData.map((skill, index) => (
          <div key={index} className="skill col-4 rounded-2 text-center m-2">
            <GrAdd className="fs-6 fw-bold"/>
            <span className="text-bold fs-6 fw-bold cursor-pointer" 
            onClick={() => handleAddSkill(skill)}
              >{skill}</span>
          </div>
        ))
      ) : (
        <div>{SKillData}</div>
      )}
    </div>
        <div className="col-12 d-flex  justify-content-end px-1 pt-1" >
                     <button
                onClick={handlePrev}
                className="btn btn-success me-2" style={{ backgroundColor: "rgba(15, 139, 141, 1)" }}>Prev</button>
                <button
                onClick={handleNext3}
                className="btn btn-success" style={{  backgroundColor: "rgba(15, 139, 141, 1)" }}>Nexts</button>
                </div>
          </>
          );
        case 4:
          return(
            <>
             <div className="col-12" style={{ fontSize: "25px", fontWeight: "500" }}>
          <span>Education Qualification</span>
      </div>
      <span className="psummury my-2 " style={{fontFamily:"Poppins, sans-serif",fontWeight:600 ,color:"#6D6D6D", fontSize:"16px"}}>Add your most relevant education. including programs you’re currently enrolled in.</span>
      <div className="card ms-3 p-0 " style={{ width: "95%",}}>
          <div className="card-body">
              <div className="row">
                  <div className="col-12">
                      <span className="fs-4" style={{ fontWeight: "500", fontFamily: "poppins, sans-serif" }}>Delhi Public School, Pune</span>
                  </div>
              </div>
              <div className="row mt-3">
                  <div className="col-md-6 ps-4">
                      <div className="">
                          <label className="lavelfont">School Name</label>
                          <input type="text" className="form-control inputfield border-none rounded-none fw-bold" 
                          id="exampleFormControlInput1" 
                          onChange={handleEducationaDetails}
                          name="Sname"
                          value={Formdata4.Sname}
                           placeholder="School Name" />
                             {errors.PositionTitle && <span style={{ color: "red" }}>{errors.PositionTitle}</span>}
                      </div>
                  </div>
                  <div className="col-md-6 ps-4">
                      <div className="">
                          <label className="lavelfont">School Location</label>
                          <input type="text" className="form-control inputfield border-none rounded-none fw-bold" 
                          id="exampleFormControlInput1" name="Slocation"
                          value={Formdata4.Slocation}
                          onChange={handleEducationaDetails}
                           placeholder="School _Location" />
                            {errors.OrganisationName && <span style={{ color: "red" }}>{errors.OrganisationName}</span>}
                      </div>
                  </div>
                  <div className="col-md-6 ps-4 pt-4">
                      <div className="">
                          <label className="lavelfont">Start Date</label>
                          <div className="input-group">
                              <DatePicker
                                  selected={formDate4.StarDate}
                                  onChange={handleChangeStart4}
                                  className="form-control inputfieldDate border-none rounded-none"
                                  id="startDatePicker"
                              />
                                                          {errors.StartDate && <span style={{ color: "red" }}>{errors.StartDate}</span>}

                              <span className="input-group-text inputfield border-0 p-0 fs-4">
                              <FaCalendarAlt style={{color:"rgba(15, 139, 141, 1)"}}/>
                              </span>
                          </div>
                      </div>
                  </div>
                  <div className="col-md-6 ps-4 pt-4">
                      <div className="">
                          <label className="lavelfont">End Date</label>
                          <div className="input-group">
                              <DatePicker
                                  selected={formDate4.EndDate}
                                  onChange={handleChangeEnd4}
                                  className="form-control inputfield1 border-none rounded-none"
                                  id="endDatePicker"
                              />
                              <span className="input-group-text inputfield border-0 fs-4">
                             <FaCalendarAlt style={{color:"rgba(15, 139, 141, 1)"}}/>
                              </span>
                          </div>
                          {errors.EndDate && <span style={{ color: "red" }}>{errors.EndDate}</span>}

                      </div>
                  </div>
                  <div className="col-md-6 ps-4 pt-4">
                      <div className="">
                          <label className="lavelfont">Degree</label>
                          <input type="text" 
                          name="fieldStudy"
                          onChange={handleEducationaDetails} value={Formdata4.Degree} 
                          className="form-control inputfield border-none rounded-none fw-bold"
                           id="exampleFormControlInput1" placeholder="name_of_degree" />
                           {errors.OrganisationName && <span style={{ color: "red" }}>{errors.OrganisationName}</span>}
                      </div>
                  </div>
          
                 
                  <div className="col-md-6 ps-4 pt-4">
                      <div className="">
                          <label className="lavelfont">Field of Study</label>
                          <input type="text" 
                          name="fieldStudy"
                          onChange={handleEducationaDetails} value={Formdata4.fieldStudy}
                           className="form-control inputfield border-none rounded-none fw-bold"
                           id="exampleFormControlInput1" placeholder="field_of_study" />
                           {errors.OrganisationName && <span style={{ color: "red" }}>{errors.OrganisationName}</span>}
                      </div>
                  </div>
          
                  
                  <div className="m-2 switch12">
                  <Switch
                   sx={{
                    '& .MuiSwitch-thumb': {
                        backgroundColor: '#0F8B8D', // Change thumb color
                        color: '#0F8B8D',
                      },
                      '& .MuiSwitch-track': {
                        color: '#0F8B8D',
                        backgroundColor: '#0F8B8D', // Change track color
                      },
                      fontSize: 20,
                     
                }}
                
                      checked={showDates}
                      onChange={handleSwitchChange4}
                      inputProps={{ 'aria-label': 'controlled' }}
        />
                      <label htmlFor="currentlyWorkingCheckbox"  className="">I currently work here</label>
                  </div>
                  <div className="row m-0 p-0">
                    <div className="d-flex justify-content-between">   <span className=""style={{color:" #272727",fontFamily:"Poppins ,sans-serif",fontWeight:"700",fontSize:"23px" }}>Description</span>  
                     <button className="p-2 mb-1" style={{border:"1px solid #0F8B8D",color:"#0F8B8D", borderRadius:"5px", backgroundColor:"white"}}>+ Add Content</button>

                    </div>
                 
                    <ReactQuill
                    theme="snow"
                    value={editorHtml4}
                    onChange={handleChange4}
                     />
                  </div>
                  <div className="col-12 d-flex  justify-content-end p-1" style={{marginTop:"10%",}}>
                     <button
                onClick={handlePrev4}
                className="btn btn-success me-2" style={{ backgroundColor: "rgba(15, 139, 141, 1)" }}>Prev</button>
                <button
                onClick={handleNext4}
                className="btn btn-success" style={{  backgroundColor: "rgba(15, 139, 141, 1)" }}>Nexts</button>
                </div>
              </div>
          </div>
      </div>
            </>
          );
        default:
          return null;

    }
  }
  const [isOpen, setOpen] = useState(false)
  const height = 10;  // Example height in px
  const width = '100%';  // Example width
  return (
<>
        <div className="container-fluid">
          <div className="row">
         

            <div className={`col-md-1 ll   sidebar ${isOpen ? 'open' : ''}`}>
          <div className="icon1 text-light"style={{marginLeft:"90%"}}> <Hamburger toggled={isOpen} toggle={setOpen} /></div> 
              <div className="row"><img src="/images/seekr_logo 1.png" className="img-fluid p-4" /></div>
            
              <div>
              <div>
            <div className="progress-container d-flex flex-column justify-content-center align-items-center mt-5">
                <div className="progress-line-background "></div>
                {[1, 2, 3, 4,5].map((step, index) => (
                    <React.Fragment key={step}>
                        <div
                            className="circle "
                            style={{
                                backgroundColor: currentStep >= step ? '#0F8B8D' : 'white',
                            }}
                        >
                          <div style={currentStep === step ? { color: "white" } : { color: "black" }}>{step}</div>

                        </div>
                        {index < 4 && (
                            <div
                                className="line ms-1"
                                style={{
                                    backgroundColor: currentStep >= step + 1 ? '#0F8B8D' : 'white',
                                }}
                            ></div>
                        )}
                    </React.Fragment>
                ))}
            </div>
       
        </div>
           
        </div>


            </div>
            <div className="col-md-5  ll2 ">
            <div className=" col-12 d-flex justify-content-space-between ">
                  <span className="icon1 fw-bold fs-5 pt-2">Resume Builder </span>
                  <div className="icon1" style={{marginLeft:"48%"}} ><Hamburger toggled={isOpen} toggle={setOpen} /></div>
                
                </div>
              <div className="row TopprogessSection "> 
             
              
                <div className="col-12 text-center pt-4 "><span className="head fs-2">Let’s Create your Professional Resume</span></div>
                <Container className="ps-4 pe-4">

                  <Box sx={{ width: '100%', }}>

                    <LineProgress progress={progress} height={height} width={width}/>

                  </Box>
                </Container>

              </div>

              <div className="row bg-light">
                
                     {RenderForm(step)}
                    
                    
               {/* <div className="col-12 d-flex  justify-content-end p-1" style={{marginTop:"27%",}}>
                     <button
                onClick={handlePrev}
                className="btn btn-success me-2" style={{ backgroundColor: "rgba(15, 139, 141, 1)" }}>Prev</button>
                <button
                onClick={handleNext}
                className="btn btn-success" style={{  backgroundColor: "rgba(15, 139, 141, 1)" }}>Next</button>
                </div> */}
              </div>
             

            
       
            

            </div>

            <div className="col-md-6 ll3  ">

              <div className="resume ">
         
                <div className="row">

                  <div className="resume2 row  my-0 mx-1 ">
                    <Resume formdata={FormData} SummuaryData={FormData2} EduactionalData={Formdata4} addSkill={addskill} /></div>
                </div>

              </div>
            </div>
          </div>
        </div>
     
   </>
  )
}
