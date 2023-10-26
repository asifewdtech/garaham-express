import { useState, useEffect } from "react";
import { Button, MenuItem, Typography } from "@mui/material";
import Link from "next/link";
import axios from "axios";
import Select, { SelectChangeEvent } from '@mui/material/Select';
const SelectPageContent = ({ 
  increment, 
  setContestData, 
  pages, 
  setPosts, 
  contestData, 
}) => {
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [pageName, setpageName] = useState(null)

  useEffect(() => {
    
    const selectedPage = localStorage.getItem("selectedPage");

    if (selectedPage) {
      const id = JSON.parse(selectedPage);
      setSelectedPageId(parseInt(id));
    }

  }, []);

  const handlePageChange = async (e) => {
    const selectedValue = e.target.value;

    const [id, page] = selectedValue.split("-");
setpageName(selectedValue)

    localStorage.setItem("selectedPage", JSON.stringify(id));
    localStorage.setItem("pagecontent", JSON.stringify(page));
    localStorage.removeItem("selectedConditions");
    localStorage.removeItem("selectedPost");

    await handlePage(id);
    setContestData((prev) => ({
      ...prev,
      page: page,
      postText: "",
      img: "",
      conditions: {},
    }));
  };

  const handlePage = async (id) => {
    const formData = new FormData();

    formData.append("page_id", id);
    formData.append("resource", "facebook");

    try {
      const response = await axios.post(
        "http://localhost/viralyIO/api/includes/actions.php",
        formData
      );
      if (response?.data.success) {
        setPosts(response?.data.data);
        localStorage.setItem("posts", JSON.stringify(response?.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
console.log(pageName)
  return (
    <>
      <Typography className="CP_heading"> Select your Facebook page</Typography>
      <Typography className="CP_sub_heading ">
        Choose your Facebook page
      </Typography>
      <div className="custom-select">

      {/* <Select
        id="demo-simple-select"
        className="select_page"
        name="page"
        onChange={(e) => handlePageChange(e)}
        value={pageName || ''}
        displayEmpty  
        MenuProps={{
          style: { transform: 'translateY(4px)' },
        }}
        sx={{
          '& ul': {
            maxHeight: '88px',
            display: 'inline-flex',
            flexDirection: 'column',
            gap: '18px',
            overflowY: 'auto',
          },
        }}
      >
        <MenuItem sx={{}} value="">Select your facebook page 
        </MenuItem>
        {pages.map((page) => (
          <MenuItem
            key={page.id}
            selected={selectedPageId === page.id}
            value={`${page.id}-${page.page}`}
          >
            {page.page}
          </MenuItem>
        ))}
      </Select> */}

<Select
size="5"
  id="demo-simple-select"
  className="select_page select_scrollbar" 
  name="page"
  onChange={(e) => handlePageChange(e)}
  value={pageName || ''}
  displayEmpty
  MenuProps={{
    classes: { paper: "options-container  select_scrollbar" },
  }}
 
>
<CustomMenuItem value="" id='placeholder_option' >Select your facebook page</CustomMenuItem>
 {pages.map((page) => (
    <CustomMenuItem
      key={page.id}
      selected={selectedPageId === page.id}
      value={`${page.id}-${page.page}`}
    >
      {page.page}
    </CustomMenuItem>
  ))}
</Select>





      </div>
      <Link href="#">
        <Button
        sx={{marginTop:'42px'}}
        disableTouchRipple 
          disabled={!contestData.page} 
          variant="contained" 
          className="save_btn" 
          onClick={increment}
          >
          Save and Continue
        </Button>
      </Link>
    </>
  );
};

export default SelectPageContent;

const CustomMenuItem = ({ children, ...props }) => (
  <MenuItem
    sx={{
      color: 'var(--black-700-base, #3F3B3B)',
      fontFeatureSettings: 'clig off, liga off',
      fontFamily: 'Roboto',
      fontSize: '16px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '28px',
      padding: '10px 18px',
    }}
    {...props}
  >
    {children}
  </MenuItem>
);