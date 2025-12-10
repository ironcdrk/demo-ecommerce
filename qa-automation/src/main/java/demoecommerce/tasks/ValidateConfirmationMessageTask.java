package demoecommerce.tasks;

import net.serenitybdd.annotations.Step;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.waits.WaitUntil;
import demoecommerce.pages.PurchaseConfirmationModal;
import demoecommerce.questions.ConfirmationMessage;
import static net.serenitybdd.screenplay.GivenWhenThen.seeThat;
import static org.hamcrest.Matchers.containsString;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isVisible;

import static demoecommerce.pages.PurchaseConfirmationModal.CONFIRMATION_MESSAGE;

public class ValidateConfirmationMessageTask implements Task {

    private final String expectedMessage;

    public ValidateConfirmationMessageTask(String expectedMessage) {
        this.expectedMessage = expectedMessage;
    }

    public static ValidateConfirmationMessageTask withText(String expectedMessage) {
        return new ValidateConfirmationMessageTask(expectedMessage);
    }

    @Override
    @Step("{0} valida el mensaje final de compra")
    public <T extends Actor> void performAs(T actor) {
        actor.attemptsTo(
            WaitUntil.the(CONFIRMATION_MESSAGE.of(expectedMessage), isVisible())
                    .forNoMoreThan(10).seconds()
        );
        actor.should(
        seeThat(ConfirmationMessage.is(expectedMessage),
                containsString(expectedMessage))
        );
        actor.attemptsTo(
                Click.on(PurchaseConfirmationModal.OK_BUTTON)
        );
    }
}
