import { TimeSlot } from "./TimeSlot.model";
import { User } from "./User.model";
import { Zone } from "./Zone.model";

export class Ad {

    public adId? : string = undefined;

    public adTitle? : string = undefined;

    public adImage? : string = undefined;

    public adDescription? : string = undefined;

    public author? : User = undefined;

    public zones?: Array<Zone> = [];

    public timeSlots?: Array<TimeSlot> = [];

}