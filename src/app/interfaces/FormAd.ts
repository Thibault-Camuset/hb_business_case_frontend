import { FormControl } from "@angular/forms";
import { Zone } from "../models/Zone.model";
import { TimeSlot } from "../models/TimeSlot.model";

export interface FormAd {

    adId : FormControl<string>;
    adTitle : FormControl<string>;
    adImage : FormControl<string>;
    adDescription : FormControl<string>;
    author : FormControl<string>;
    selectedZones : FormControl<Zone[]>;
    selectedTimeSlots : FormControl<TimeSlot[]>;

}