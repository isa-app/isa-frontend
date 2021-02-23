import { default as ReactLoader } from "react-loader-spinner";

import React from "react";

function Loader({ type }) {
  return (
    <ReactLoader
      type={type}
      color="#276678"
      secondaryColor="#1687a7"
      height={100}
      width={100}
    />
  );
}

Loader.defaultProps = {
  type: "MutatingDots",
};

export default Loader;
