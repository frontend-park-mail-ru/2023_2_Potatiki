import { StaticActionsType } from "../actions/static";
import { Events } from "../config/events";
import { eventEmmiter } from "../modules/event-emmiter";

/**
 * Класс
 */
class StaticStore {
    /**
     *
     */
    constructor() {
        this.registerEvents();
        this.subscribeToEvents();
    }

    /**
     *
     */
    registerEvents() {
        AppDispatcher.register((action) => {
            switch (action.type) {
            case StaticActionsType.GET_STATIC:
                this.getStatic(action.payload.pollId);
                break;
            default:
                break;
            }
        },
        );
    }

    async getStatic(pollId) {
        const [statusCode, body] = await Ajax.prototype.getRequest('/stat/ioajisfbqougbfq8u013-3rouj3hfd');
        switch (statusCode) {
            case 200:
                eventEmmiter.emit(Events.SUCCESS_GET_STATIC, body);
                break;
            case 401:
                break;
            case 429:
                break;
            default:
                break;
            }
        
    }
}

export const staticStore = new StaticStore();
