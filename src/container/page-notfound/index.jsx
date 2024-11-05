import {
  Box
} from "@mui/material";
import image404 from "assets/svg/404gif.gif";

const PageNotFound = () => {
  return (
    // <div>
    <Box className="full-page flex-box">
      <img src={image404} alt="Your SVG" className="pagenotimg" />
    </Box>
    // </div>
  );
};

export default PageNotFound;
