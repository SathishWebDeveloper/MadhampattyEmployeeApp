import Paper from "@mui/material/Paper";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { alpha, styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Loader from "components/Loader";
import * as React from "react";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  pinkSwitch: {
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: " #8A3A93",
      "&:hover": {
        backgroundColor: alpha("#8A3A93"),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#8A3A93",
    },
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#953893",
    color: theme.palette.common.white,
    height: "62px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&": {
    height: "56px",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ColumnData = [
  {
    title: "Name",
    alignPosition: "center",
  },
  {
    title: "Email",
    alignPosition: "left",
  },
  {
    title: "Role",
    alignPosition: "left",
  },
  {
    title: "Last Login",
    alignPosition: "left",
  },
  {
    title: "Action",
    alignPosition: "left",
  },
  {
    title: "Active",
    alignPosition: "left",
  },
];

const MuiTableComponent = ({ data }) => {
  const classes = useStyles();
  const loading = useSelector((state) => state.staffenrollmentAccess.loading);
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <TableContainer component={Paper} sx={{ maxHeight: 628 }}>
      {loading && <Loader />}
      <Table sx={{ minWidth: 700 }} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {ColumnData?.map((item, index) => {
              return (
                <StyledTableCell align={item.alignPosition} key={`id:${index}`}>
                  {item.title}
                </StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center" component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="left">
                {row.id * 3}@gmail.com
              </StyledTableCell>
              <StyledTableCell align="left">Lead Manager</StyledTableCell>
              <StyledTableCell align="left">
                {row.id * 2} minutes ago
              </StyledTableCell>
              <StyledTableCell align="left">view | edit</StyledTableCell>
              <StyledTableCell align="left">
                <Switch
                  className={classes.pinkSwitch}
                  checked={checked}
                  onChange={handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      {/* } */}
    </TableContainer>
  );
};
export default MuiTableComponent;
