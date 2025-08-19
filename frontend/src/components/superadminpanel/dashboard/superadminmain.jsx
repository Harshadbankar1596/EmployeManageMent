import React from "react";
import { Outlet } from "react-router-dom";
import Superadminactions from "../superadminactions";

const Superadminmain = () => {
  return (
    <div className="p-4">

      <div className="lg:hidden">
      <Superadminactions/>
      </div>

      <Outlet />
    </div>
  );
};

export default Superadminmain;
