"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './resume.css';

export default function Resume({ formdata,SummuaryData,EduactionalData,addSkill }) {
    const { Fname, Lastname, Email, Phone, City, Country, imgUrl, Jobtitle ,content1} = formdata;
    const{PositionTitle,OrganisationName,City2,State,StarDate,EndDate,content2 }=SummuaryData;
    const{Sname,Slocation,Sdate,Edate,Degree,fieldStudy ,content4} =EduactionalData
    // const formattedDate = `${StarDate.getDate()}/${StarDate.getMonth() + 1}/${StarDate.getFullYear()}`;  
    // const formattedDate2 = `${EndDate.getDate()}/${EndDate.getMonth() + 1}/${EndDate.getFullYear()}`;
console.log('skillre', addSkill);
    console.log('formdata11', imgUrl);
    
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });



    useEffect(() => {
        
    }, [formdata]);

    return (
      <>
        <div>
          {/* <button onClick={handlePrint} className='btn btn-primary'>Print this out!</button> */}
          <div className="row  overflow-hidden w-100 headsec" >
        <div className="col-6 d-flex pb-1 ">
          <img src="/images/Frame 158.png" className="img-fluid  buildericon cursor-pointer"  />
          <span  className="ms-3 text-light fw-bold cursor-pointer fs-5">-</span>
          <span className="ms-3 text-light fw-bold fs-5">Aa</span>
          <span className="ms-3 text-light fw-bold fs-5">+</span>
        </div>
        <div className="col-6 d-flex   headerimageOption pb-1" >
          <div className="download rounded  cursor-pointer  ">
            <span onClick={handlePrint}>Download</span>
          </div>
          <div className="dots rounded dots ">
             <span className="d-flex justify-content-center align-items-center fw-bold text-light " >...</span>
          </div>
          </div>
        </div>
        </div>
        <div ref={componentRef} className="container   kk " style={{overflowY:"scroll"}}>
          <div className="header">
            <div className="full-name row">
              <div className="col-sm-6">
                <div className='d-flex'>
                  <span className="first-name fs-3 pt-2">{Fname}</span>
                  <span className="last-name fw-bold ms-2 fs-3 pt-2">{Lastname}</span>
                </div>
                <div className="contact-info">
                  <div className="d-flex">
                    <span className="email fs-6">Email: </span>
                    <span className="email-val fs-6">{Email}</span>
                  </div>
                  <div className="d-flex justtify-content-center">
                    <span className="phone fs-6">Phone: </span>
                    <span className="phone-val fs-6"> {Phone}</span>
                  </div>
                  <div className='d-flex'>
                    <span className="fs-6">{City},</span>
                    <span className="fs-6"> {Country}</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 d-flex justify-content-end pe-4 pb-1 pt-0 fs-6">
                <img src={imgUrl} alt="img" style={{ width: "100px", height: "100px" }} />
              </div>
            </div>
            <div className="about">
              <span className="position">{Jobtitle}</span>
              <span className="desc">
                {/* I am a front-end developer with more than 3 years of experience writing html, css, and js. I'm motivated, result-focused and seeking a successful team-oriented company with opportunity to grow. */}
               
                <p
          className="curr-dec-para"
          dangerouslySetInnerHTML={{
            __html:  content1, // Just pass value here
          }}
        ></p>
              </span>
            </div>
          </div>
          <div className="details">
            <div className="section">
              <div className="section__title">Experience</div>
              <div className="section__list">
                <div className="section__list-item">
                  <div className="left">
                    <div className="name">{OrganisationName}</div>
                    <div className="addr">{City2},{State}</div>
                    <div className="duration">{StarDate.toString()} - {EndDate.toString()}</div>
                    <span className="desc">
                <p
          className="curr-dec-para"
          dangerouslySetInnerHTML={{
            __html:  content2, // Just pass value here
          }}
        ></p>
              </span>
                  </div>
                  <div className="right">
                    <div className="name">{PositionTitle}</div>
                    <div className="desc">did This and that</div>
                  </div>
                </div>
                <div className="section__list-item">
                  <div className="left">
                    <div className="name">Akount</div>
                    <div className="addr">San Monica, CA</div>
                    <div className="duration">Jan 2011 - Feb 2015</div>
                  </div>
                  <div className="right">
                    <div className="name">Fr developer</div>
                    <div className="desc">did This and that</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="section__title">Education</div>
              <div className="section__list">
                <div className="section__list-item">
                  <div className="left">
                    <div className="name">{Sname}</div>
                    <div className="addr">{Slocation}</div>
                    <div className="duration">{Sdate} - {Edate}</div>
                  </div>
                  <div className="right">
                    <div className="name">{Degree}</div>
                    <div className="desc">{fieldStudy}</div>
                  </div>
                </div>
                <div className="section__list-item">
                  <div className="left">
                    <div className="name">Akount</div>
                    <div className="addr">San Monica, CA</div>
                    <div className="duration">Jan 2011 - Feb 2015</div>
                  </div>
                  <div className="right">
                    <div className="name">Fr developer</div>
                    <div className="desc">did This and that</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="section__title">Projects</div>
              <div className="section__list">
                <div className="section__list-item">
                  <div className="name">DSP</div>
                  <div className="text">
                    I am a front-end developer with more than 3 years of experience writing html, css, and js. I'm motivated, result-focused and seeking a successful team-oriented company with opportunity to grow.
                  </div>
                </div>
                <div className="section__list-item">
                  <div className="name">DSP</div>
                  <div className="text">
                    I am a front-end developer with more than 3 years of experience writing html, css, and js. I'm motivated, result-focused and seeking a successful team-oriented company with opportunity to grow. <a href="/login">link</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="section">
              <div className="section__title">Skills</div>
             
              <div className="d-flex justify-content-between">
                <div className="left12">
                  <div className="name12 fw-bold">{addSkill}</div>
                </div>
           
              </div>
            </div>
            <div className="section">
              <div className="section__title">Interests</div>
              <div className="section__list">
                <div className="section__list-item">
                  Football, programming.
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
}
