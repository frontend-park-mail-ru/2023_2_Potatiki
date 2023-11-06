
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

export function reviver(key, value) {
    if (typeof value === 'object' && value !== null) {
        if (value.dataType === 'Map') {
            return new Map(value.value);
        }
    }
    return value;
}

export function formatDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return day + ' / ' + month + ' / ' + year;
}

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
    const categories = new Array();

    lvl1.forEach((parent) => {
        parent.childs = new Array();
        lvl2.forEach((middle) => {
            if (middle.categoryParent === parent.categoryId) {
                middle.childs = new Array();
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
