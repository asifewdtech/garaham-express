import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import Link from "next/link";
import axios from "axios";

const SelectPageContent = ({ 
  increment, 
  setContestData, 
  pages, 
  setPosts, 
  contestData, 
}) => {
  const [selectedPageId, setSelectedPageId] = useState(null);
  // console.log(selectedPageId)
  useEffect(() => {
    const selectedPage = localStorage.getItem("selectedPage");
    // console.log(selectedPage)
    if (selectedPage) {
      const id = JSON.parse(selectedPage);
      setSelectedPageId(parseInt(id));
    }
  }, []);

  const handlePageChange = async (e) => {
    const selectedValue = e.target.value;
    const [id, page] = selectedValue.split("-");

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

  return (
    <>
      <Typography className="CP_heading"> Select your Facebook page</Typography>
      <Typography className="CP_sub_heading">
        Choose your Facebook page
      </Typography>
      <div className="custom-select">
        <select
          className="select_page"
          name="page"
          onChange={(e) => handlePageChange(e)}
        >
          <option defaultValue={!selectedPageId} value="select">
            Select your page
          </option>
          {pages.map((page) => {
            return (
              <option
                key={page.id}
                selected={selectedPageId == page.id} 
                value={`${page.id}-${page.page}`}
                >
                {page.page}
              </option>
            );
          })}
        </select>
      </div>
      <Link href="#">
        <Button
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
