export default function Header() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <div className="site-header__logo">Mini DemoEcommerce</div>

        <nav className="site-header__nav">
          <button className="site-header__icon-btn">Cuenta</button>
          <button className="site-header__icon-btn">Carrito (0)</button>
        </nav>
      </div>
    </header>
  );
}