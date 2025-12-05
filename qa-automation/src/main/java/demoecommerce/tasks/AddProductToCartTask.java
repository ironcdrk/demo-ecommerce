package demoecommerce.tasks;

import demoecommerce.pages.HomePage;
import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;
import net.serenitybdd.screenplay.actions.Click;
import net.serenitybdd.screenplay.waits.WaitUntil;
import static net.serenitybdd.screenplay.matchers.WebElementStateMatchers.isClickable;
import net.serenitybdd.screenplay.actions.Switch;

public class AddProductToCartTask implements Task {

    private final String productName;

    public AddProductToCartTask(String productName) {
        this.productName = productName;
    }

    public static AddProductToCartTask withName(String productName) {
        return new AddProductToCartTask(productName);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {

        actor.attemptsTo(
            WaitUntil.the(HomePage.BOTON_AGREGAR_DEL_PRODUCTO.of(productName), isClickable())
             .forNoMoreThan(10).seconds(),
            Click.on(HomePage.BOTON_AGREGAR_DEL_PRODUCTO.of(productName)),
            Switch.toAlert().andAccept()
        );
    }
}

