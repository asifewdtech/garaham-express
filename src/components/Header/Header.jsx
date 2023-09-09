import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, Grid, CardContent, Hidden } from "@mui/material";

const Header = () => {
  return <>
    <div className="banner">
      <Box className="header-bg-text header-bg-text-all">
        <Typography className='header-cp' sx={{ color: '#555', fontWeight: 'bold', mb: 2 }}>
          Comment Picker
        </Typography>
        <Typography className='header-p' sx={{ color: '#ffffff', mb: 4 }}>
          Discover the ultimate solution to effortlessly select winners in your social media contests!
          Our tool is designed to randomly determine Instagram, Facebook, YouTube, Tik Tok and Twitter contest winners.
        </Typography>
      </Box>
    </div>
  </>
}

export const MainPageHeader = () => {
  return <>
    <div className="main-banner">
      <Box className="header-bg-text">
        <Typography className='header-cp' sx={{ color: '#555', fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
          Comment Picker
        </Typography>
        <Typography className='header-p' sx={{ color: '#ffffff', mb: 4 }}>
          Discover the ultimate solution to effortlessly select winners in your social media contests!
          Our tool is designed to randomly determine Instagram, Facebook, YouTube, Tik Tok and Twitter contest winners.
        </Typography>
        <Hidden xsDown smDown mdDown lgDown>
      <div className="upperCard">
        <Card className='upperCardInner' sx={{ padding: "0 15px 0 15px" }}>
          <CardContent className='upperCardInner-1'>
            <Typography
              variant="p"
              align="center"
              className="rightSideBoxHeading"
            >
              Increase Engagement
            </Typography>

            <div className="CardImages">
              <img src="/top-image.png" alt="" className='' />
              
            </div>

          </CardContent>
        </Card>
      </div>
    </Hidden>
      </Box>
    </div>

    <Hidden xsDown smDown mdDown lgDown>
      <div className="leftSidebox">
        <Card className='leftSideboxShadow'>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography
              variant="p"
              align="center"
              className="leftSideboxHeading"
            >
              Grow Your Social Media Following
            </Typography>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={4} sm={4}>
                <img
                  // src={socialimg}
                  src='/socail-img.png'
                  alt="Left Image"
                  style={{ width: "66px", height: "65px", flexShrink: "0" }}
                />
              </Grid>
              <Grid item xs={4} sm={4}>
                <Typography variant="h2" align="center">
                  20k
                </Typography>
              </Grid>
              <Grid item xs={4} sm={4}>
                <img
                  src='/path.png'
                  alt="Right Image"
                  style={{
                    width: "49px",
                    height: "53.712px",
                    flexShrink: "0",
                    marginLeft: "20px",
                  }}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    </Hidden>

    <Hidden xsDown smDown mdDown lgDown>
      <div className="rightSideBox">
        <Card className='rightSideBoxInner'>
          <CardContent className='bottomCardInner-1'>
            <Typography
              variant="p"
              align="center"
              className="rightSideBoxHeading"
            >
              Collaborate With Brands
            </Typography>
            <Grid item xs={12} sm={12} container alignItems="center" justifyContent="center">
                <img
                  src='/deal.png'
                  alt="Left Image"
                  style={{
                    flexShrink: "0",
                  }}
                />
            </Grid>
          </CardContent>
        </Card>
      </div>
    </Hidden>

 
  </>
}

const ThreeLines = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 97 32" fill="none" className="ThreeLines">
    <path d="M1 14L72 1M1 23L45.5 31.5M1 18.5L96.5 29" stroke="#5065A8" />
  </svg>
);

export default Header;