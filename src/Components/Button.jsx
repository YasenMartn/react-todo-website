import React from "react";

const Button = (props) => {
  return(
    <button className={`${props.bg} px-5 py-2 rounded-md text-base font-medium`} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
