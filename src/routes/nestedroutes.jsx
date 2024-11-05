import PageNotFound from "container/page-notfound";
import StaffEnrollment from "container/staff-enrollment";
import StaffAddProfile from "container/staff-enrollment/addprofile";
import StaffHandlePermission from "container/staff-enrollment/staffpermission";
import { Route, Routes } from "react-router-dom";
import SwitchNavTabs from "../components/switch-tabcontainer";

const StaffList = () => {
  return (
    <Routes>
      <Route index element={<StaffEnrollment />} />
      <Route element={<SwitchNavTabs />}>
        <Route path="staffaddprofile" element={<StaffAddProfile />} />
        <Route path="staffpermissions" element={<StaffHandlePermission />} />
        <Route path="*" element={<PageNotFound />} />
      </Route>
    </Routes>
  );
};
export default StaffList;
