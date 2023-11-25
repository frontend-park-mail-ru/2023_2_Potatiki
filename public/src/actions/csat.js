import {AppDispatcher} from '../modules/dispatcher';

export const CsatActionsType = {
    REMOVE_SELF: 'REMOVE_SELF',
    GET_QUESTIONS: 'GET_QUESTIONS',
    SEND_ANSWER: 'SEND_ANSWER',
};

export const CsatActions = {

    removeSelf() {
        AppDispatcher.dispatch({
            type: CsatActionsType.REMOVE_SELF,
        });
    },

    getQuestions() {
        AppDispatcher.dispatch({
            type: CsatActionsType.GET_QUESTIONS,
        });
    },

    sendAnswer(questionID, resultID, answer) {
        AppDispatcher.dispatch({
            type: CsatActionsType.SEND_ANSWER,
            payload: {questionID, resultID, answer},
        });
    },

};
