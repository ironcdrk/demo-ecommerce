package demoecommerce.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.waits.WaitUntil;
import demoecommerce.pages.HomePage;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

public class ValidateSuccessfulLoginTask implements Task {

    public static ValidateSuccessfulLoginTask onHomePage() {
        return new ValidateSuccessfulLoginTask();
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                WaitUntil.the(HomePage.CART_BUTTON, isVisible()).forNoMoreThan(15).seconds()
        );
    }
}