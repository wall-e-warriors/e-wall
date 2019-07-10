import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import styles from './Healthcheck.module.css';

const apiStatus = {
  SUCCESS: 'success',
  LOADING: 'loading',
  FAILURE: 'failure'
};

function HealthCheck() {
  const [status, setStatus] = useState(apiStatus.LOADING);

  useEffect(() => {
    fetch('/healthcheck').then(response => {
      response.ok ? setStatus(apiStatus.SUCCESS) : setStatus(apiStatus.FAILURE);
    });
  }, []);
  return (
    <Card>
      <CardContent>
        <h4>Service status</h4>
        {messsageBasedOnStatus(status)}
      </CardContent>
    </Card>
  );
}

function messsageBasedOnStatus(status) {
  switch (status) {
    case apiStatus.SUCCESS:
      return successMessage();
    case apiStatus.FAILURE:
      return errorMessage();
    default:
      return <div>Loading...</div>;
  }
}

function successMessage() {
  return (
    <div className={styles.center}>
      <FontAwesomeIcon size="2x" color="green" icon={faCheckCircle} />
    </div>
  );
}

function errorMessage() {
  return (
    <div className={styles.center}>
      <FontAwesomeIcon size="2x" color="red" icon={faTimesCircle} />
    </div>
  );
}

export default HealthCheck;
