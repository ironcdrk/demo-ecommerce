package demoecommerce.stepdefinitions;

import io.cucumber.datatable.DataTable;
import io.cucumber.java.Before;
import io.cucumber.java.en.And;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.When;
import io.cucumber.java.en.Then;
import net.serenitybdd.screenplay.actors.OnStage;
import net.serenitybdd.screenplay.actors.OnlineCast;
import demoecommerce.tasks.*;

import java.util.List;
import java.util.Map;

import static net.serenitybdd.screenplay.actors.OnStage.theActorCalled;

public class PurchaseStepDef {

    @Before
    public void setUp() {
        OnStage.setTheStage(new OnlineCast());
    }

    @Given("el usuario accede al sitio DemoEcommerce")
    public void elUsuarioAccedeAlSitioDemoEcommerce() {
        OnStage.setTheStage(new OnlineCast());
        theActorCalled("Invitado").attemptsTo(
                NavigateTo.DemoEcommerce()
        );
    }

    @When("agrega los siguientes productos al carrito")
    public void agregaProductosAlCarrito(List<Map<String, String>> productos) {
        OnStage.theActorInTheSpotlight().attemptsTo(
                AddListProductsToCartTask.fromList(productos)
        );
    }

    @And("visualiza el contenido del carrito")
    public void visualizaContenidoDelCarrito() {
        OnStage.theActorInTheSpotlight().attemptsTo(
                ViewCartTask.openCart()
        );
    }

    @Then("completa el formulario de compra con:")
    public void completeFormWith(DataTable table) {

        Map<String, String> data = table.asMaps(String.class, String.class).get(0);

        OnStage.theActorInTheSpotlight().attemptsTo(
                FillOrderFormTask.withData(
                        data.get("name"),
                        data.get("country"),
                        data.get("city"),
                        data.get("card"),
                        data.get("month"),
                        data.get("year")
                )
        );
    }
}
