import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__logo">Mini DemoEcommerce</div>

        <nav className="site-header__nav">
          {/*<button className="site-header__icon-btn">Home</button>*/}
          <Link to="/" className="site-header__icon-btn">
            Home
          </Link>
          <Link to="/categories" className="site-header__icon-btn">
            Categories
          </Link>
          {/*<button className="site-header__icon-btn">Carrito (0)</button>*/}
          <Link to="/cart" className="site-header__icon-btn">
            Carrito (0)
          </Link>
        </nav>
      </div>
    </header>
  );
}