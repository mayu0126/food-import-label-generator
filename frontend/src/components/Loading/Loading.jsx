import React from 'react';

const Loading = () => {
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-slate-100 bg-opacity-50 z-50"
    >
      <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-rose-500 border-opacity-70"></div>
    </div>
  );
};

export default Loading;