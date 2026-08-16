package demoecommerce.tasks;

import net.serenitybdd.annotations.Step;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.waits.WaitUntil;
import demoecommerce.pages.CartPage;
import demoecommerce.pages.HomePage;

import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class GoToCartPageTask implements Task {
    public static GoToCartPageTask openCart() {
        return new GoToCartPageTask();
    }

    @Override
    @Step("{0} visualiza el contenido del carrito")
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                Click.on(HomePage.CART_BUTTON),
                WaitUntil.the(CartPage.CART_TITLE, isVisible())
                        .forNoMoreThan(10).seconds()
        );
    }
}
