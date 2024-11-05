import { Box, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/system";
import { useState } from "react";
import { customTextFieldStyles } from "styles/scss/utils/inputfieldstyle.js";

const StyledCheckbox = styled(Checkbox)(({ theme }) => ({
  color: "#8A3A93",
  "&.Mui-checked": {
    color: "#DD298F",
  },
  "& .MuiSvgIcon-root": {
    width: "18px !important",
    height: "18px !important",
  },
}));
const checkboxData = [
  { name: "viewglobal", value: false, label: "view (Global)" },
  { name: "viewown", value: false, label: "view (Own)" },
  { name: "create", value: false, label: "Create" },
  { name: "edit", value: false, label: "Edit" },
  { name: "delete", value: false, label: "Delete" },
];

const StaffHandlePermission = () => {
  const [leadEntry, setLeadEntry] = useState(() => checkboxData);
  const [dashboardEntry, setDashboardEntry] = useState(() => checkboxData);

  const handleChange = (event, name, checkboxfield) => {
    if (checkboxfield === "lead") {
      setLeadEntry((prevCheckboxes) =>
        prevCheckboxes.map((checkbox) =>
          checkbox.name === name
            ? { ...checkbox, value: event.target.checked }
            : checkbox
        )
      );
    } else if (checkboxfield === "dashboard") {
      setDashboardEntry((prevCheckboxes) =>
        prevCheckboxes.map((checkbox) =>
          checkbox.name === name
            ? { ...checkbox, value: event.target.checked }
            : checkbox
        )
      );
    }
  };
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994, value: "redem" },
    { label: "The Godfather", year: 1972, value: "godfather" },
    { label: "The Godfather: Part II", year: 1974, value: "part 2 " },
    { label: "The Dark Knight", year: 2008, value: "redem" },
    { label: "12 Angry Men", year: 1957, value: "redem" },
    { label: "Schindler's List", year: 1993, value: "redem" },
    { label: "Pulp Fiction", year: 1994, value: "redem" },
  ];
  return (
    <Box className="staffprofile-container">
      <Box className="staffprofile-selectfieldbox">
        <Autocomplete
          id="combo-box-demo"
          options={top100Films}
          sx={customTextFieldStyles}
          renderInput={(params) => (
            <TextField name="designation" label="Role" {...params} />
          )}
        />
      </Box>
      <Box className="staffprofile-checkboxarea">
        <Box className="staffprofile-viewpermission box1">
          <Box className="staffprofile-titlefield">Features</Box>
          <Box className="staffprofile-titlefield">Capability</Box>
        </Box>
        <Box className="staffprofile-viewpermission box2">
          <Box className="staffprofile-leadsentry">Lead Entry</Box>
          <Box className="staffprofile-leadsdata">
            {leadEntry.map((item, index) => {
              return (
                <FormControlLabel
                  key={`check${index}`}
                  control={
                    <StyledCheckbox
                      checked={item.value}
                      name={`${item.name}`}
                      onChange={(e) => handleChange(e, item.name, "lead")}
                    />
                  }
                  label={`${item.label}`}
                />
              );
            })}
          </Box>
        </Box>
        <Box className="staffprofile-viewpermission box3">
          <Box className="staffprofile-dashboard">Dashboard</Box>
          <Box className="staffprofile-dashboarddata">
            {dashboardEntry.map((item, index) => {
              return (
                <FormControlLabel
                  key={`check${index}`}
                  control={
                    <StyledCheckbox
                      checked={item.value}
                      name={`${item.name}`}
                      onChange={(e) => handleChange(e, item.name, "dashboard")}
                    />
                  }
                  label={`${item.label}`}
                />
              );
            })}
          </Box>
        </Box>
        <Box className="staffprofile-viewpermission-box4"></Box>
      </Box>
    </Box>
  );
};
export default StaffHandlePermission;
