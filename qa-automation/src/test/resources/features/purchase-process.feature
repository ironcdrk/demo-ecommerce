@ProcesodeCompra
Feature: Flujo de compra en DemoEcommerce
  Como usuario de DemoEcommerce
  Quiero comprar productos exitosamente
  Para completar el proceso de compra sin problemas
  
  Scenario Outline: Compra exitosa de productos en DemoEcommerce
    Given el usuario accede al sitio DemoEcommerce
    Then inicia sesion con las siguientes credenciales:
      | email | password  |
      | <email> | <password> |
    When agrega los siguientes productos al carrito
      | categoria | producto              |
      | Laptops   | MacBook Pro 13        |
      | Phones    | Nokia lumia 1520      |

    And visualiza el contenido del carrito
    And procede al checkout
    Then completa el formulario de compra con:
      | name      | country   | city   | card     | month | year |
      | <name>    | <country> | <city> | <card>   | <month>|<year> |

    And finaliza la compra
    Then deberia ver el mensaje de confirmacion "¡Gracias por tu compra!"

    Examples:
      | email            | password   | name         | country | city  | card         | month | year |
      | admin@demo.local | Admin123!  | Carlos Licto | Ecuador | Quito | 45187843333  | 12    | 2025 |
