import React from "react";
import { useState } from "react";

const WinnerOne = ({ count, commentsArray }) => {
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
  return (
    <div className="">
      <section>
        <div className="row w-100">
          {/* <div className="col-lg-4 m-auto widthMain">
      <h2 className="prizeWinner text-center">1</h2>
      <div className="d-flex justify-content-center align-items-center winnerContentSec1">
        <img src="/newwinnertrophy.png" alt="" />
        <div className="yellowBorder marginImg">
          <h2 style={{color: "#ECC57B"}} className="py-3 px-4 winnerTitle text-primary mb-0">
          Sara Marshall
          </h2>
        </div>
      </div>
      <div className="postSection winnerContestentScndMain position-relative py-3 px-0 px-sm-0 px-lg-4 mt-5" style={{marginLeft:"17px", paddingLeft: "12px"}}>
        <div className="position-relative tooltipMain">
          <div className="tooltipSection" style={{ opacity: 0 }}>
            <p className="tooltipdesc position-relative p-4 mb-0">
              Among the whole list, there were 7 entries of @grahamjcaldwell
              user.
            </p>
          </div>
          <div
            className="position-absolute ellipseimg"
            onmouseenter="showTooltip(this,'enter')"
            onmouseleave="showTooltip(this,'leave')"
          >
            <img className="mainImg" src="/ellipse.png" alt="" />
          </div>
        </div>
        <div className="d-flex align-items-center centerCont pl-lg-0 pl-sm-3 pl-3 winnerContestentScnd">
        <img src="/commentdp.png" alt="" />

          <div className="d-flex px-3 align-items-sm-start flex-wrap align-items-lg-center align-items-start fColoum">
            <h6 style={{color: '#555'}} className="winnerTitleScnd mb-0">
            Sara Marshall
            </h6>
            <p className="mb-0 mt-2 mt-sm-2 mt-lg-0">Test Comment 🎈🎊🎉</p>
          </div>
        </div>
      </div>
    </div> */}
          {commentsArray
            ? commentsArray.map((item, i) => {
                return <div key={i} className="col-lg-4 m-auto widthMain">
                  <h2 className="prizeWinner text-center">{i + 1}</h2>
                  <div className="d-flex justify-content-center align-items-center winnerContentSec1">
                    <img src="/newwinnertrophy.png" alt="" />
                    <div className="yellowBorder marginImg">
                      <h2
                        style={{ color: "#ECC57B" }}
                        className="py-3 px-4 winnerTitle text-primary mb-0"
                      >
                        {item.from_name}
                      </h2>
                    </div>
                  </div>
                  <div
                    className="postSection winnerContestentScndMain position-relative py-3 px-0 px-sm-0 px-lg-4 mt-5"
                    style={{ marginLeft: "17px", paddingLeft: "12px" }}
                  >
                    <div className="position-relative tooltipMain">
                      <div className="tooltipSection" style={{ opacity: 0 }}>
                        <p className="tooltipdesc position-relative p-4 mb-0">
                          Among the whole list, there were 7 entries of
                          @grahamjcaldwell user.
                        </p>
                      </div>
                      <div
                        className="position-absolute ellipseimg"
                        onmouseenter="showTooltip(this,'enter')"
                        onmouseleave="showTooltip(this,'leave')"
                      >
                        <img className="mainImg" src="/ellipse.png" alt="" />
                      </div>
                    </div>
                    <div className="d-flex align-items-center centerCont pl-lg-0 pl-sm-3 pl-3 winnerContestentScnd">
                      <img src="/commentdp.png" alt="" />

                      <div className="d-flex px-3 align-items-sm-start flex-wrap align-items-lg-center align-items-start fColoum">
                        <h6
                          style={{ color: "#555" }}
                          className="winnerTitleScnd mb-0"
                        >
                          {item.from_name}
                        </h6>
                        <p className="mb-0 mt-2 mt-sm-2 mt-lg-0">
                          {item.message}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>;
              })
            : <h1>Not Comments Here</h1>}
          {/* <div className="col-lg-4 m-auto widthMain">
            <h2 className="prizeWinner text-center winnerSecMain">2</h2>
            <div className="d-flex justify-content-center align-items-center winnerContentSec1 ">
              <img src="/newwinnertrophy.png" alt="" />

              <div className="yellowBorder marginImg">
                <h2 className="text-primary py-3 px-3 winnerTitle mb-0">
                  Sara Marshall
                </h2>
              </div>
            </div>
            <div
              className="postSection winnerContestentScndMain position-relative py-3 px-0 px-sm-0 px-lg-4 mt-5"
              style={{ marginLeft: "17px", paddingLeft: "12px" }}
            >
              <div className="position-relative tooltipMain">
                <div
                  className="tooltipSection toolSectMain"
                  style={{ opacity: 0 }}
                >
                  <p className="tooltipdesc toolSectMainDesc position-relative p-4 mb-0">
                    Among the whole list, there were 7 entries of
                    @grahamjcaldwell user.
                  </p>
                </div>
                <div
                  className="position-absolute ellipseimg"
                  onmouseenter="showTooltip(this,'enter')"
                  onmouseleave="showTooltip(this,'leave')"
                >
                  <img className="mainImg" src="/ellipse.png" alt="" />
                </div>
              </div>
              <div className="d-flex align-items-center centerCont pl-lg-0 pl-sm-3 pl-3 winnerContestentScnd">
                <img src="/commentdp.png" alt="" />
                <div className="d-flex px-3 align-items-sm-start flex-wrap align-items-lg-center align-items-start fColoum">
                  <h6
                    style={{ color: "#555" }}
                    className="winnerTitleScnd mb-0"
                  >
                    Sara Marshall
                  </h6>
                  <p className="mb-0 mt-2 mt-sm-2 mt-lg-0">
                    Test Comment 🎈🎊🎉
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 m-auto widthMain">
            <h2 className="prizeWinner text-center winnerSecMain winnerSecMain_2">
              3
            </h2>
            <div className="d-flex justify-content-center align-items-center winnerContentSec1 ">
              <img src="/newwinnertrophy.png" alt="" />

              <div className="yellowBorder marginImg">
                <h2 className="py-3 px-3 winnerTitle text-primary mb-0">
                  Sara Marshall
                </h2>
              </div>
            </div>
            <div
              className="postSection winnerContestentScndMain position-relative py-3 px-0 px-sm-0 px-lg-4 mt-5"
              style={{ marginLeft: "17px", paddingLeft: "12px" }}
            >
              <div className="position-relative tooltipMain">
                <div className="tooltipSectionMain" style={{ opacity: 0 }}>
                  <p className="tooltipdescMain position-relative p-4 mb-0">
                    Among the whole list, there were 7 entries of
                    @grahamjcaldwell user.
                  </p>
                </div>
                <div
                  className="position-absolute ellipseimg"
                  onmouseenter="showTooltip(this,'enter')"
                  onmouseleave="showTooltip(this,'leave')"
                >
                  <img className="mainImg" src="/ellipse.png" alt="" />
                </div>
              </div>
              <div className="d-flex align-items-center centerCont pl-lg-0 pl-sm-3 pl-3 winnerContestentScnd">
                <img src="/commentdp.png" alt="" />

                <div className="d-flex px-3 align-items-sm-start flex-wrap align-items-lg-center align-items-start fColoum">
                  <h6
                    style={{ color: "#555" }}
                    className="winnerTitleScnd mb-0"
                  >
                    Sara Marshall
                  </h6>
                  <p className="mb-0 mt-2 mt-sm-2 mt-lg-0">
                    Test Comment 🎈🎊🎉
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
};

export default WinnerOne;
