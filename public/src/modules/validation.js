const UNICODE_OF_UPPERCASE_A = 0x41;
const UNICODE_OF_UPPERCASE_Z = 0x5A;

const UNICODE_OF_LOWERCASE_A = 0x61;
const UNICODE_OF_LOWERCASE_Z = 0x7A;

const UNICODE_OF_0 = 0x30;
const UNICODE_OF_9 = 0x39;

const UNICODE_OF_PLUS = 0x002B;
const UNICODE_OF_RIGHT_BRACE = 0x0029;
const UNICODE_OF_LEFT_BRACE = 0x0028;
const UNICODE_OF_MINUS = 0x002D;


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

    let isHasUpperLetter = false;
    let isHasLowerLetter = false;
    let isHasDigit = false;

    for (let i = 0; i < pass.length; ++i) {
        if (pass.codePointAt(i) >= UNICODE_OF_UPPERCASE_A &&
        pass.codePointAt(i) <= UNICODE_OF_UPPERCASE_Z) {
            isHasUpperLetter = true;
        } else if (pass.codePointAt(i) >= UNICODE_OF_LOWERCASE_A &&
        pass.codePointAt(i) <= UNICODE_OF_LOWERCASE_Z) {
            isHasLowerLetter = true;
        } else if (pass.codePointAt(i) >= UNICODE_OF_0 && pass.codePointAt(i) <= UNICODE_OF_9) {
            isHasDigit = true;
        } else {
            return ['Разрешена только латиница и цифры', false];
        }
    }

    if (isHasDigit && isHasLowerLetter && isHasUpperLetter) {
        return ['', true];
    }
    return ['Должны быть заглавные, прописные буквы латиницы и цифры', false];
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
        return login.codePointAt(index) >= UNICODE_OF_UPPERCASE_A &&
        login.codePointAt(index) <= UNICODE_OF_UPPERCASE_Z ||
        login.codePointAt(index) >= UNICODE_OF_LOWERCASE_A &&
        login.codePointAt(index) <= UNICODE_OF_LOWERCASE_Z ||
        login.codePointAt(index) >= UNICODE_OF_0 && login.codePointAt(index) <= UNICODE_OF_9;
    });

    if (isValid) {
        return ['', true];
    }

    return ['Разрешена только латиница и цифры', false];
}

/**
 * Валидация телефона +7(___)-___-__-__
 * @param {String} phone Логин пользователя
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
 *
 * @param {*} phone
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
 *
 * @param {*} phone
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
