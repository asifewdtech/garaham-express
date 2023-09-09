import { useRouter } from "next/router";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const SelectButton = () => {
  const [selectTab, setselectedTab] = useState("Select a page");
  const router = useRouter();
  const selectButtons = ['Select a page', 'Select a post', 'Choose options', 'Pick a winner'];
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const handleSelect = (e) => {
    e.preventDefault();
    const tab = e.target.dataset.tab;
    setselectedTab(tab);
  }

  return <>
    <Grid container spacing={2} className='select-button-container'>
      {selectButtons.map((item, i) => {
        return <Grid item xs={3} key={i}>
          <Item onClick={handleSelect} data-tab={item} className={`list_items ${selectTab === item ? "active_li" : null}`}>
            <span className="button_list_number">{`${i + 1}.`}</span> {`${item}`}
          </Item>
        </Grid>
      })}
    </Grid>
  </>
}

export default SelectButton;