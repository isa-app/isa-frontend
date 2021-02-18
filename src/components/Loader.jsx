import { default as ReactLoader } from "react-loader-spinner";

import React from "react";

function Loader() {
  return (
    <ReactLoader
      type="MutatingDots"
      color="#276678"
      secondaryColor="#1687a7"
      height={100}
      width={100}
    />
  );
}

export default Loader;
