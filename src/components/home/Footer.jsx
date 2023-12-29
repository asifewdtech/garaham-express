// Footer.js
import React from 'react';
import Link from 'next/link';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Footer = ({ redirectLink  }) => {
  const router = useRouter();
  const serializedData = router.query.data || null;
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
          <div  onClick={()=>{handleCopyIframeCode(serializedData,redirectLink.pathname)}}  style={{ paddingLeft: '15px', paddingTop: '10px', cursor: 'pointer' }}>
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
          <div  onClick={()=>{handleCopyIframeCode(serializedData,redirectLink.pathname)}}style={{ paddingLeft: '15px', paddingTop: '10px', cursor: 'pointer' }}>
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



// Copying the iframe source to clipboard
export  const handleCopyIframeCode = (serializedData, link) => {
  const socialNetwork = link && link.split('/')[1]
  console.log(socialNetwork[1])
  const generateIframeCode = (url) => {
    return `<iframe src="${url}" width="600" height="400" frameborder="0" allowfullscreen></iframe>`;
  };

  if (typeof window !== "undefined" && serializedData) {
    const iframeCode = generateIframeCode(
     "http://localhost:3000/"+ socialNetwork + "/winners?data=" + encodeURIComponent(serializedData)
    );
    copyToClipboard(iframeCode);
    alert("copied to clipboard!");
  }
};
const copyToClipboard = (text) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
};
