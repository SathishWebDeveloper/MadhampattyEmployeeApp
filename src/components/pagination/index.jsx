import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  pagination: {
    "& .MuiPaginationItem-root": {
      height: "44px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .MuiPaginationItem-page.Mui-selected": {
      backgroundColor: "#8A3A93",
      color: "white",
    },
  },
}));

const MuiPaginationComponent = ({ count, page, setPage }) => {
  const classes = useStyles();

  const siblingCount = 0;
  const boundaryCount = count > 6 ? 1 : 0;

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <Pagination
      count={count}
      onChange={handleChange}
      page={page}
      siblingCount={siblingCount}
      boundaryCount={boundaryCount}
      variant="outlined"
      shape="rounded"
      className={classes.pagination}
      renderItem={(item) => {
        if (item.type === "previous") {
          return (
            <PaginationItem
              slots={{
                previous: () => (
                  <Typography variant="label">Previous</Typography>
                ),
              }}
              {...item}
            />
          );
        }
        if (item.type === "next") {
          return (
            <PaginationItem
              slots={{
                next: () => (
                  <Typography variant="label" sx={{ padding: "0 12px" }}>
                    Next
                  </Typography>
                ),
              }}
              {...item}
            />
          );
        }
        return <PaginationItem {...item} />;
      }}
    />
  );
};

export default MuiPaginationComponent;
