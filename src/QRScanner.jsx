import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

function QRScanner({ updateLoc }) {
  const [data, setData] = useState('No result');
  const [facingMode, setFacingMode] = useState({ exact: "environment" });

  useEffect(() => {
    // Check if rear camera is available
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const rearCamera = devices.find(device => device.kind === 'videoinput' && device.label.includes('rear'));
        if (rearCamera) {
          setFacingMode({ exact: "environment" }); // Set to rear camera
        }
      })
      .catch(error => {
        console.error('Error enumerating devices:', error);
      });
  }, []);

  const toggleCameraFacingMode = () => {
    setFacingMode(prevMode => prevMode.exact === "environment" ? { exact: "user" } : { exact: "environment" });
  };

  return (
    <>
      <QrReader
        facingMode={facingMode}
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
