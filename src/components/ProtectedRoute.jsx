import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';


function ProtectedRoute({token}) {
  const status = useSelector(state => state.APISlice.status);
  console.log(status);

  if(status === 'success')
    console.log('PROTECTED TOKEN: ', token);

  return (
    <div>
      {status === 'success' ? <Outlet /> : <Navigate to="/login" />}
    </div>
  )
}

export default ProtectedRoute
