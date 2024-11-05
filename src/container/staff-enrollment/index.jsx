import { Box, InputAdornment } from "@mui/material";
import plusicon from "assets/images/icons/plus.png";
import search from "assets/images/icons/searchicon.png";
import { useState } from "react";
import CustomResizeButton from "styles/scss/utils/resizeformbutton";
import MuiPaginationComponent from "components/pagination";
import MuiTableComponent from "components/staff-table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { staffenrollTableData } from "../../redux/service/staffenrollment-service";
import StyledSearchField from "../../styles/scss/utils/searchfieldstyle";

const StaffEnrollment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pageLimit = 10;
  const totalPageCount = useSelector(
    (state) => state.staffenrollmentAccess.pageCount
  );
  const totalCount = useSelector(
    (state) => state.staffenrollmentAccess.totalDataCount
  );
  const data = useSelector((state) => state.staffenrollmentAccess.tableData);
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(staffenrollTableData({ page, pageLimit }));
  }, [page,dispatch]);

  return (
    <Box className="staff-enroll-container flex-colcenter">
      <Box className="staff-enroll-searchfieldArea flex-boxend">
        <Box>
          <StyledSearchField
            variant="outlined"
            id="input-with-icon-textfield"
            placeholder="Enter a keyword"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    src={search}
                    alt="search"
                    className="staff-enroll-searchicon"
                  />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box>
          <CustomResizeButton
            width="215px"
            height="42px"
            fontSize="16px"
            onClick={() => navigate(`/staffenrollment/staffaddprofile`)}
          >
            <img src={plusicon} className="login-plus-logoicon" alt="logo-icon" />
            Add Employee
          </CustomResizeButton>
        </Box>
      </Box>
      <Box className="staff-enroll-tableArea">
        <MuiTableComponent data={data} />
      </Box>

      <Box className="staff-enroll-paginationArea flex-spcbtn">
        <Box>
          Showing {page === 1 ? page : 1 + pageLimit * (page - 1)} to{" "}
          {page === 1 ? pageLimit : pageLimit * page} Of {totalCount} entries
        </Box>{" "}
        <MuiPaginationComponent
          page={page}
          count={totalPageCount}
          setPage={setPage}
        />
      </Box>
    </Box>
  );
};
export default StaffEnrollment;
