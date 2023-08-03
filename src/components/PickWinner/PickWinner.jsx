import { Box,Card, Typography, CardContent, CardMedia , Button } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import trophy from '@/assets/images/winner.png'


const PickWinner = () => {
  return <>
    <Typography className="CP_heading">
      {" "}
      Clik on the button to choose a comment!
    </Typography>
    <div>
      <Box>
          <Image
            alt='trophy'
            className='trophy1'
            src={trophy}
          />
   <div className="text-center">
   <Link href='/Winner/Winner' >
            <Button variant="contained" className="save_btn">
            Choose a Winner
            </Button>
          </Link>
   </div>
      </Box>
    </div>
  </>
}

export default PickWinner;