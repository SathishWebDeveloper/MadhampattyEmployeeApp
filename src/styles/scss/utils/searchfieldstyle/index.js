import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

const StyledSearchField = styled(TextField)(() => ({
  width: 244,
  height: 42,
  borderRadius: 4,
  "& .MuiOutlinedInput-input": {
    height: 42,
    padding: 0,
  },
  "& .MuiOutlinedInput-root": {
    "&:hover": {
      "& fieldset": {
        borderColor: "#8A3A93 !important",
      },
    },
    "& fieldset": {
      borderColor: "#E0E0E0 !important",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#8A3A93!important",
    },
  },
}));

export default StyledSearchField;
