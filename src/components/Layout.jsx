import React from 'react';
import Header from './Header';
import SecondaryHeader from './SecondaryHeader';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <SecondaryHeader />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
