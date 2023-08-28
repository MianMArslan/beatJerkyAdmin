// import * as React from "react";
// import Backdrop from "@mui/material/Backdrop";
// import CircularProgress from "@mui/material/CircularProgress";
// import Button from "@mui/material/Button";
// import { useContext } from "react";
// import { AppContext } from "../context/appContext";

// export default function SimpleBackdrop() {
//   const { isLoading, setIsLoading } = useContext(AppContext);

//   return (
//     <div>
//       <Backdrop
//         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={isLoading}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//     </div>
//   );
// }

import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import { useContext } from "react";
import { AppContext } from "../context/appContext";

// Import your logo image
// import logo from "/logo.png"; // Update the path accordingly

export default function SimpleBackdrop() {
  const { isLoading, setIsLoading } = useContext(AppContext);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        {/* Use the logo image and apply CSS animations */}
        <img
          width={150}
          src={"/logo.png"}
          alt="Logo"
          style={{
            animation: isLoading ? "pulse 1.5s infinite" : "none",
          }}
        />
        {/* Define the CSS animation */}
        <style>
          {`
            @keyframes pulse {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.1);
              }
              100% {
                transform: scale(1);
              }
            }
          `}
        </style>
      </Backdrop>
    </div>
  );
}
