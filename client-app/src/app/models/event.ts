import { Profile } from "./profile";

export interface Event {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    city: string;
    venue: string;
    hostUsername: string;
    isCancelled: boolean;
    isGoing: boolean;
    isHost: boolean;
    host?: Profile;
    attendees: Profile[];
}

export class Event implements Event {
    constructor(init?: EventFormValues) {
        Object.assign(this, init);
    }
}

export class EventFormValues {
    id?: string = undefined;
    title: string = '';
    category: string = '';
    description: string = '';
    date: Date | null = null;
    city: string = '';
    venue: string = '';

    constructor(event?: EventFormValues) {
        if (event) {
            this.id = event.id;
            this.title = event.title;
            this.category = event.category;
            this.description = event.description;
            this.date = event.date;
            this.venue = event.venue;
            this.city = event.city;
        }
    }
}