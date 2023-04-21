import { Role } from "./Role.model";

export class User {

    public userId? : string = undefined;

    public userLastName? : string = undefined;

    public userFirstName? : string = undefined;

    public userEmail? : string = undefined;

    public userPhone? : string = undefined;

    public userAdress? : string = undefined;

    public userPostalCode? : string = undefined;

    public userCity? : string = undefined;

    public userRole? : Role = undefined;

}