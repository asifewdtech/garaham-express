import React from "react";
import {useEffect } from "react";
import { useRouter } from 'next/router';
import Tooltip, {  tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

const WinnerOne = ({ commentsArray, setCommentsArray }) => {
 
  const router = useRouter();
  let serializedData = router.query.data || null;
  useEffect(() => {
    if (serializedData && serializedData !== "undefined") {
      const arrayOfObjects = JSON.parse(decodeURIComponent(serializedData));
      console.log(arrayOfObjects)
      setCommentsArray(arrayOfObjects);
    }
    else {
      setCommentsArray(null)
    }
  }, [serializedData]); 

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
                  <div className="position-absolute ellipseimg">
                    <UserEntries 
                      title="Among the whole list, there were 7 entries of @saramarshall user."
                      placement="top-start"
                      arrow
                      // open
                    >
                      <img className="mainImg" src="/ellipse.png" alt="" />
                    </UserEntries>

                  </div>

                  <div className="d-flex align-items-center centerCont pl-lg-0 pl-sm-3 pl-3 winnerContestentScnd">
                    <img style={{ width: '98px', height: '98px', borderRadius: "100%" }} className="winner_dp" src={item.profilepic ? item.profilepic : "/commentdp.png"} alt="" />

                    <div className="d-flex px-3 align-items-sm-start flex-wrap align-items-lg-center align-items-start fColoum">
                      <h6
                        style={{ color: "#555" }}
                        className="winnerTitleScnd mb-0"
                      >
                        {item.from_name}
                      </h6>
                      <p dangerouslySetInnerHTML={{ __html: item.message }} className="winnerMsg hide-scrollbar mb-0 mt-2 mt-sm-2 mt-lg-0"></p>

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

const UserEntries = styled(({ className, ...props }) => (
  <Tooltip sx={{
    '& .MuiTooltip-arrow': {
      background: 'red',
      "&::before": {
        backgroundColor: "blue",
        border: "2px solid red"
      },
    },
  }} {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'white',
    color: '#555',
    padding: '17px 21px',
    boxShadow: theme.shadows[1],
    fontSize: 20,
    borderRadius: '10px',
    lineHeight: '30px',
    fontWeight: 500,
  },
  arrow: {
    fontSize: 20,
    color: "#4A4A4A",
    "&::before": {
      backgroundColor: "blue",
      border: "2px solid red"
    },
    "&:before": {
      border: "1px solid #E6E8ED"
    },
  },
  // '&.arrow': {
  //   position: 'absolute', // Change 'relative' to 'absolute'
  //   '&:before': {
  //     content: '""',
  //     position: 'absolute',
  //     top: '-10px',
  //     left: '50%',
  //     backgroundColor: "white !important",
  //     transform: 'translateX(-50%)',
  //     borderTop: '10px solid #fff',
  //     borderLeft: '10px solid transparent',
  //     borderRight: '10px solid transparent',
  //     borderRadius: '4px',
  //   },
  // },
}));
