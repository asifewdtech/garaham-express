import { useRouter } from "next/router";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
export const SelectButtons = ({ visitedTabs, contestData, selectButtons, currentTabIndex, handleSelect }) => {

  return (
    <Grid container className="select-button-container">
      {selectButtons.map((item, i) => {
        return (
          <Grid style={{ padding: 0 }} className="btn-grid" flex='0 0 auto' item xs={4} key={i}>
            <Item
              as="button"
              disabled={!(
                contestData.conditions.winners ||
                visitedTabs.includes(i)
              )}
              onClick={(e) => handleSelect(e, i)}
              data-tab={item}
              className={`list_btns list_items ${currentTabIndex === i ? "active_li" : null}`}
            >
              <span className="button_list_number">{`${i + 1}.`}</span> {`${item}`}
            </Item>
          </Grid>
        );
      })}
    </Grid>
  );
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
