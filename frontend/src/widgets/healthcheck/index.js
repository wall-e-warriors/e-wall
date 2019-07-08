import React, { useState, useEffect } from 'react';

function HealthCheck() {
  const [status, setStatus] = useState("Loading");

  useEffect(() => {
    fetch("/healthcheck").then((response) => {
      response.ok ? setStatus("Success") : setStatus("Error")
    })
  });

  return <div >{status}</div >
}

export default HealthCheck