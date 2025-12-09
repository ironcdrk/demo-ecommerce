package demoecommerce.tasks;

import net.serenitybdd.screenplay.Actor;
import net.serenitybdd.screenplay.Task;

import java.util.List;
import java.util.Map;

public class AddListProductsToCartTask implements Task {

    private final List<Map<String, String>> products;

    private AddListProductsToCartTask(List<Map<String, String>> products) {
        this.products = products;
    }
    public static AddListProductsToCartTask fromList(List<Map<String, String>> products) {
        return new AddListProductsToCartTask(products);
    }

    @Override
    public <T extends Actor> void performAs(T actor) {
        for (Map<String, String> product : products) {

            //String categoria = product.get("categoria");
            String nombre = product.get("producto");

            actor.attemptsTo(
                    //SelectCategoryTask.selectCategory(categoria),
                    AddProductToCartTask.withName(nombre)
            );
            
        }
    }
}

