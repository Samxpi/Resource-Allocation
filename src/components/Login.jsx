import React from "react";
import Cards from "./Cards";
import wall_post from "../assets/undraw_wall_post_re_y78d.svg"
import computer from "../assets/undraw_progressive_app_m-9-ms.svg"  

const Login = () => {
  return (
    <div className="grid grid-cols-2 justify-items-center">
      <Cards name="Seminar Hall" loc={wall_post} />
      <Cards name="Multipurpose Hall" loc={wall_post} />
      <Cards name="Central Computing Facility" loc={computer} />
    </div>
  );
};

export default Login;
