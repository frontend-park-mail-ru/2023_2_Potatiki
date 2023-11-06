const requests = {
    signup: 'auth/signup',
    login: 'auth/signin',
    checkSession: 'auth/check_auth',
    getProducts: 'products/get_all',
};

const header = {
    logo: {
        id: 'logo-link',
        class: 'header__link_size_logo',
        href: '/',
        altText: 'ZuZu logo',
        imgSrc: '/static/images/logo.svg',
    },

    catalog: {
        class: 'header__button_size_catalog',
        type: 'button',
        text: 'Каталог',
        id: 'catalog-button',
        imgSrc: '/static/images/burger.svg',
        imgClass: 'button__img_size_s',
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
            class: 'button_disabled search-form__button_size_search',
            type: '',
            text: '',
            id: 'search-button',
            altText: 'Поиск',
            imgSrc: '/static/images/search.svg',
            imgClass: 'button__img_size_s',
        },

    },

    orders: {
        id: 'orders-button',
        class: 'link_icon link_disabled',
        href: '/orders',
        text: 'Заказы',
        imgSrc: '/static/images/order-box.svg',
        imgClass: 'link_icon__img',
    },

    favorite: {
        id: 'favorite-button',
        class: 'link_icon link_disabled',
        text: 'Избранное',
        href: '#',
        imgSrc: '/static/images/like-icon.svg',
        imgClass: 'link_icon__img',
    },

    basket: {
        id: 'basket-button',
        class: 'link_icon cart-icon',
        href: '/cart',
        text: 'Корзина',
        imgSrc: '/static/images/cart-icon.svg',
        imgClass: 'link_icon__img',
        textClass: 'cart-count',
    },

    login: {
        id: 'login-button',
        class: 'link_icon',
        text: 'Войти',
        href: '/login',
        imgSrc: '/static/images/login.svg',
        imgClass: 'link_icon__img',
    },

    profile: {
        id: 'profile-button',
        class: 'link_icon',
        href: 'profile',
        text: 'Профиль',
        imgSrc: '/static/images/user.svg',
        imgClass: 'link_icon__img',
    },

    logout: {
        id: 'logout-button',
        class: 'link_icon fake-button',
        text: 'Выйти',
        imgSrc: '/static/images/login.svg',
        imgClass: 'link_icon__img',
        spanClass: 'dark-text',
    },
};


const newCarousel = {
    id: 'new-carousel',
    name: 'Новинки',
    buttonLeft: {
        class: 'button carousel__button',
        type: 'button',
        id: 'new-carousel-button-left',
        imgSrc: '/static/images/arrow-left.svg',
        imgClass: 'button__img_size_m',
    },
    buttonRight: {
        class: 'button carousel__button',
        type: 'button',
        id: 'new-carousel-button-right',
        imgSrc: '/static/images/arrow-right.svg',
        imgClass: 'button__img_size_m',
    },
};

const popularCarousel = {
    id: 'popular-carousel',
    name: 'Хиты продаж',
    buttonLeft: {
        class: 'button carousel__button',
        type: 'button',
        id: 'popular-carousel-button-left',
        imgSrc: '/static/images/arrow-left.svg',
        imgClass: 'button__img_size_m',
    },
    buttonRight: {
        class: 'button carousel__button',
        type: 'button',
        id: 'popular-carousel-button-right',
        imgSrc: '/static/images/arrow-right.svg',
        imgClass: 'button__img_size_m',
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
        href: '/',
        altText: 'ZuZu logo',
        imgSrc: '/static/images/logo.svg',
        imgClass: 'login-page__logo-img',
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
            href: '/signup',
        },
    },
};

const signupPage = {
    logo: {
        id: 'logo-button',
        class: 'login-page__logo',
        href: '/',
        altText: 'ZuZu logo',
        imgSrc: '/static/images/logo.svg',
        imgClass: 'login-page__logo-img',
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

        phone: {
            inputClass: 'input login-form__input',
            inputName: 'phone',
            inputPlaceholder: 'Введите номер телефона',
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
            href: '/login',
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
