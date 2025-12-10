package demoecommerce.questions;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Question;
import net.serenitybdd.screenplay.questions.Text;

import static demoecommerce.pages.PurchaseConfirmationModal.CONFIRMATION_MESSAGE;

public class ConfirmationMessage implements Question<String> {

    private final String expected;

    public ConfirmationMessage(String expected) {
        this.expected = expected;
    }

    public static ConfirmationMessage is(String expected) {
        return new ConfirmationMessage(expected);
    }

    @Override
    public String answeredBy(Actor actor) {
        return Text.of(CONFIRMATION_MESSAGE.of(expected)).answeredBy(actor).trim();
    }
}
