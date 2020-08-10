export function GenID(stringBase = 'xyz', radix = 36) {
    let d = window.performance.now() || new Date().getTime();
    return stringBase.replace(/[xy]/g, (c) => {
        let r = (d + Math.random() * radix) % radix | 0;
        d = Math.floor(d / radix);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(radix);
    });
}