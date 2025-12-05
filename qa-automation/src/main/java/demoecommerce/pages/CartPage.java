package demoecommerce.pages;

import net.serenitybdd.screenplay.targets.Target;

public class CartPage {
    public static final Target PLACE_ORDER_BUTTON = Target.the("BOTON CHECKOUT")
            .locatedBy("//button[contains(text(),'PROCEED TO CHECKOUT')]");
}
