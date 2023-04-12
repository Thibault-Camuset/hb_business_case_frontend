import { FormControl } from "@angular/forms";

export interface FormAdd {

    addId : FormControl<string>;
    addTitle : FormControl<string>;
    addImage : FormControl<string>;
    addDescription : FormControl<string>;
    author : FormControl<string>;

}