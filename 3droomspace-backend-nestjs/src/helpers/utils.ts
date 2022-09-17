export const renameKeys = (prefix, obj) => {
    return Object.keys(obj).reduce( (acc, key) => {
        const newKey = key.replace(`${prefix}_`,'');
        const renamedProp = {
            [newKey]: obj[key]
        };
        return {
            ...acc,
            ...renamedProp
        };
    }, {});
};
