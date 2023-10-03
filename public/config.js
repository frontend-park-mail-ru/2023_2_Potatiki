
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
        class: 'header__button_size_catalog',
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
            class: 'button search-form__button_size_search',
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
        class: 'link__icon',
        href: '#',
        withImg: true,
        withText: true,
        text: 'Заказы',
        imgSrc: './static/images/order-box.svg',
    },

    favorite: {
        id: 'favorite-button',
        class: 'link__icon',
        text: 'Избранное',
        href: '#',
        withImg: true,
        withText: true,
        imgSrc: './static/images/like-icon.svg',
    },

    basket: {
        id: 'basket-button',
        class: 'link__icon',
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
        class: 'link__icon',
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


const productsList = [{
    id: 'product-1',
    img: {
        id: 'product-1-img',
        class: 'ac1',
        href: 'product-1',
        withImg: true,
        withText: false,
        imgSrc: './static/images/macbook.png',
    },
    name: {
        id: 'product-1-name',
        class: 'ac1',
        href: 'product-1',
        text: 'Apple MacBook Air 13 M1/8/256 Space Gray',
        withImg: false,
        withText: true,
    },
    button: {
        class: 'button product-card__button_size_in-cart',
        type: 'button',
        id: 'product-1-button',
        text: 'В корзину',
        withImg: true,
        imgSrc: './static/images/cart.svg',
    },
    reviewsHref: 'review',
    starHref: './static/images/star-purple.svg',
    starClass: 'sc1',
    productRate: '4.8',
    reviewsCountClass: 'rc1',
    reviewsCount: '142 отзыва',
    priceClass: 'pc1',
    price: '8 9999 ₽',
},
{
    id: 'product-2',
    img: {
        id: 'product-2-img',
        class: 'ac1',
        href: 'product-2',
        withImg: true,
        withText: false,
        imgSrc: './static/images/macbook.png',
    },
    name: {
        id: 'product-2-name',
        class: 'ac1',
        href: 'product-2',
        text: 'Macbook air',
        withImg: false,
        withText: true,
    },
    button: {
        class: 'button product-card__button_size_in-cart',
        type: 'button',
        id: 'product-2-button',
        text: 'В корзину',
        withImg: true,
        imgSrc: './static/images/cart.svg',
    },
    reviewsHref: 'review',
    starHref: './static/images/star-purple.svg',
    starClass: 'sc1',
    productRate: '5.0',
    reviewsCountClass: 'rc1',
    reviewsCount: '144 отзыва',
    priceClass: 'pc1',
    price: '11 9999 ₽',
},
{
    id: 'product-5',
    img: {
        id: 'product-5-img',
        class: 'ac1',
        href: 'product-2',
        withImg: true,
        withText: false,
        imgSrc: './static/images/macbook.png',
    },
    name: {
        id: 'product-5-name',
        class: 'ac1',
        href: 'product-5',
        text: 'Macbook air',
        withImg: false,
        withText: true,
    },
    button: {
        class: 'button product-card__button_size_in-cart',
        type: 'button',
        id: 'product-5-button',
        text: 'В корзину',
        withImg: true,
        imgSrc: './static/images/cart.svg',
    },
    reviewsHref: 'review',
    starHref: './static/images/star-purple.svg',
    starClass: 'sc1',
    productRate: '5.0',
    reviewsCountClass: 'rc1',
    reviewsCount: '144 отзыва',
    priceClass: 'pc1',
    price: '11 9999 ₽',
},

{id: 'product-6',
    img: {
        id: 'product-6-img',
        class: 'ac1',
        href: 'product-6',
        withImg: true,
        withText: false,
        imgSrc: './static/images/macbook.png',
    },
    name: {
        id: 'product-6-name',
        class: 'ac1',
        href: 'product-6',
        text: 'Macbook air',
        withImg: false,
        withText: true,
    },
    button: {
        class: 'button product-card__button_size_in-cart',
        type: 'button',
        id: 'product-6-button',
        text: 'В корзину',
        withImg: true,
        imgSrc: './static/images/cart.svg',
    },
    reviewsHref: 'review',
    starHref: './static/images/star-purple.svg',
    starClass: 'sc1',
    productRate: '5.0',
    reviewsCountClass: 'rc1',
    reviewsCount: '144 отзыва',
    priceClass: 'pc1',
    price: '11 9999 ₽',
}];

const productsList2 = [{
    id: 'product-3',
    img: {
        id: 'product-3-img',
        class: 'ac1',
        aHref: 'product-3',
        withImg: true,
        withText: false,
        imgSrc: './static/images/macbook.png',
    },
    name: {
        id: 'product-3-name',
        aClass: 'ac1',
        aHref: 'product-3',
        text: 'Apple MacBook Air 13 M1/8/256 Space Gray',
        withImg: false,
        withText: true,
    },
    button: {
        class: 'button product-card__button_size_in-cart',
        type: 'button',
        id: 'product-3-button',
        text: 'В корзину',
        withImg: true,
        imgSrc: './static/images/cart.svg',
    },
    reviewsHref: 'review',
    starHref: './static/images/star-purple.svg',
    starClass: 'sc1',
    productRate: '4.8',
    reviewsCountClass: 'rc1',
    reviewsCount: '142 отзыва',
    priceClass: 'pc1',
    price: '8 9999 ₽',
},
{
    id: 'product-4',
    img: {
        id: 'product-4-img',
        aClass: 'ac1',
        aHref: 'product-4',
        withImg: true,
        withText: false,
        imgSrc: './static/images/macbook.png',
    },
    name: {
        id: 'product-4-name',
        aClass: 'ac1',
        aHref: 'product-4',
        text: 'Macbook air',
        withImg: false,
        withText: true,
    },
    button: {
        class: 'button product-card__button_size_in-cart',
        type: 'button',
        id: 'product-4-button',
        text: 'В корзину',
        withImg: true,
        imgSrc: './static/images/cart.svg',
    },
    reviewsHref: 'review',
    starHref: './static/images/star-purple.svg',
    starClass: 'sc1',
    productRate: '5.0',
    reviewsCountClass: 'rc1',
    reviewsCount: '144 отзыва',
    priceClass: 'pc1',
    price: '11 9999 ₽',
},
{
    id: 'product-7',
    img: {
        id: 'product-7-img',
        aClass: 'ac1',
        aHref: 'product-1',
        withImg: true,
        withText: false,
        imgSrc: './static/images/macbook.png',
    },
    name: {
        id: 'product-7-name',
        aClass: 'ac1',
        aHref: 'product-1',
        text: 'Apple MacBook Air 13 M1/8/256 Space Gray',
        withImg: false,
        withText: true,
    },
    button: {
        class: 'button product-card__button_size_in-cart',
        type: 'button',
        id: 'product-7-button',
        text: 'В корзину',
        withImg: true,
        imgSrc: './static/images/cart.svg',
    },
    reviewsHref: 'review',
    starHref: './static/images/star-purple.svg',
    starClass: 'sc1',
    productRate: '4.8',
    reviewsCountClass: 'rc1',
    reviewsCount: '142 отзыва',
    priceClass: 'pc1',
    price: '8 9999 ₽',
},
{
    id: 'product-8',
    img: {
        id: 'product-8-img',
        aClass: 'product-link',
        aHref: 'product-2',
        withImg: true,
        withText: false,
        imgSrc: './static/images/macbook.png',
    },
    name: {
        id: 'product-8-name',
        aClass: 'product-name',
        aHref: 'product-8',
        text: 'Macbook air',
        withImg: false,
        withText: true,
    },
    button: {
        class: 'button product-card__button_size_in-cart',
        type: 'button',
        id: 'product-8-button',
        text: 'В корзину',
        withImg: true,
        imgSrc: './static/images/cart.svg',
    },
    reviewsHref: 'review',
    starHref: './static/images/star-purple.svg',
    starClass: 'product-rate-img',
    productRate: '5.0',
    reviewsCountClass: 'product-count',
    reviewsCount: '144 отзыва',
    priceClass: 'pc1',
    price: '11 9999 ₽',
}];

const newCarousel = {
    id: 'new-carousel',
    name: 'Новинки',
    productsList: productsList,
    buttonLeft: {
        class: 'button carousel__button',
        type: 'button',
        id: 'carousel-button-left',
        withImg: true,
        imgSrc: './static/images/arrow-left.svg',
    },
    buttonRight: {
        class: 'button carousel__button',
        type: 'button',
        id: 'carousel-button-right',
        withImg: true,
        imgSrc: './static/images/arrow-right.svg',
    },
};

const popularCarousel = {
    id: 'popular-carousel',
    name: 'Хиты продаж',
    productsList: productsList2,
    buttonLeft: {
        class: 'button carousel__button',
        type: 'button',
        id: 'carousel-button-left',
        withImg: true,
        imgSrc: './static/images/arrow-left.svg',
    },
    buttonRight: {
        class: 'button carousel__button',
        type: 'button',
        id: 'carousel-button-right',
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
