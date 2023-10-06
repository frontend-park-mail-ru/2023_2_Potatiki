const UNICODE_OF_UPPERCASE_A = 0x41;
const UNICODE_OF_UPPERCASE_Z = 0x5A;

const UNICODE_OF_LOWERCASE_A = 0x61;
const UNICODE_OF_LOWERCASE_Z = 0x7A;

const UNICODE_OF_0 = 0x30;
const UNICODE_OF_9 = 0x39;


/**
 * Валидация пароля
 * @param {String} pass Пароль пользователя
 * @return {[String, Boolean]} Сообщение об ошибке и статус проверки
 */
export function checkPassword(pass) {
    if (pass.length < 8) {
        return ['Минимальная длина 8 символов', false];
    }

    let isHasUpperLetter = false;
    let isHasLowerLetter = false;
    let isHasDigit = false;

    for (let i = 0; i < pass.length; ++i) {
        if (pass.codePointAt(i) >= UNICODE_OF_UPPERCASE_A && pass.codePointAt(i) <= UNICODE_OF_UPPERCASE_Z) {
            isHasUpperLetter = true;
        } else if (pass.codePointAt(i) >= UNICODE_OF_LOWERCASE_A && pass.codePointAt(i) <= UNICODE_OF_LOWERCASE_Z) {
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

    for (let i = 0; i < login.length; ++i) {
        if (!(login.codePointAt(i) >= UNICODE_OF_UPPERCASE_A && login.codePointAt(i) <= 0x5A ||
      login.codePointAt(i) >= 0x61 && login.codePointAt(i) <= 0x7A ||
      login.codePointAt(i) >= 0x30 && login.codePointAt(i) <= 0x39)) {
            return ['Разрешена только латиница и цифры', false];
        }
    }
    return ['', true];
}
