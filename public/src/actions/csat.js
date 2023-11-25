import {AppDispatcher} from '../modules/dispatcher';

export const CsatActionsType = {
    CLOSE_IFRAME: 'CLOSE_IFRAME',
};

export const CsatActions = {

    closeIframe() {
        AppDispatcher.dispatch({
            type: CsatActionsType.CLOSE_IFRAME,
        });
    },

};
