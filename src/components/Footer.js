import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-black text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} instant weather. all rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
