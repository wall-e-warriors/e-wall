import React, { Fragment, useContext } from 'react';
import { AuthStatus, SessionContext } from './auth/AuthProvider';
import Dashboard from './Dashboard';

function accessDenied() {
  return (
    <div className="content">
      <h1>Access denied.</h1>
      <p>
        You are not authorized to access this page. Please <a href="/">login</a>
      </p>
    </div>
  );
}

export default function DashboardContainer() {
  const { authStatus, isAuthenticated } = useContext(SessionContext);
  if (authStatus !== AuthStatus.CHECKING) {
    return isAuthenticated() ? <Dashboard /> : accessDenied();
  } else {
    return <Fragment />;
  }
}
