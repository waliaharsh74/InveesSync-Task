import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

function QRScanner({ updateLoc }) {
  const [data, setData] = useState('No result');
  const [cameraFacingMode, setCameraFacingMode] = useState('environment');

  useEffect(() => {
    // Check if rear camera is available
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const rearCamera = devices.find(device => device.kind === 'videoinput' && device.label.includes('rear'));
        if (rearCamera) {
          setCameraFacingMode('environment'); // Set to rear camera
        }
      })
      .catch(error => {
        console.error('Error enumerating devices:', error);
      });
  }, []);

  return (
    <>
      <QrReader
        facingMode={cameraFacingMode}
        onResult={(result, error) => {
          if (result) {
            setData(result?.text);
            updateLoc(result?.text);
          } else {
            console.info(error);
          }
        }}
      />
      {/* <p>{data}</p> */}
    </>
  );
}

export default QRScanner;

