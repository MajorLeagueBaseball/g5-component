/**
 *
 * @module nodash
 * @desc poor man's lodash.
 *
 */

/**
 *
 * @function assign
 * @param {object} base an object which receives all the keys of the rest.
 * @param {...object} rest
 * @desc assignment is made starting with the first rest argument.
 * @returns {object} Mutates the base object.
 *
 */
export function assign(base, ...rest) {

    const items = [...rest];

    for (let i = 0; i < items.length; ++i) {

        const item = items[i];

        if (!item) {
            continue;
        }

        const keys = Object.keys(item);

        for (let j = 0; j < keys.length; ++j) {
            const key = keys[j];
            base[key] = item[key];
        }

    }

    return base;

}

/**
 *
 * @function isEqual
 * @param {object} a
 * @param {object} b
 * @returns {boolean} a and b are data-wise equal.
 * @note true equality check via stringify
 *
 */
export function isEqual(a, b) {

    return (a === b) || (JSON.stringify(a) === JSON.stringify(b));

}
