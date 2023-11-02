import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


import Fade from '@mui/material/Fade';


const WinnerOne = ({ count, commentsArray, setCommentsArray }) => {
  const [showEntries, setshowEntries] = useState(false);
  const [direction, setdirection] = useState("entry_right");
  console.log(commentsArray , 'arrayOfObjects')

  const handleHover = (e) => {
    setshowEntries(true);
    let margin_left = e.clientX + 290;
    console.log(margin_left < window.innerWidth);
    if (margin_left < window.innerWidth) {
      setdirection("entry_right");
    } else {
      setdirection("entry_left");
    }
  };
  
  const router = useRouter();

  const serializedUrlData = router.query.data || null;
  useEffect(() => {
    const serializedData = localStorage.getItem("myData");
    if (serializedData) {
      const arrayOfObjects = JSON.parse(decodeURIComponent(serializedData));
      setCommentsArray(arrayOfObjects);
    }
  }, []);

  return (
    <div className="">
      <section>
        <div style={{minHeight:'333px'}} className="row  w-100">
          {commentsArray
            ? commentsArray.map((item, i) => {
              const showCount = commentsArray.length > 1;
                return <div key={i} className="winnersGrid m-auto ">
               {(commentsArray?.length>1  )?      <h2 className="prizeWinner text-center">{i + 1}</h2>:<div style={{height:'35px'}}> </div>}
                  <div className="d-flex justify-content-center align-items-center winnerContentSec1">
                    <img src="/newwinnertrophy.png" alt="" />
               <div className="yellowBorder marginImg">
               <p className="py-3 px-4 winnerTitle text-primary mb-0 ellipsedText" style={{
  maxWidth: '100%',  overflow:'hidden'     // Adjust the maximum width as needed
}}>
                        {item.from_name}
                      </p>
                    </div>
               
                  </div>
                  
                  <div
                    className="postSection winnerContestentScndMain position-relative py-3 px-0 px-sm-0 px-lg-4 "
                    style={{ marginLeft: "17px", paddingLeft: "16px" }}
                  >
                  
                    
                    <div className="position-relative tooltipMain">
                      <div className="tooltipSection" style={{ opacity: 1}}>
                        <p className="tooltipdesc position-relative p-4 mb-0">
                          Among the whole list, there were 7 entries of
                          @grahamjcaldwell user.
                        </p>
                      </div>
                      <div
                        className="position-absolute ellipseimg"
                      >
                          <img className="mainImg" src="/ellipse.png" alt="" />
                      </div>
                   </div>
                    {/*  https://static.thenounproject.com/png/4035892-200.png */}
                    <div className="d-flex align-items-center centerCont pl-lg-0 pl-sm-3 pl-3 winnerContestentScnd">
                      <img style={{width:'98px', height:'98px'}} className="winner_dp" src={item.profilepic ? item.profilepic : "/commentdp.png"}  alt="" />

                      <div className="d-flex px-3 align-items-sm-start flex-wrap align-items-lg-center align-items-start fColoum">
                        <h6
                          style={{ color: "#555" }}
                          className="winnerTitleScnd mb-0"
                        >
                          {item.from_name}
                        </h6>
                        <p     className="winnerMsg hide-scrollbar  mb-0 mt-2 mt-sm-2 mt-lg-0">
                        {/* <TruncateText text={item.message} maxLength={40} /> */}
                       
     {item.message} 
                        </p>
                      </div>
                    </div>
                  </div>
                </div>;
              })
            : null}
        </div>
      </section>
    </div>
  );
};

export default WinnerOne;
function TruncateText({ text, maxLength }) {
  // if (text.length <= maxLength) {
    return <p  style={{
    maxWidth: '60%', }} className=" ellipsedText winnerMsg mb-0 mt-2 mt-sm-2 mt-lg-0">{text}</p>;
  // } else {
  //   const truncatedText = text.slice(0, maxLength) + '...';
  //   return <p  style={{ whiteSpace: 'nowrap', 
  //   overflow: 'hidden',  
  //   textOverflow: 'ellipsis', 
  //   maxWidth: '70%', }} className="winnerMsg mb-0 mt-2 mt-sm-2 mt-lg-0">{truncatedText}</p>;
  // }
}

const CustomTooltip = ({ title, children }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const tooltipContentStyle = {
    display: isTooltipVisible ? 'block' : 'none',
    position: 'absolute',
    top: '-200px', // Adjust for your layout
    left: '-150px', // Adjust for your layout
    zIndex: 999, // Ensure it appears on top of other content
  };

  const svgStyle = {
    width: '314px',
    height: '178px',
    filter: 'drop-shadow(3px 4px 17px rgba(0, 0, 0, 0.07))',
    backgroundColor: '#FFF',
  };

  const textStyle = {
    fontSize: '24px',
    fill: 'black', // Color of the text
  };

  return (
    <div style={{ position: 'relative',     transform: "translateY(calc(50% - 20px))", margin:'auto', display: 'inline-block' }}>
      <div
        onMouseEnter={() => setIsTooltipVisible(true)}
        onMouseLeave={() => setIsTooltipVisible(false)}
      >
        {children}
      </div>
      <div style={tooltipContentStyle}>
        <Tooltip title={title}>
        <svg xmlns="http://www.w3.org/2000/svg" width="314" height="178" viewBox="0 0 314 178" fill="none">
  <g filter="url(#filter0_d_166_3535)">
    <path d="M18 32C18 23.7157 24.7157 17 33 17H275C283.284 17 290 23.7157 290 32V123.624C290 131.908 283.284 138.624 275 138.624H57.8846C53.514 138.624 49.3609 140.53 46.5113 143.844L43.0213 147.902C34.4143 157.911 18 151.825 18 138.624V32Z" fill="white"/>
  </g>
  <defs>
    <filter id="filter0_d_166_3535" x="0" y="0" width="314" height="177.883" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
      <feFlood flood-opacity="0" result="BackgroundImageFix"/>
      <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
      <feMorphology radius="4" operator="dilate" in="SourceAlpha" result="effect1_dropShadow_166_3535"/>
      <feOffset dx="3" dy="4"/>
      <feGaussianBlur stdDeviation="8.5"/>
      <feComposite in2="hardAlpha" operator="out"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
      <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_166_3535"/>
      <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_166_3535" result="shape"/>
    </filter>
  </defs>

  <text x="100" y="100" font-size="20" fill="black">{title}</text>
</svg>

        </Tooltip>
      </div>
    </div>
  );
};


