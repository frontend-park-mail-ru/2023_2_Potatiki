
export const baseURL = 'http://84.23.52.212:8082/api/';

const header = {
    logo: {
        id: 'logo-link',
        class: 'header__link_size_logo',
        href: 'main',
        withImg: true,
        altText: 'ZuZu',
        imgSrc: './static/images/logo.svg',
    },

    catalog: {
        class: 'header__button_size_catalog button-disabled',
        type: 'button',
        text: 'Каталог',
        id: 'catalog-button',
        withImg: true,
        imgSrc: './static/images/burger.svg',
    },

    search: {
        formId: 'search-form',
        formName: 'search-form',
        formClass: 'search-form',
        input: {
            inputClass: 'input serch-form__input',
            inputName: 'search',
            inputPlaceholder: 'Я хочу найти',
            error: false,
            label: false,
        },
        submit: {
            class: 'button-disabled search-form__button_size_search',
            type: '',
            text: '',
            id: 'search-button',
            withImg: true,
            altText: 'Поиск',
            imgSrc: './static/images/search.svg',
        },

    },

    orders: {
        id: 'orders-button',
        class: 'link__icon link-disabled',
        href: '#',
        withImg: true,
        withText: true,
        text: 'Заказы',
        imgSrc: './static/images/order-box.svg',
    },

    favorite: {
        id: 'favorite-button',
        class: 'link__icon link-disabled',
        text: 'Избранное',
        href: '#',
        withImg: true,
        withText: true,
        imgSrc: './static/images/like-icon.svg',
    },

    basket: {
        id: 'basket-button',
        class: 'link__icon  link-disabled',
        href: '#',
        withImg: true,
        withText: true,
        text: 'Корзина',
        imgSrc: './static/images/cart-icon.svg',
    },

    login: {
        id: 'login-button',
        class: 'link__icon',
        text: 'Войти',
        href: 'login',
        withImg: true,
        withText: true,
        imgSrc: './static/images/login.svg',
    },

    profile: {
        id: 'profile-button',
        class: 'link__icon link-disabled',
        href: 'profile',
        text: 'Профиль',
        withImg: true,
        withText: true,
        imgSrc: './static/images/user.svg',
    },

    logout: {
        id: 'logout-button',
        class: 'link__icon',
        href: 'logout',
        text: 'Выйти',
        withImg: true,
        withText: true,
        imgSrc: './static/images/login.svg',
    },
};


const newCarousel = {
    id: 'new-carousel',
    name: 'Новинки',
    buttonLeft: {
        class: 'button carousel__button',
        type: 'button',
        id: 'new-carousel-button-left',
        imgSrc: './static/images/arrow-left.svg',
    },
    buttonRight: {
        class: 'button carousel__button',
        type: 'button',
        id: 'new-carousel-button-right',
        imgSrc: './static/images/arrow-right.svg',
    },
};

const popularCarousel = {
    id: 'popular-carousel',
    name: 'Хиты продаж',
    buttonLeft: {
        class: 'button carousel__button',
        type: 'button',
        id: 'popular-carousel-button-left',
        withImg: true,
        imgSrc: './static/images/arrow-left.svg',
    },
    buttonRight: {
        class: 'button carousel__button',
        type: 'button',
        id: 'popular-carousel-button-right',
        withImg: true,
        imgSrc: './static/images/arrow-right.svg',
    },
};

const mainPage = {
    header: header,
    newCarousel: newCarousel,
    popularCarousel: popularCarousel,
};

const loginPage = {
    logo: {
        id: 'logo-button',
        class: 'login-page__logo',
        href: 'main',
        withImg: true,
        altText: 'ZuZu',
        imgSrc: './static/images/logo.svg',
    },

    form: {
        formName: 'login',

        login: {
            inputClass: 'input login-form__input',
            inputName: 'login',
            inputPlaceholder: 'Введите логин',
        },

        password: {
            inputClass: 'input login-form__input',
            inputName: 'password',
            inputType: 'password',
            inputPlaceholder: 'Введите пароль',
        },

        submit: {
            class: 'button login-form__button',
            type: 'button',
            id: 'login-submit-button',
            text: 'Войти',
        },

        signup: {
            id: 'signup-link',
            class: 'link login-form__link',
            text: 'Зарегистрироваться',
            href: 'signup',
            withText: true,
        },
    },
};

const signupPage = {
    logo: {
        id: 'logo-button',
        class: 'login-page__logo',
        href: 'main',
        withImg: true,
        altText: 'ZuZu',
        imgSrc: './static/images/logo.svg',
    },

    form: {
        formName: 'signup-form',
        errorId: 'signup-form-error',

        login: {
            inputClass: 'input signup-form__input',
            inputName: 'login',
            inputPlaceholder: 'Придумайте логин',
            errorId: 'login-error',
        },

        password: {
            inputClass: 'input signup-form__input',
            inputName: 'password',
            inputType: 'password',
            inputPlaceholder: 'Придумайте пароль',
            errorId: 'password-error',
        },

        repeatPassword: {
            inputClass: 'input signup-form__input',
            inputName: 'repeat-password',
            inputType: 'password',
            inputPlaceholder: 'Повторите пароль',
            errorId: 'repeat-password-error',
        },

        submit: {
            class: 'button signup-form__button',
            type: 'button',
            id: 'signup-submit-button',
            text: 'Зарегистрироваться',
        },

        loginLink: {
            id: 'login-link',
            class: 'link signup-form__link',
            text: 'Уже есть аккаунт?',
            href: 'login',
            withText: true,
        },
    },
};

export const config = {
    isAuthorized: false,
    page: 'main',
    mainPage: mainPage,
    signupPage: signupPage,
    loginPage: loginPage,
};
