package demoecommerce.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.Tasks;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.waits.WaitUntil;
import demoecommerce.pages.HomePage;
import demoecommerce.pages.LoginPage;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isClickable;

public class GoToLoginPage implements Task {

    public static GoToLoginPage fromHome() {
        return Tasks.instrumented(GoToLoginPage.class);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
                WaitUntil.the(HomePage.LOGIN_BUTTON, isClickable()).forNoMoreThan(10).seconds(),
                Click.on(HomePage.LOGIN_BUTTON),
                WaitUntil.the(LoginPage.USER_FIELD, isVisible()).forNoMoreThan(10).seconds()
        );
    }
}
