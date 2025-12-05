package demoecommerce.pages;

import net.serenitybdd.screenplay.targets.Target;

public class HomePage {

     public static final Target BOTON_AGREGAR_DEL_PRODUCTO = Target.the("botón agregar del producto")
            .locatedBy("//h3[contains(., '{0}')]/ancestor::article//button");

    public static final Target CART_BUTTON = Target.the("BOTÓN DEL CARRITO DE COMPRAS")
            .locatedBy("//a[@href='/cart']");
}
