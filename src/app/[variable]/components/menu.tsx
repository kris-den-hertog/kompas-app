import { themeParks } from '@/components/themeparks';
import React, { useState, useRef, useEffect } from 'react';

interface menuItems {
    parkId: string;
}

const FoldMenu = ({ parkId }: menuItems) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuHeight, setMenuHeight] = useState(0);
  const menuContentRef = useRef<HTMLDivElement>(null);

   const park = themeParks.find(park => park.id === parkId);
      const ticketLink = park?.parkTicket;

  useEffect(() => {
    if (menuContentRef.current) {
      setMenuHeight(menuContentRef.current.scrollHeight);
    }
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { 
      label: 'Openingstijden (BETA)', 
      href: `/${parkId}/openingstijden`,
      icon: '🕰️'
    },
    { 
      label: 'Parkeren', 
      href: `/${parkId}/parkeren`,
      icon: '🚗'
    },
    { 
      label: 'Koop tickets', 
      href: `${ticketLink}`,
      icon: '🎟️'
    },
     { 
      label: 'Terug', 
      href: `./`,
      icon: '🚪'
    },

  ];

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className={`
          relative w-12 h-12 bg-copper text-white rounded-lg 
          flex flex-col items-center justify-center space-y-1
          transition-all duration-300 ease-in-out
          hover:bg-main-600 focus:outline-none focus:ring-2 focus:ring-main-300
          ${isOpen ? 'bg-main-600' : ''}
        `}
        aria-label="Menu"
        aria-expanded={isOpen}
      >
        <span 
          className={`
            block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out
            ${isOpen ? 'rotate-45 translate-y-1.5' : ''}
          `}
        />
        <span 
          className={`
            block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-0' : ''}
          `}
        />
        <span 
          className={`
            block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out
            ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}
          `}
        />
      </button>

      {/* Menu Dropdown */}
      <div
        className={`
          absolute right-0 top-14 bg-white rounded-lg shadow-lg border border-gray-200
          overflow-hidden transition-all duration-300 ease-in-out z-50
          ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'}
        `}
        style={{
          height: isOpen ? `${menuHeight}px` : '0px',
          minWidth: '200px'
        }}
      >
        <div ref={menuContentRef} className="py-2">
          {menuItems.map((item, index) => (
            <a
              key={item.label}
              href={item.href}
              className={`
                flex items-center px-4 py-3 text-gray-700 hover:bg-main-50 hover:text-main-600
                transition-all duration-200 ease-in-out
                ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}
              `}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : '0ms'
              }}
              onClick={() => setIsOpen(false)}
            >
              <span className="text-lg mr-3" role="img" aria-hidden="true">
                {item.icon}
              </span>
              <span className="font-medium">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-all"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default FoldMenu;