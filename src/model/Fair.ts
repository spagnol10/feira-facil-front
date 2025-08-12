import { weekDayMap } from "../utils/util";
import { Address } from "./Address";

export class Fair {
    id: string | null = null;
    name: string = "";
    description: string = "";
    address?: Address = new Address();
    daysOfWeek: string[] = [];
    startAt: string = "";
    endAt: string = "";

    constructor(init?: Partial<Fair>) {
        Object.assign(this, init);
    }

    parseDays() {
        this.daysOfWeek = this.daysOfWeek.map(day => weekDayMap.get(day) || day)
    }
}