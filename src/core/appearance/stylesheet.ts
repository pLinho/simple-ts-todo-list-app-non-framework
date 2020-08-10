export const whitespaceCSSSelectorLeftBraceGlobalRxg = /(\n{0,})([ \w\.\#\]\[\=\~\*\(\)\:\^]{1,}){1}(\{)/g;
export class StyleSheet {
    constructor(private stylesheet: string) { }
    replace(stylesheet: string) {
        this.stylesheet = stylesheet;
    }
    prependSelectorInSelectors(selector: string): string {
        return this.stylesheet
            .replace(whitespaceCSSSelectorLeftBraceGlobalRxg, `\n ${selector} $2$3`)
            .replace(new RegExp('[ ]{0,}:root'), ''); // root selector
    }
    minify() {
        throw new Error('Not implemented');
    }
}