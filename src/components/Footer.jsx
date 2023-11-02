// Footer.js
import React from 'react';
import Link from 'next/link';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';

const Footer = ({ redirectLink, iframe }) => {

  const generateIframe = () => {
   iframe()
  };

  return (
    <Box className="" >
      <Box className='footer1' display="flex" flexWrap="wrap">  <div className="pick">
        <Link style={{ textDecoration: 'none', color: 'white' }} href="/">
          <Typography style={{ cursor: 'pointer' }} className="new_contest active">
            Start a New Contest
          </Typography>
        </Link>

      </div>
        <div className="share" style={{ cursor: 'pointer' }}>
          <Typography>Share the results</Typography>
          <div className="svg-container"></div>
          <div className="share_link">
            <Link href="#">https://viralkit.io/</Link>
          </div>
          <div  onClick={generateIframe}  style={{ paddingLeft: '15px', paddingTop: '10px', cursor: 'pointer' }}>
            <Image src="/copy.png" width="24" height="24" alt="copy"></Image>
          </div>
        </div>
        <Link style={{ textDecoration: 'none', color: 'white' }} href={redirectLink}>
          <Typography style={{ cursor: 'pointer' }} className="new_winner">
            Pick Another Winner
          </Typography>
        </Link>
      </Box>
      {/* for small screen  */}
      <div className='sm_footer'>


        <div className="share" style={{
          cursor: "pointer",
        }}>
          <Typography>Share the results</Typography>
          <div className="svg-container"></div>
          <div    className="share_link">
            <Link href="#">https://viralkit.io/</Link>
          </div>
          <div onClick={generateIframe} style={{ paddingLeft: '15px', paddingTop: '10px', cursor: 'pointer' }}>
            <Image src="/copy.png" width="24" height="24" alt="copy"></Image>
          </div>
        </div>
        <Box display='flex' width='100%' gap='6px'>
          <Link style={{ textDecoration: 'none', color: 'white' }} href="/">
            <Typography style={{ cursor: 'pointer' }} className="new_contest active">
              Start a New Contest
            </Typography>
          </Link>
          <Link style={{ textDecoration: 'none', color: 'white' }} href={redirectLink}>
            <Typography style={{ cursor: 'pointer' }} className="new_winner">
              Pick Another Winner
            </Typography>
          </Link>


        </Box>


      </div>
    </Box>

  );
};

export default Footer;
