import React from "react";
import { Skeleton } from "antd";

const Loading = () => {
  return (
    <div className=" container loader">
      <Skeleton active />
    </div>
  );
};

export default Loading;
