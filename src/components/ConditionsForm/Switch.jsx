import {  Switch } from "@mui/material";
import { styled } from '@mui/material/styles';

const MySwitch = styled(Switch)(({ theme }) => ({
  width: 38,
  height: 20,
  borderRadius: 13,
  padding: 0,
  boxShadow: "0px 0.5px 9px 3px rgba(0, 0, 0, 0.15)",
  "& .MuiSwitch-thumb": {
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: "#555555",
    marginTop: "-6.5px",
    marginLeft: "-4px",
  },
  "& .css-5ryogn-MuiButtonBase-root-MuiSwitch-switchBase:hover": {
    backgroundColor: 'unset'
  },
  "& .css-jsexje-MuiSwitch-thumb": {
    boxShadow: 'none'
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
    },
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#F6F9FF",
    borderRadius: 16,
  }
}));

export default MySwitch;
