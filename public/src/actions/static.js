import {AppDispatcher} from '../modules/dispatcher';

export const StaticActionsType = {
    GET_STATIC: 'GET_STATIC',
};

export const StaticActions = {
    getStatic(pollId) {
        AppDispatcher.dispatch({
            type: StaticActionsType.GET_STATIC,
            payload: {
                pollId: pollId},
        });
    },
};
