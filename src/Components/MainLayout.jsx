import React from 'react';
import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <div className="px-3 mt-3">
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
