import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

const CustomResizeButton = styled(Button)(
  ({ theme, width, height, fontSize }) => ({
    width: width || "250px",
    height: height || "42px",
    textTransform: "none",
    borderRadius: "4px",
    color: "#ffffff",
    fontSize: fontSize,
    fontWeight: "600",
    letterSpacing: "0.01rem",
    backgroundImage:
      "linear-gradient(to left, #8a3a93, #a23796, #bb3396, #d22d94, #e9278f)",
    "&:hover": {
      backgroundImage:
        "linear-gradient(to left, #8a3a93, #a23796, #bb3396, #d22d94, #e9278f)",
    },
  })
);

export default CustomResizeButton;
