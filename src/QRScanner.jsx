import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

function QRScanner({ updateLoc }) {
  const [data, setData] = useState('No result');
  const [constraints, setConstrains] = useState({

  facingMode: "environment",
});




  
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
      
    </>
  );
}

export default QRScanner;
