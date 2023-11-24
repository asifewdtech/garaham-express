import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


import Fade from '@mui/material/Fade';
import CustomTooltip from "./ToolTip";


const WinnerOne = ({ count, commentsArray, setCommentsArray }) => {
  const [showEntries, setshowEntries] = useState(false);
  const [direction, setdirection] = useState("entry_right");
  console.log(commentsArray, 'arrayOfObjects')

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
        <div style={{ minHeight: '333px' }} className="row  w-100">
          {commentsArray
            ? commentsArray.map((item, i) => {
              const showCount = commentsArray.length > 1;
              return <div key={i} className="winnersGrid m-auto ">
                {(commentsArray?.length > 1) ? <h2 className="prizeWinner text-center">{i + 1}</h2> : <div style={{ height: '35px' }}> </div>}
                <div className="d-flex justify-content-center align-items-center winnerContentSec1">
                  <img src="/newwinnertrophy.png" alt="" />
                  <div className="yellowBorder marginImg">
                    <p className="py-3 px-4 winnerTitle text-primary mb-0 ellipsedText" style={{
                      maxWidth: '100%', overflow: 'hidden'     
                    }}>
                      {item.from_name}
                    </p>
                  </div>

                </div>

                <div
                  className="postSection winnerContestentScndMain position-relative py-3 px-0 px-sm-0 px-lg-4 "
                  style={{ marginLeft: "17px", paddingLeft: "16px" }}
                >



                  {/* <div className="position-absolute ellipseimg">
      <Tooltip title={<CustomTooltip />} arrow>
        <img className="mainImg" src="/ellipse.png" alt="" />
      </Tooltip>
    </div> */}
                  {/* <CustomTooltip /> */}

                  {/*  https://static.thenounproject.com/png/4035892-200.png */}
                  <div className="d-flex align-items-center centerCont pl-lg-0 pl-sm-3 pl-3 winnerContestentScnd">
                    <img style={{ width: '98px', height: '98px' }} className="winner_dp" src={item.profilepic ? item.profilepic : "/commentdp.png"} alt="" />

                    <div className="d-flex px-3 align-items-sm-start flex-wrap align-items-lg-center align-items-start fColoum">
                      <h6
                        style={{ color: "#555" }}
                        className="winnerTitleScnd mb-0"
                      >
                        {item.from_name}
                      </h6>
                      <p className="winnerMsg hide-scrollbar  mb-0 mt-2 mt-sm-2 mt-lg-0">


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