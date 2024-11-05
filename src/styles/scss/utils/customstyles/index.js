import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const CustomButton = styled(Button)(({ theme }) => ({
  width: "340px",
  height: "52px",
  textTransform: "none",
  borderRadius: "4px",
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: "600",
  letterSpacing: "0.01rem",
  backgroundImage:
    "linear-gradient(to left, #8a3a93, #a23796, #bb3396, #d22d94, #e9278f)",
  "&:hover": {
    backgroundImage:
      "linear-gradient(to left, #8a3a93, #a23796, #bb3396, #d22d94, #e9278f)",
  },
}));

export default CustomButton;
