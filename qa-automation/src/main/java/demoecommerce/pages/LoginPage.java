package demoecommerce.pages;

import net.serenitybdd.screenplay.targets.Target;

public class LoginPage {
       public static final Target USER_FIELD = Target.the("USER")
              .locatedBy("#email");
       public static final Target PASSWORD_FIELD = Target.the("PASSWORD")
              .locatedBy("#password");
       public static final Target LOGIN_BUTTON = Target.the("Login button")
        .locatedBy("//button[@type='submit' and contains(@class,'btn-primary')]");
}
