package demoecommerce.pages;

import net.serenitybdd.screenplay.targets.Target;

public class PurchaseConfirmationModal {
     public static final Target CONFIRMATION_MESSAGE = Target.the("mensaje de confirmación")
        .locatedBy("//h2[contains(normalize-space(),'{0}')]");

     public static final Target OK_BUTTON = Target.the("botón OK de la modal de confirmación")
        .locatedBy("//div[contains(@class,'modal-content')]//button[contains(@class,'modal-button') and normalize-space()='OK']");

}
