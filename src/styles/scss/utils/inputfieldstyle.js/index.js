export const customTextFieldStyles = {
  width: "340px",
  borderRadius: "4px",
  height: "53px",
  backgroundColor: "#FFFFFF",
  "& .MuiOutlinedInput-root": {
    borderRadius: "4px",
    padding: "0px 25px 0px 0px !important",
    "& fieldset": {
      borderColor: "#A5A5A5",
      borderRadius: "4px",
    },
    "&:hover fieldset": {
      borderColor: "#A5A5A5",
      borderRadius: "4px",
    },
    "&.Mui-focused fieldset": {
      border: "1px solid #A5A5A5 !important",
      borderRadius: "4px",
    },
    "&.Mui-error .MuiOutlinedInput-notchedOutline , &:hover .Mui-error .MuiOutlinedInput-notchedOutline":
      {
        border: "1px solid #FF0000 !important",
      },
  },
  "& .MuiInputBase-input": {
    color: "#000000 !important",
    padding: "0px 10px !important",
    height: "53px",
    fontSize: "14px",
  },
  "& ::placeholder": {
    color: "#A5A5A5 !important",
  },
  "& .css-1yq5fb3-MuiButtonBase-root-MuiIconButton-root": {
    padding: "0 !important",
  },
  "& .css-1jy569b-MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
    color: "#8a3a93 !important",
  },
  " & .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root": {
    color: "#A5A5A5 !important",
    fontSize: "14px",
  },
};
