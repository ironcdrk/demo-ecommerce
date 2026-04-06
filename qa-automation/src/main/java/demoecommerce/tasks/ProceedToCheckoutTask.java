package demoecommerce.tasks;

import demoecommerce.pages.CartPage;
import net.serenitybdd.annotations.Step;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.waits.WaitUntil;

import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class ProceedToCheckoutTask implements Task {

    public static ProceedToCheckoutTask now() {
        return new ProceedToCheckoutTask();
    }

    @Override
    @Step("{0} procede al checkout")
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                WaitUntil.the(CartPage.CHECKOUT_BUTTON, isVisible())
                        .forNoMoreThan(10).seconds(),
                Click.on(CartPage.CHECKOUT_BUTTON)
        );
    }
}