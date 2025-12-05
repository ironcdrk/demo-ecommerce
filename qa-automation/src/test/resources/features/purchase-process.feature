@ProcesodeCompra
Feature: Flujo de compra en DemoEcommerce
  Como usuario de DemoEcommerce
  Quiero comprar productos exitosamente
  Para completar el proceso de compra sin problemas
  
  Scenario Outline: Compra exitosa de productos en DemoEcommerce
    Given el usuario accede al sitio DemoEcommerce
    When agrega los siguientes productos al carrito
      | categoria | producto              |
      | Laptops   | MacBook Pro 13        |
      | Phones    | Nokia lumia 1520      |

    And visualiza el contenido del carrito
    Then completa el formulario de compra con:
      | name      | country   | city   | card     | month | year |
      | <name>    | <country> | <city> | <card>   | <month>|<year> |

    And finaliza la compra
    Then deberia ver el mensaje de confirmacion "Thank you for your purchase!"

    Examples:
      | name         | country | city  | card         | month | year |
      | Carlos Licto | Ecuador | Quito | 45187843333  | 12    | 2025 |
