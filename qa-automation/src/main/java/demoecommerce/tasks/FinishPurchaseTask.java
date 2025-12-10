package demoecommerce.tasks;

import net.serenitybdd.annotations.Step;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.waits.WaitUntil;
import demoecommerce.pages.PurchaseOrderFormPage;

import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class FinishPurchaseTask implements Task {
    public static FinishPurchaseTask confirm() {
        return new FinishPurchaseTask();
    }

    @Override
    @Step("{0} finaliza la compra")
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                //WaitUntil.the(PurchaseOrderFormPage.PURCHASE_BUTTON, isVisible()).forNoMoreThan(10).seconds(),
                Click.on(PurchaseOrderFormPage.PURCHASE_BUTTON)
        );
    }
}
