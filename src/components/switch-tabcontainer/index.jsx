// import { Box } from "@mui/material";
// import { Outlet, useLocation, useNavigate } from "react-router-dom";

// const navTitle = [
//   {
//     id: 1,
//     title: "Profile",
//     url: "/staffenrollment/staffaddprofile",
//   },
//   {
//     id: 2,
//     title: "Permissions",
//     url: "/staffenrollment/staffpermissions",
//   },
// ];
// const SwitchNavTabs = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   return (
//     <Box className="switchtab-container flex-colcenter">
//       <Box className="switchtab-navigatebar">
//         {navTitle.map((item) => {
//           return (
//             <Box
//               key={item.id}
//               className={`switchtab-items flex-box ${
//                 item.url === location.pathname && "switchtab-activeitem"
//               }`}
//               onClick={() => navigate(`${item.url}`)}
//             >
//               {item.title}{" "}
//             </Box>
//           );
//         })}
//       </Box>
//       <Box className="switchtab-formbox flex-box">
//         <Outlet />
//       </Box>
//     </Box>
//   );
// };
// export default SwitchNavTabs;

import { Box } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const navTitle = [
  {
    id: 1,
    title: "Profile",
    url: "/staffenrollment/staffaddprofile",
  },
  {
    id: 2,
    title: "Permissions",
    url: "/staffenrollment/staffpermissions",
  },
];
const SwitchNavTabs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <Box className="switchtab-container flex-colcenter">
      <Box className="switchtab-navigatebar">
        {navTitle.map((item) => {
          return (
            <Box
              key={item.id}
              className={`switchtab-items flex-box `}
              onClick={() => navigate(`${item.url}`)}
            >
              {item.title}{" "}
              <Box className={`hideswitch-tab ${
                item.url === location.pathname && "active-switchtab"
              }`}></Box>
            </Box>
          );
        })}
      </Box>
      <Box className="switchtab-formbox flex-box">
        <Outlet />
      </Box>
    </Box>
  );
};
export default SwitchNavTabs;

