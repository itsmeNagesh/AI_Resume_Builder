
"use client"
import { rootCertificates } from "tls";
  import './summury.css'
  import React, { useState, useEffect,useRef } from 'react';
import { Container, Button, Box } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { Console } from "console";
export default function Profsummury({Fildata}:any) {

    
    const intialValue={
      PositionTitle: "",
      OrganisationName: "",
      City: "",
      State: "",
      StarDate: 0,
      EndDate: 0,
    };
      const[flag,setflag]=useState(false);
      const[FormData,setFormData]=useState(intialValue);
      const handleChange=(e:any)=>{
        // const {name}=e.target
        setFormData({...FormData,[e.target.name]:e.target.value})
      }
console.log('FormData123',FormData);
  //  Fildata(FormData.PositionTitle,FormData.OrganisationName,FormData.City,FormData.State,FormData.StarDate,FormData.EndDate);
    
    return (
        <>
        
        <div className="row">
                      <div className="col-12  ms-3 mt-4 " style={{fontSize:"25px" , fontWeight:"500"}}><span>Professional Summary</span></div>
                      <span>Write 2-4 short and energetic sentences to interest the reader! Mention your role, experience, and most importantly, your biggest achievements, best qualities, and skills.</span>
                      
                      <div className="col-md-6 ps-4 pt-4">

                        <div className="">
                        <label className="lavelfont">PositionTitle</label>
                        <input type="text"className="form-control inputfield border-none rounded-none  fw-bold"
                         id="exampleFormControlInput1"
                         name="PositionTitle"
                         value={FormData.PositionTitle}
                         onChange={handleChange}
                          placeholder="job title" />
                        </div>
                      </div>
                    
                      <div className="col-md-6 p-4">   <div className="d-flex ">
                       
                     
                        <div>
                        
                            </div>
                        </div>
                        </div>
                      <div className="col-md-6 ps-4 "><div className="">
                        <label className="lavelfont"> Organisation Name</label>
                        <input type="text" className="form-control inputfield border-none rounded-none  fw-bold" 
                        id="exampleFormControlInput1" 
                        name="OrganisationName"
                        value={FormData.OrganisationName}
                        onChange={handleChange}
                        placeholder="first_name" />
                        </div></div>
                      <div className="col-md-6 ps-4"><div className="">
                        <label className="lavelfont">City</label>
                        <input type="text"className="form-control inputfield border-none rounded-none  fw-bold" id="exampleFormControlInput1" 
                         name="City"
                         value={FormData.City}
                         onChange={handleChange}
                        placeholder="last_name" />
                        </div></div>
                      <div className="col-md-6 ps-4 pt-4"><div className="">
                        <label className="lavelfont">State</label>
                        <input type="text"className="form-control inputfield border-none rounded-none  fw-bold" 
                        id="exampleFormControlInput1" 
                        name="State"
                        value={FormData.State}
                        onChange={handleChange}
                        placeholder="youremail@gmail.com" />
                        </div></div>
                      <div className="col-md-6 ps-4 pt-4"><div className="">
                        <label className="lavelfont">Start Data</label>
                        <input type="calendar"className="form-control inputfield border-none rounded-none  fw-bold" 
                        id="exampleFormControlInput1" 
                        name="StarDate"
                        value={FormData.StarDate}
                        onChange={handleChange}
                        placeholder="+0 0000000000" />
                        </div>
                        </div>
                        <div className="col-md-6 ps-4 pt-4"><div className="">
                        <label className="lavelfont">End Date</label>
                        <input type="calendar"className="form-control inputfield border-none rounded-none  fw-bold" 
                        id="exampleFormControlInput1"
                        name="EndDate"
                        value={FormData.EndDate}
                        // onChange={handleChange}
                         placeholder="Your City" />
                        </div>
                        </div>
                        

                  </div></>
    );
}