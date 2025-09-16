import "./Layout.scss";

import { useWishlist } from "@features/wishlist/wishlistStore";
import { Link, useLocation } from "react-router";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { getWishlistCount } = useWishlist();
  const wishlistCount = getWishlistCount();

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="app-layout">
      <header className="header">
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/" className="brand-link">
              MH Challenge
            </Link>
          </div>

          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className={`nav-link ${isActiveRoute("/") ? "active" : ""}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/wishlist"
                className={`nav-link ${
                  isActiveRoute("/wishlist") ? "active" : ""
                }`}
              >
                Wishlist
                {wishlistCount > 0 && (
                  <span className="wishlist-badge">{wishlistCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <main className="main-content">{children}</main>
    </div>
  );
}
