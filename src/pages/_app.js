import "@/styles/globals.css";
import "@/assets/css/AppBar.css";
import "@/assets/css/CommentPicker.css";
import "@/assets/css/SelectFbPage.css";
import "@/assets/css/SelectPost.css";
import "@/assets/css/Winner.css";
import "@/assets/css/ChooseWinner.css";
import "@/assets/css/ChooseOptions.css";
import "@/assets/css/WinnerOne.css";
import "@/assets/css/SelectButton.css";
import "@/assets/css/Header.css";
import { StyledEngineProvider } from "@mui/material/styles";

export default function App({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <Component {...pageProps} />
    </StyledEngineProvider>
  );
}
