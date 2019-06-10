export default function classNameCombine(styleOrigin, styleCalling) {
    if (!styleOrigin) return null;
    Object.keys(styleOrigin).forEach(s => {
        if (styleCalling[s]) {
            styleOrigin[s] = `${styleOrigin[s]} ${styleCalling[s]}`;
        }
    });
    return styleOrigin;
}
