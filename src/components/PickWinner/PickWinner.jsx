import {
  Box,
  Typography,
  Button,
} from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import newtrophy from "@/assets/images/newtrophy.png";
import { useRouter } from 'next/router';

const PickWinner = ({commentData}) => {
  console.log(commentData?.data, 'commentData');
  const serializedData = encodeURIComponent(JSON.stringify(commentData?.data));
  const router = useRouter();

  const handleNavigation = () => {
    // Pass data using the `query` parameter
    router.push(`/Winner/Winner?data=${serializedData}`);
  };
  return (
    <>
      <Typography className="CP_heading">
        {" "}
        Clik on the button to choose a comment!
      </Typography>
      <div style={{ textAlign: "center" }}>
        <Box>
          <Image alt="trophy" className="trophy1" src={newtrophy} />
          <div className="text-center">
            {/* <Link href="/Winner/Winner"> */}
              <Button onClick={handleNavigation} variant="contained" className="save_btn">
                Choose a Winner
              </Button>
            {/* </Link> */}
          </div>
        </Box>
      </div>
    </>
  );
};

export default PickWinner;
