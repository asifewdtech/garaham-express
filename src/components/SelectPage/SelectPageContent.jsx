import { Box, Button, Typography,} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
const SelectPageContent = ({ increment, setContestData}) => {
const [page, setPage] = useState('')


const handlePageChange = (e) => {
  setContestData(prev => ({ ...prev, [e.target.name]: e.target.value }));
};

  return (
    <>
    
          <Typography className="CP_heading">
            {" "}
            Select your Facebook page
          </Typography>
          <Typography className="CP_sub_heading">
            Choose your Facebook page
          </Typography>
          <div className="custom-select">
      <select className="select_page" name="page" value={page} onChange={(e)=>handlePageChange(e)}>
        <option>Test Page</option>
        <option>Test 1</option>
        <option>Test 2</option>
        <option>Test 3</option>
      </select>
    </div>
          <Link href="#">
            <Button variant="contained" className="save_btn" onClick={increment} >
              Save and Continue
            </Button>
          </Link>
    
    </>
  );
};

export default SelectPageContent;
