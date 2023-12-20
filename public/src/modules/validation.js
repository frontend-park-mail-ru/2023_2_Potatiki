const UNICODE_OF_UPPERCASE_A = 0x41;
const UNICODE_OF_UPPERCASE_Z = 0x5A;

const UNICODE_OF_LOWERCASE_A = 0x61;
const UNICODE_OF_LOWERCASE_Z = 0x7A;

const UNICODE_OF_0 = 0x30;
const UNICODE_OF_9 = 0x39;

const UNICODE_OF_SPACE = 0x20;

const UNICODE_OF_PLUS = 0x002B;
const UNICODE_OF_RIGHT_BRACE = 0x0029;
const UNICODE_OF_LEFT_BRACE = 0x0028;
const UNICODE_OF_MINUS = 0x002D;
const UNICODE_OF_TIRE = 8212;

const UNICODE_OF_ASCII_START = 0x21;
const UNICODE_OF_ASCII_END = 0x7E;

const UNICODE_OF_RUS_BEGIN = 0x410;
const UNICODE_OF_RUS_END = 0x44F;


/**
 * Валидация пароля
 * @param {String} pass Пароль пользователя
 * @return {[String, Boolean]} Сообщение об ошибке и статус проверки
 */
export function checkPassword(pass) {
    if (pass.length < 8) {
        return ['Минимальная длина 8 символов', false];
    }

    if (pass.length > 32) {
        return ['Максимальная длина 32 символа', false];
    }

    let isHasLetter = false;
    let isHasDigit = false;

    for (let i = 0; i < pass.length; ++i) {
        if (pass.codePointAt(i) >= UNICODE_OF_UPPERCASE_A &&
        pass.codePointAt(i) <= UNICODE_OF_UPPERCASE_Z) {
            isHasLetter = true;
        } else if (pass.codePointAt(i) >= UNICODE_OF_LOWERCASE_A &&
        pass.codePointAt(i) <= UNICODE_OF_LOWERCASE_Z) {
            isHasLetter = true;
        } else if (pass.codePointAt(i) >= UNICODE_OF_0 && pass.codePointAt(i) <= UNICODE_OF_9) {
            isHasDigit = true;
        } else if (pass.codePointAt(i) < UNICODE_OF_ASCII_START ||
        pass.codePointAt(i) > UNICODE_OF_ASCII_END) {
            return ['Разрешена только латиница, цифры и спец. символы', false];
        }
    }

    if (isHasDigit && isHasLetter) {
        return ['', true];
    }
    return ['Должны быть буквы латиницы и цифры', false];
}

/**
 * Валидация логина
 * @param {String} login Логин пользователя
 * @return {[String, Boolean]} Сообщение об ошибке и статус проверки
 */
export function checkLogin(login) {
    if (login.length < 6) {
        return ['Минимальная длина 6 символов', false];
    }

    if (login.length > 30) {
        return ['Максимальная длина 30 символов', false];
    }

    const isValid = [...login].every((_, index) => {
        return login.codePointAt(index) >= UNICODE_OF_ASCII_START &&
        login.codePointAt(index) <= UNICODE_OF_ASCII_END;
    });

    if (isValid) {
        return ['', true];
    }

    return ['Неверный формат ввода', false];
}

/**
 * Валидация телефона +7(___)-___-__-__
 * @param {String} phone Номер телефона пользователя
 * @return {[String, Boolean]} Сообщение об ошибке и статус проверки
 */
export function checkPhone(phone) {
    const isValid = [...phone].every((_, index) => {
        switch (index) {
        case 0:
            return phone.codePointAt(index) === UNICODE_OF_PLUS;
        case 1:
            return phone.codePointAt(index) === UNICODE_OF_0 + 7;
        case 2:
            return phone.codePointAt(index) === UNICODE_OF_LEFT_BRACE;
        case 6:
            return phone.codePointAt(index) === UNICODE_OF_RIGHT_BRACE;
        case 7:
            return phone.codePointAt(index) === UNICODE_OF_MINUS;
        case 11:
            return phone.codePointAt(index) === UNICODE_OF_MINUS;
        case 14:
            return phone.codePointAt(index) === UNICODE_OF_MINUS;
        default:
            return phone.codePointAt(index) >= UNICODE_OF_0 &&
            phone.codePointAt(index) <= UNICODE_OF_9;
        }
    });

    if (isValid) {
        return ['', true];
    }

    return ['Неверный формат', false];
}

/**
 * Очищение номера телефона от формата
 * @param {String} phone Форматированный номер телефона
 * @return {String} Приведенный номер телефона
 */
export function cleanPhone(phone) {
    let cleanPhone = '';
    [...phone].forEach((_, index) => {
        if (phone.codePointAt(index) >= UNICODE_OF_0 &&
            phone.codePointAt(index) <= UNICODE_OF_9 || index === 0) {
            cleanPhone += phone.charAt(index);
        }
    });
    return cleanPhone;
}

/**
 * Форматирование номера телефона
 * @param {String} phone Номер телефона
 * @return {String} Форматированный номер телефона
 */
export function formatPhone(phone) {
    let formatPhone = '';
    [...phone].forEach((_, index) => {
        switch (index) {
        case 2:
            formatPhone += '(';
            break;
        case 5:
            formatPhone += ')-';
            break;
        case 8:
            formatPhone += '-';
            break;
        case 10:
            formatPhone += '-';
            break;
        }
        formatPhone += phone.charAt(index);
    });
    return formatPhone;
}
/**
 * Валидация полей адреса
 * @param {String} fieldText Текст поля
 * @param {Boolean} isFlatField Флаг для определения является ли поле полем квартиры
 * @return {[Boolean, String]} Результат проверки
 */
export function checkAddressField(fieldText, isFlatField) {
    if (fieldText.length > 30) {
        return ['Максимальная длина 30 символов', false];
    }

    if (!fieldText && !isFlatField) {
        return ['Заполните поле', false];
    }

    return ['', true];
}

/**
 * Валидация поля формы ввода
 * @param {String} fieldText
 * @return {[Boolean, String]} Результат проверки
 */
export function checkReviewInput(fieldText) {
    if (fieldText.length > 200) {
        return ['Максимальная длина 200 символов', false];
    }

    for (let i = 0; i < fieldText.length; ++i) {
        const code = fieldText.codePointAt(i);
        if ((code < UNICODE_OF_ASCII_START ||
        code > UNICODE_OF_ASCII_END) &&
        (code < UNICODE_OF_RUS_BEGIN ||
        code > UNICODE_OF_RUS_END) &&
        code !== UNICODE_OF_SPACE && code !== UNICODE_OF_TIRE
        ) {
            return ['Разрешены только буквы, цифры и знаки препинания', false];
        }
    }


    return ['', true];
}

/**
 * Валидация поля формы ввода
 * @param {String} fieldText
 * @return {[Boolean, String]} Результат проверки
 */
export function checkPromoInput(fieldText) {
    if (fieldText.length < 1) {
        return ['', false];
    }
    if (fieldText.length > 10) {
        return ['Промокод недействителен', false];
    }

    for (let i = 0; i < fieldText.length; ++i) {
        const code = fieldText.codePointAt(i);
        if (!((code >= UNICODE_OF_0 && code <= UNICODE_OF_9) ||
            (code <= UNICODE_OF_LOWERCASE_Z && code >= UNICODE_OF_LOWERCASE_A) ||
            (code <= UNICODE_OF_UPPERCASE_Z && code >= UNICODE_OF_UPPERCASE_A)
        )) {
            return ['Промокод недействителен', false];
        }
    }

    return ['', true];
}
