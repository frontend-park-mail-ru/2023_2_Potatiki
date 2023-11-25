export const yellowStarSrc = '/static/images/yellow-star.svg';
export const greyStarSrc = '/static/images/grey-star.svg';

export const reviewForm = {
    advantages: {
        inputClass: 'input review-form__input',
        inputName: 'advantages',
        inputPlaceholder: 'Достоинства',
        errorId: 'advantages-error',
    },

    disadvantages: {
        inputClass: 'input review-form__input',
        inputName: 'disadvantages',
        inputPlaceholder: 'Недостатки',
        errorId: 'disadvantages-error',
    },

    comments: {
        inputClass: 'input review-form__input',
        inputName: 'comments',
        inputPlaceholder: 'Комментарии',
        errorId: 'comments-error',
    },

    submit: {
        class: 'review-form__submit',
        id: 'send-review-button',
        text: 'Отправить отзыв',
    },

    close: {
        class: 'review-form__close fake-button',
        id: 'close-review-button',
        imgSrc: '/static/images/cross.svg',
    },
};
