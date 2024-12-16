import React from "react";

type ButtonProps = {
  handleClick: () => void;
  text: string;
  disabled: true | false;
};

const Button: React.FC<ButtonProps> = ({ handleClick, text, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={handleClick}
      className="border border-2 rounded px-2 w-max"
    >
      {text}
    </button>
  );
};

export default Button;
