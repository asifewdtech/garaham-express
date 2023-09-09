import { Button, Typography } from "@mui/material";
import Link from "next/link";
import axios from "axios";

const SelectPageContent = ({ increment, setContestData, pages, setPosts }) => {
  const handlePageChange = async (e) => {
    const selectedValue = e.target.value;
    const [id, page] = selectedValue.split("-");
    await handlePage(id);
    setContestData((prev) => ({ ...prev, [e.target.name]: page }));
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
          <option value="select">Select your page</option>
          {pages.map((page) => {
            return (
              <option key={page.id} value={`${page.id}-${page.page}`}>
                {page.page}
              </option>
            );
          })}
        </select>
      </div>
      <Link href="#">
        <Button variant="contained" className="save_btn" onClick={increment}>
          Save and Continue
        </Button>
      </Link>
    </>
  );
};

export default SelectPageContent;
