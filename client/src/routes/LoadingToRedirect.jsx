import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => {
        if (currentCount === 1) {
          clearInterval(interval);
          setRedirect(true);
        }
        return currentCount - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">🚫 Access Denied</h2>
        <p className="text-lg text-gray-700 mb-2">
          You don’t have permission to view this page.
        </p>
        <p className="text-sm text-gray-500">
          Redirecting to the homepage in <span className="font-bold">{count}</span>{' '}
          second{count !== 1 ? 's' : ''}... ⏳
        </p>
      </div>
    </div>
  );
};

export default LoadingToRedirect;
