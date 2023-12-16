export const yellowStarSrc = '/static/images/yellow-star.svg';
export const greyStarSrc = '/static/images/grey-star.svg';
export const advantagesName = 'advantages';
export const disadvantagesName = 'disadvantages';
export const commentsName = 'comments';


export const SORT_POPULAR = 'popular';
export const SORT_PRICE_ASC = 'price-asc';
export const SORT_PRICE_DESC = 'price-desc';
export const SORT_RATING = 'rating';

export const reviewForm = {
    advantages: {
        inputClass: 'input review-form__input',
        inputName: 'advantages',
        inputPlaceholder: 'Достоинства',
        errorId: 'advantages-error',
        rows: 4,
        maxlength: 200,
    },

    disadvantages: {
        inputClass: 'input review-form__input',
        inputName: 'disadvantages',
        inputPlaceholder: 'Недостатки',
        errorId: 'disadvantages-error',
        rows: 4,
        maxlength: 200,
    },

    comments: {
        inputClass: 'input review-form__input',
        inputName: 'comments',
        inputPlaceholder: 'Комментарии',
        errorId: 'comments-error',
        rows: 4,
        maxlength: 200,
    },

    submit: {
        class: 'review-form__submit',
        id: 'send-review-button',
        text: 'Отправить отзыв',
    },

    close: {
        class: 'review-form__close fake-button',
        id: 'close-review-button',
        imgSrc: '/static/images/black-cross.svg',
    },
};

export const promocodeInput = {
    inputClass: 'input',
    inputName: 'promocode',
    inputPlaceholder: 'Введите промокод',
    errorId: 'promocode-error',
};
