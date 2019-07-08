import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

function HealthCheck() {
  const [status, setStatus] = useState('Loading');

  useEffect(() => {
    fetch('/healthcheck').then(response => {
      response.ok ? setStatus('Success') : setStatus('Error');
    });
  }, []);
  return (
    <Card>
      <CardContent>{status}</CardContent>
    </Card>
  );
}

export default HealthCheck;
