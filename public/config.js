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
        imgClass: 'logo-img ',
        imgSrc: '/static/images/logo.svg',
        imgClass: 'logo-img ',
    },

    catalog: {
        class: 'header__button_size_catalog',
        class: 'header__button_size_catalog',
        type: 'button',
        text: 'Каталог',
        id: 'catalog-button',
        imgSrc: '/static/images/burger.svg',
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
            offAutocomplete: true,
        },
        submit: {
            class: 'search-form__button_size_search',
            type: '',
            text: '',
            id: 'search-button',
            altText: 'Поиск',
            imgSrc: '/static/images/search.svg',
            imgSrc: '/static/images/search.svg',
            imgClass: 'button__img_size_s',
        },

    },

    orders: {
        id: 'orders-button',
        class: 'link_icon',
        href: '/orders',
        class: 'link_icon',
        href: '/orders',
        text: 'Заказы',
        imgSrc: '/static/images/order-box.svg',
        imgSrc: '/static/images/order-box.svg',
        imgClass: 'link_icon__img',
    },

    notification: {
        id: 'notification-button',
        class: 'link_icon fake-button',
        text: 'Уведомления',
        imgSrc: '/static/images/not-icon.svg',
        imgClass: 'link_icon__img_notification',
        spanClass: 'dark-text icon__text',
    },

    basket: {
        id: 'basket-button',
        class: 'link_icon cart-icon',
        href: '/cart',
        class: 'link_icon cart-icon',
        href: '/cart',
        text: 'Корзина',
        imgSrc: '/static/images/cart-icon.svg',
        imgClass: 'link_icon__img cart-icon__img',
        textClass: 'cart-count',
    },

    login: {
        id: 'login-button',
        class: 'link_icon',
        text: 'Войти',
        href: '/login',
        imgSrc: '/static/images/login.svg',
        imgSrc: '/static/images/login.svg',
        imgClass: 'link_icon__img',
    },

    profile: {
        id: 'profile-button',
        class: 'link_icon',
        href: '/my-profile',
        class: 'link_icon',
        href: '/my-profile',
        text: 'Профиль',
        imgSrc: '/static/images/profile.svg',
        imgClass: 'link_icon__img',
    },

    logout: {
        id: 'logout-button',
        class: 'link_icon fake-button',
        text: 'Выйти',
        imgSrc: '/static/images/login.svg',
        imgClass: 'link_icon__img',
        spanClass: 'dark-text icon__text',
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
        imgSrc: '/static/images/arrow-left.svg',
        imgClass: 'button__img_size_m',
    },
    buttonRight: {
        class: 'button carousel__button',
        type: 'button',
        id: 'new-carousel-button-right',
        imgSrc: '/static/images/arrow-right.svg',
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
            inputPlaceholder: '+7(___)-___-__-__',
            errorId: 'number-error',
        },

        phone: {
            inputClass: 'input login-form__input',
            inputName: 'phone',
            inputPlaceholder: '+7(___)-___-__-__',
            errorId: 'number-error',
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

const profilePage = {
    title: 'Мой профиль',
    profile: {
        navElem1: 'Мои данные',
        navElem2: 'Мои адреса',
        infoCard: {
        },
        passwordEditForm: {
            oldPassword: {
                inputName: 'old-password',
                inputPlaceholder: 'Старый пароль',
                inputType: 'password',
                errorId: 'old-password-error',
            },
            newPassword: {
                inputName: 'new-password',
                inputPlaceholder: 'Новый пароль',
                inputType: 'password',
                errorId: 'new-password-error',
            },
            repeatPassword: {
                inputName: 'repeat-password',
                inputPlaceholder: 'Повторите пароль',
                inputType: 'password',
                errorId: 'repeat-password-error',
            },
            submit: {
                id: 'save-button',
                text: 'Сохранить',
            },
        },
        numberEditForm: {
            number: {
                inputName: 'number',
                inputClass: 'number-edit-form__input',
                inputPlaceholder: '+7(___)-___-__-__',
                errorId: 'number-error',
            },
            submit: {
                id: 'save-button',
                text: 'Сохранить',
            },
        },

        addressForm: {
            city: {
                inputName: 'number',
                inputPlaceholder: 'Город',
                errorId: 'city-error',
            },
            street: {
                inputName: 'street',
                inputPlaceholder: 'Улица',
                errorId: 'street-error',
            },
            house: {
                inputName: 'house',
                inputPlaceholder: 'Дом',
                errorId: 'house-error',
            },
            flat: {
                inputName: 'flat',
                inputPlaceholder: 'Квартира',
                errorId: 'flat-error',
            },
            submit: {
                class: 'address-form__submit',
                id: 'save-button',
                text: 'Сохранить',
            },
        },
    },
};

export const config = {
    isAuthorized: false,
    page: 'main',
    mainPage: mainPage,
    signupPage: signupPage,
    loginPage: loginPage,
    profilePage: profilePage,
    requests: requests,
};
