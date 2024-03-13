import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

function QRScanner({ updateLoc }) {
  const [data, setData] = useState('No result');
  const [constraints, setConstrains] = useState({
  // facingMode: { exact: "environment" },
  facingMode: "environment",
});




  // const toggleCameraFacingMode = () => {
  //   const value=constraints.facingMode.exact
  //   console.log(constraints.facingMode.exact);
  //   if(value==="user"){
  //     setConstrains({facingMode: { exact: "environment" }})
      
  //   }
  //   else{
  //     setConstrains({facingMode: { exact: "user" }})

  //   }
  // };
  const toggleCameraFacingMode = () => {
    const value=constraints.facingMode
    console.log(constraints.facingMode);
    if(value==="user"){
      setConstrains({facingMode: "environment"})
      
    }
    else{
      setConstrains({facingMode: "user"})

    }
  };

  return (
    <>
      <QrReader
        constraints={constraints}
        onResult={(result, error) => {
          if (result) {
            setData(result?.text);
            updateLoc(result?.text);
          } else {
            console.info(error);
          }
        }}
      />
      <button onClick={toggleCameraFacingMode}>Toggle Camera</button>
      {/* <p>{data}</p> */}
    </>
  );
}

export default QRScanner;
