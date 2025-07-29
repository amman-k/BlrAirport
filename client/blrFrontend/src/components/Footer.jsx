import React from 'react';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-700 mt-auto">
      <div className="container mx-auto px-4 md:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-slate-400 text-sm mb-4 md:mb-0">
            &copy; {year} BLR Airport Dashboard. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-slate-400 hover:text-sky-400 transition-colors">
              <FiGithub size={20} />
            </a>
            <a href="#" className="text-slate-400 hover:text-sky-400 transition-colors">
              <FiLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
