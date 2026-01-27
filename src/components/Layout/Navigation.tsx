'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../../hooks/useAuth';

export const Navigation: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut, isAdmin } = useAuth();
  
  const isHomePage = pathname === '/';

  // Get the correct dashboard path based on user role
  const dashboardPath = isAdmin ? '/admin' : '/dashboard';
  const dashboardLabel = isAdmin ? 'Admin Dashboard' : 'Dashboard';

  // Handle sign out
  const handleSignOut = async () => {
    console.log('handleSignOut called');
    try {
      await signOut();
      console.log('signOut completed, navigating to /');
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error during sign out:', error);
      // Navigate anyway
      router.push('/');
      router.refresh();
    }
  };

  // Handle scrolling to hash on page load or hash change
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [pathname]);

  // Handle navigation link clicks
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHashLink = href.startsWith('/#');
    
    if (isHashLink) {
      e.preventDefault();
      const hash = href.substring(1); // Remove the leading /
      
      // If we're already on home page, just scroll
      if (pathname === '/') {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        // Navigate to home page with hash
        router.push('/' + hash);
      }
    }
    
    setMobileMenuOpen(false);
  };

  const coreServices = [
    { label: 'AI Governance & Compliance', href: '/services/governance' },
    { 
      label: 'Global Expansion & Immigration', 
      href: '/services/immigration',
      submenu: [
        { label: 'Work Visas', href: '/services/immigration/work-visas' },
        { label: 'EB-1 & EB-2 Green Cards', href: '/services/immigration/eb1-extraordinary-ability' },
        { label: 'EB-5 Investor Visa', href: '/services/immigration/eb5' },
      ]
    },
    { label: 'M&A & Corporate Transactions', href: '/services/ma' },
  ];

  const selectServices = [
    { label: 'Contract Review & Drafting', href: '/services/contracts' },
    { label: 'Data Privacy Compliance', href: '/services/data-privacy' },
    { label: 'IP Strategy & Protection', href: '/services/ip-strategy' },
    { label: 'Corporate Fraud Investigation', href: '/services/fraud-investigation' },
    { label: 'Employment Law Counsel', href: '/services/employment' },
    { label: 'Fundraising & Securities', href: '/services/fundraising' },
  ];

  return (
    <nav className={`nav ${isHomePage ? '' : 'nav-no-emergency'}`}>
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          <Image 
            src="/logo.png" 
            alt="Rivalis Law" 
            width={160} 
            height={40}
            priority
            style={{ height: 'auto' }}
          />
        </Link>
        
        {/* Desktop Menu */}
        <ul className="nav-menu">
          {/* Our 3 Specialties Dropdown */}
          <li className="nav-dropdown">
            <a href="/#services" className="nav-link" onClick={(e) => handleNavClick(e, '/#services')}>
              Our 3 Specialties
              <i className="fas fa-chevron-down" style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}></i>
            </a>
            <div className="nav-dropdown-menu">
              {coreServices.map((service) => (
                <div key={service.href}>
                  <Link href={service.href} className="nav-dropdown-item">
                    {service.label}
                    {service.submenu && <i className="fas fa-chevron-right" style={{ marginLeft: 'auto', fontSize: '0.75rem' }}></i>}
                  </Link>
                  {service.submenu && (
                    <div className="nav-submenu">
                      {service.submenu.map((subitem) => (
                        <Link key={subitem.href} href={subitem.href} className="nav-submenu-item">
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </li>

          {/* Select Services Dropdown */}
          <li className="nav-dropdown">
            <a href="/#select-services" className="nav-link" onClick={(e) => handleNavClick(e, '/#select-services')}>
              Select Services
              <i className="fas fa-chevron-down" style={{ marginLeft: '0.5rem', fontSize: '0.75rem' }}></i>
            </a>
            <div className="nav-dropdown-menu">
              {selectServices.map((service) => (
                <Link key={service.href} href={service.href} className="nav-dropdown-item">
                  {service.label}
                </Link>
              ))}
            </div>
          </li>

          {/* Intelligence Hub */}
          <li>
            <Link href="/intelligence-hub" className="nav-link">
              Intelligence Hub
            </Link>
          </li>

          {/* Join the Firm */}
          <li>
            <Link href="/join-firm" className="nav-link">
              Join the Firm
            </Link>
          </li>

          <li>
            <a href="/#qualify" className="nav-cta" onClick={(e) => handleNavClick(e, '/#qualify')}>
              Get Started
            </a>
          </li>
          {user ? (
            <li className="nav-dropdown nav-user-dropdown">
              <button className="nav-user-btn">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" clipRule="evenodd" />
                </svg>
              </button>
              <div className="nav-dropdown-menu nav-user-menu">
                <Link href={dashboardPath} className="nav-dropdown-item">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
                  {dashboardLabel}
                </Link>
                <button onClick={handleSignOut} className="nav-dropdown-item nav-signout-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                    <path fillRule="evenodd" d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </li>
          ) : (
            <li>
              <Link href="/login" className="nav-login-btn">
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="nav-mobile-menu">
          
          <div className="nav-mobile-section">
            <div className="nav-mobile-section-title">Our 3 Specialties</div>
            {coreServices.map((service) => (
              <div key={service.href}>
                <Link 
                  href={service.href} 
                  className="nav-mobile-link nested"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {service.label}
                </Link>
                {service.submenu && service.submenu.map((subitem) => (
                  <Link 
                    key={subitem.href} 
                    href={subitem.href} 
                    className="nav-mobile-link nested"
                    style={{ paddingLeft: '2rem', fontSize: '0.9rem' }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {subitem.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>

          <div className="nav-mobile-section">
            <div className="nav-mobile-section-title">Select Services</div>
            {selectServices.map((service) => (
              <Link 
                key={service.href} 
                href={service.href} 
                className="nav-mobile-link nested"
                onClick={() => setMobileMenuOpen(false)}
              >
                {service.label}
              </Link>
            ))}
          </div>

          <Link 
            href="/intelligence-hub" 
            className="nav-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Intelligence Hub
          </Link>

          <Link 
            href="/join-firm" 
            className="nav-mobile-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            Join the Firm
          </Link>
          
          <a 
            href="/#qualify" 
            className="nav-mobile-cta" 
            onClick={(e) => handleNavClick(e, '/#qualify')}
          >
            Get Started
          </a>
          
          {user ? (
            <>
              <Link 
                href={dashboardPath} 
                className="nav-mobile-link"
                onClick={() => setMobileMenuOpen(false)}
              >
                {dashboardLabel}
              </Link>
              <button 
                onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} 
                className="nav-mobile-signout"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              className="nav-mobile-login"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
