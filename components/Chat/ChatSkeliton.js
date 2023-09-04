import React from "react";
import { Skeleton } from "@mui/material";

const ChatSkeleton = () => {
  const skeletonMessages = Array.from({ length: 5 }, (_, index) => (
    <div key={index} style={{ marginBottom: "16px" }}>
      {/* Sender's chat bubble skeleton */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{ maxWidth: "70%" }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={60}
            style={{ backgroundColor: "white", color: "black" }}
          />
        </div>
      </div>

      {/* Receiver's chat bubble skeleton */}
      <div style={{ display: "flex" }}>
        <div style={{ maxWidth: "70%" }}>
          <Skeleton
            variant="rectangular"
            width="100%"
            height={60}
            style={{ backgroundColor: "white", color: "black" }}
          />
        </div>
      </div>
    </div>
  ));

  return <div>{skeletonMessages}</div>;
};

export default ChatSkeleton;
