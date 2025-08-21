import {React , useState , useEffect} from "react";
import { Outlet } from "react-router-dom";
import Superadminactions from "../superadminactions";
import { useSelector } from "react-redux";
import { useVeryfyissuperadminMutation } from "../../../redux/superadminslice";
import { useNavigate } from "react-router-dom";
const Superadminmain = () => {
  const Navigate = useNavigate();
  const [verify, { isLoading, isError }] = useVeryfyissuperadminMutation();
  const id = useSelector((state) => state.user.id);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    verify(id).unwrap().then((v) => {
      setIsSuperAdmin(v.message);
      // console.log(v.message);
    });
  }, [id, verify]);

  if (isSuperAdmin === "superadmin") {
    return (
      <div className="p-4">

        <div className="lg:hidden">
          <Superadminactions />
        </div>
        <Outlet />
      </div>
    );
  } 
}
export default Superadminmain;