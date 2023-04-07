import { FormControl } from "@angular/forms";

export interface FormRegister {

    userLastName : FormControl<string>;
    userFirstName : FormControl<string>;
    userEmail : FormControl<string>;
    userPassword : FormControl<string>;

}