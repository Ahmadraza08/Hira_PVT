import React from 'react';
import Loader from './loader';

const LoadingWrapper = ({ isLoading, children }) => {
  return (
    <>
      {isLoading && <Loader />}
      <div style={{ visibility: isLoading ? 'hidden' : 'visible' }}>
        {children}
      </div>
    </>
  );
};

export default LoadingWrapper;
