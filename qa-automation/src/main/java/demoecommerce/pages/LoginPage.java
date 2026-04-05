package demoecommerce.pages;

import net.serenitybdd.screenplay.targets.Target;

public class LoginPage {
     public static final Target USER_FIELD = Target.the("USER")
            .locatedBy("#user_email");
     public static final Target PASSWORD_FIELD = Target.the("PASSWORD")
            .locatedBy("#user_password");
    public static final Target LOGIN_BUTTON = Target.the("LOGIN BUTTON")
            .locatedBy("//button[contains(text(),'Iniciar sesión')]");
}
