package demoecommerce.pages;

import net.serenitybdd.screenplay.targets.Target;

public class CartPage {
    /*public static final Target CHECKOUT_BUTTON = Target.the("Proceed to checkout button")
        .locatedBy(".cart-summary__checkout-btn");*/

    public static final Target CART_TITLE = Target.the("título Shopping Cart")
            .locatedBy("//h1[contains(normalize-space(), 'Shopping Cart')]");

    public static final Target CHECKOUT_BUTTON = Target.the("botón proceed to checkout")
            .locatedBy("//button[contains(normalize-space(), 'PROCEED TO CHECKOUT')]");

    public static final Target PRODUCT_NAMES = Target.the("nombres de productos del carrito")
            .locatedBy("//table//tbody//tr/td[2]");

    public static final Target TOTAL_AMOUNT = Target.the("monto total del carrito")
        .locatedBy("//div[contains(@class,'cart-summary__totals-row--total')]/span[2]");
}