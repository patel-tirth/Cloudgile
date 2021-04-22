import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@material-ui/core'
import { BoxLoading } from 'react-loadingg';

export const ProtectedRoute = ({ isAuthed, isLoading, ...props }) => {
  const inDebugMode = false;
  const inMaintainance = false;
  if (isLoading) {
    return <div><BoxLoading/></div>
  }

  if (inMaintainance) {
    return <div>Maintainence In Progress</div>
  }

  if (!isAuthed &&!inDebugMode) {
    return <Redirect to='/signIn' />
  }

  return (
    <Route {...props} />
  );
}