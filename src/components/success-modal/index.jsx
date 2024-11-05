import { Box } from "@mui/material";
import successImage from "assets/images/icons/successImage.png";

const SuccessMessage = ({ content }) => {
  return (
    <Box className="message-area flex-col">
      <Box>
        <img src={successImage} className="apisuccess-image" alt="success" />
      </Box>
      <Box className="message-container">{content}</Box>
    </Box>
  );
};
export default SuccessMessage;
