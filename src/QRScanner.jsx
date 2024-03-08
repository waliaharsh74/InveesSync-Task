import React, { useState } from "react";
import {QrReader} from "react-qr-reader";
// import {QrReader} from 'react-qr-scanner'

function QRScanner({ updateLoc }) {
const [data, setData] = useState('No result');

  return (
    <>
      <QrReader
        onResult={(result, error) => {
          if (result) {
            setData(result?.text);
            updateLoc(result?.text);
          }

          else  {
            console.info(error);
          }
        }}
        
      />
      {/* <p>{data}</p> */}
    </>
  );
}


export default QRScanner;
