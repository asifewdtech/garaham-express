import {  Switch } from "@mui/material";
import { styled } from '@mui/material/styles';

const MySwitch = styled(Switch)(({ theme }) => ({
  width: 38,
  height: 23,
  borderRadius: 13,
  padding: 0,
  "& .MuiSwitch-thumb": {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: "#555555",
    // boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.23)",
    marginTop: "-6.5px",
    marginLeft: "-4px",
  },
  "& .MuiSwitch-switchBase.Mui-checked": {
    transform: "translateX(13px)",
    color: '#5065A8', // Color of the thumb when checked
    "& .MuiSwitch-thumb": {
      backgroundColor: "#5065A8", // Color of the thumb when checked
    },
    "& + .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "#F6F9FF",
      border: "1px #cccecf solid", // Border effect
    },
  },
  "& .MuiSwitch-track": {
    // opacity: 1,
    backgroundColor: "#F6F9FF",
    borderRadius: 16,
    height: "87%",
    border: "2px #cccecf solid",
    // boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.23)",
  },
}));

export default MySwitch;
