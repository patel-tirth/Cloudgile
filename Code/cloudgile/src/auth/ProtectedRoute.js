import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Backdrop, CircularProgress } from '@material-ui/core'

export const ProtectedRoute = ({ isAuthed, isLoading, ...props }) => {
  const inDebugMode = false;
  if (isLoading) {
    return <Backdrop open={isLoading}>
      <CircularProgress color="inherit" />
    </Backdrop>;
  }

  if (!isAuthed &&!inDebugMode) {
    return <Redirect to='/signIn' />
  }

  return (
    <Route {...props} />
  );
}