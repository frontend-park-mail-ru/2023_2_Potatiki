/**
 * Служебная функция для работы с LocalStorage
 * @param {String} key
 * @param {Object} value
 * @return {Object}
 */
export function replacer(key, value) {
    if (value instanceof Map) {
        return {
            dataType: 'Map',
            value: Array.from(value.entries()),
        };
    } else {
        return value;
    }
}

/**
 * Служебная функция для работы с LocalStorage
 * @param {String} key
 * @param {Object} value
 * @return {Object}
 */
export function reviver(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

/**
 * Форматирование даты
 * @param {Date} date
 * @return {String}
 */
export function formatDate(date) {
    return date.toLocaleDateString('en-UK');
}

/**
 * Построение дерева категорий
 * @param {Object} body
 * @return {[Array, Map]}
 */
export function parseCategories(body) {
    const lvl1 = new Map();
    const lvl2 = new Map();
    const lvl3 = new Map();
    const categoriesMap = new Map();
    body.forEach((parent) => {
        if (parent.categoryParent === -1) {
            lvl1.set(parent.categoryId, parent);
        }
        categoriesMap.set(parent.categoryId, parent);
    });
    body.forEach((middle) => {
        if (lvl1.has(middle.categoryParent)) {
            lvl2.set(middle.categoryId, middle);
        }
    });
    body.forEach((leaf) => {
        if (lvl2.has(leaf.categoryParent)) {
            lvl3.set(leaf.categoryId, leaf);
        }
    });
    const categories = [];

    lvl1.forEach((parent) => {
        parent.childs = [];
        lvl2.forEach((middle) => {
            if (middle.categoryParent === parent.categoryId) {
                middle.childs = [];
                lvl3.forEach((leaf) => {
                    if (leaf.categoryParent === middle.categoryId) {
                        middle.childs.push(leaf);
                    }
                });
                parent.childs.push(middle);
            }
        });
        categories.push(parent);
    });
    return [categories, categoriesMap];
}

/**
 * Получение падежа слова "отзыв" в зависимости от количества
 * @param {Number} count Количество отзывов
 * @return {String}
 */
export function rateCase(count) {
    switch (count % 10) {
    case 1:
        if (count % 100 === 11) {
            return 'отзывов';
        }
        return 'отзыв';
    case 2:
    case 3:
    case 4:
        if (count % 100 > 11 && count % 100 < 15) {
            return 'отзывов';
        }
        return 'отзыва';
    default:
        return 'отзывов';
    }
}

/**
 * Получение статистики по отзывам
 * @param {Object} data
 * @return {Object}
 */
export function reduceReviews(data) {
    let avgRate = 0;
    const reviewsArray = [0, 0, 0, 0, 0];
    data.forEach((review) => {
        reviewsArray[Math.round(review.rating) - 1] += 1;
        avgRate += review.rating;
    });
    return {rows: reviewsArray, count: data.length, rate: (avgRate / data.length).toFixed(1)};
}

/**
 * Форматирование даты для отзыва
 * @param {String} rawDate дата
 * @return {String} форматированная дата
 */
export function getDateForReview(rawDate) {
    const date = new Date(rawDate);
    const months = [
        'января', 'февраля', 'марта', 'апреля', 'июня', 'июля',
        'августа', 'сентября', 'октября', 'ноября', 'декабря',
    ];
    return (date.getDate() + ' ' + months[date.getMonth() - 1] + ' ' + date.getFullYear());
}
