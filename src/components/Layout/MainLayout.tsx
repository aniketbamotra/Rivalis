import React from 'react';
import { Navigation } from './Navigation';
import EnhancedFooter from './EnhancedFooter';

interface MainLayoutProps {
  children: React.ReactNode;
  showNav?: boolean;
  showFooter?: boolean;
  navProps?: any;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  showNav = true,
  showFooter = true,
  navProps = {},
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {showNav && <Navigation {...navProps} />}
      
      <main className="flex-grow">
        {children}
      </main>
      
      {showFooter && <EnhancedFooter />}
    </div>
  );
};

