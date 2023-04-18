import { Ad } from "./Ad.model";
import { Zone } from "./Zone.model";
import { TimeSlot } from "./TimeSlot.model";

export class AdZoneTime {

    public adZoneTimeId? : string = undefined;

    public price? : number = undefined;

    public ad? : Ad = undefined;

    public zone? : Zone = undefined;

    public time? : TimeSlot = undefined;

}