import React from "react";
import { Link } from "react-router-dom";

const Card = ({ to, children, className = "", ...props }) => {
  // Si `to` est défini, on utilise un Link, sinon juste un div
  const Wrapper = to ? Link : "div";
  const wrapperProps = to ? { to, style: { textDecoration: "none" } } : {};

  return (
    <Wrapper className={`card ${className}`} {...wrapperProps} {...props}>
      {children}
    </Wrapper>
  );
};

export default Card;
