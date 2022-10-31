import { format } from "date-fns";
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { Event } from "../models/event";

export default class EventStore {
    eventRegistry = new Map<string, Event>();
    selectedEvent: Event | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this)
    }

    get eventsByDate() {
        return Array.from(this.eventRegistry.values()).sort((a, b) => 
            a.date!.getTime() - b.date!.getTime());
    }

    get groupedEvents() {
        return Object.entries(
            this.eventsByDate.reduce((events, event) => {
                const date = format(event.date!, 'dd MMM yyyy');
                events[date] = events[date] ? [...events[date], event] : [event];
                return events;
            }, {} as {[key:string]: Event[]}) 
        )
    }

    // Using an arrow function here automatically binds the function
    loadEvents = async () => {
        this.loadingInitial = true;
        try {
            const events = await agent.Events.list();
            events.forEach((event) => {
               this.setEvent(event);
            });
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);   
        }
    }

    loadEvent = async (id: string) => {
        let event = this.getEvent(id);
        if (event) {
            this.selectedEvent = event;
            return event;
        } else {
            this.loadingInitial = true;
            try {
                event = await agent.Events.details(id);
                this.setEvent(event);
                runInAction(() => {
                    this.selectedEvent = event;
                }) 
                this.setLoadingInitial(false);
                return event;
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    private setEvent = (event: Event) => {
        event.date = new Date(event.date!);
        this.eventRegistry.set(event.id, event);
    }

    private getEvent = (id:string) => {
        return this.eventRegistry.get(id);
    }

    setLoadingInitial = (state:boolean) => {
        this.loadingInitial = state;
    }

    createEvent = async (event: Event) => {
        this.loading = true;
        try {
            await agent.Events.create(event);
            runInAction(() => {
                this.eventRegistry.set(event.id, event);
                this.selectedEvent = event;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    updateEvent = async (event: Event) => {
        this.loading = true;
        try {
            await agent.Events.update(event);
            runInAction(() => {
                this.eventRegistry.set(event.id, event);
                this.selectedEvent = event;
                this.editMode = false;
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            })
        }
    }

    deleteEvent = async (id:string) => {
        this.loading = true;
        try {
            await agent.Events.delete(id);
            runInAction(() => {
                this.eventRegistry.delete(id);
                this.loading = false;
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false;
            })
        }
    }

}