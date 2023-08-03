import "@/styles/globals.css";
import "@/components/AppBar/AppBar.css";
import "@/components/CommentPicker/CommentPicker.css";
import "@/pages/SelectPage/SelectFbPage.css";
import "@/pages/SelectPost/SelectPost.css";
import "@/pages/Winner/Winner.css";
import "@/pages/ChooseWinner/ChooseWinner.css";
import "@/pages/ChooseOptions/ChooseOptions.css";
import "@/components/Winners/WinnerOne.css";
import "@/components/SelectButton/SelectButton.css";
import "@/components/Header/Header.css";
import { StyledEngineProvider } from "@mui/material/styles";

export default function App({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <Component {...pageProps} />
    </StyledEngineProvider>
  );
}
