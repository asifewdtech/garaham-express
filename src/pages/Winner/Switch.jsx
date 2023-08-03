import {
  Typography,
  Switch,
} from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
const MySwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: '#5065A8',
    '&:hover': {
      backgroundColor: alpha('#5065A8', theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: '#FFF',
  },
  
}));
export default MySwitch