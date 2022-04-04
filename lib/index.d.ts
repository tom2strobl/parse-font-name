export declare const numericFontWeightMap: {
    readonly 100: readonly ["Thin", "UltraThin", "ExtraThin", "Hairline", "Flyweight"];
    readonly 200: readonly ["ExtraLight", "ExtraLite", "UltraLight", "Extraleicht", "Bantamweight"];
    readonly 300: readonly ["Light", "Lite", "Leicht", "Blond", "Featherweight"];
    readonly 400: readonly ["Regular", "Normal", "Book", "Roman", "Text", "Display", "Buch", "Lightweight"];
    readonly 500: readonly ["Medium", "Dark", "Demi", "Thick", "Kräftig", "Welterweight"];
    readonly 600: readonly ["SemiBold", "DemiBold", "ExtraThick", "ExtraDark", "Halbfett", "Middleweight"];
    readonly 700: readonly ["Bold", "Dreiviertelfett", "Fett", "Large", "Headline", "Cruiserweight"];
    readonly 800: readonly ["ExtraBold", "UltraBold", "Heavyweight"];
    readonly 900: readonly ["Black", "Heavy", "ExtraBlack", "UltraBlack", "Fat", "Poster", "Extrafett", "Sumo"];
};
export declare function parseNumericWeightFromName(fontStrings: string[], fallbackValue?: number): number[];
export declare function parseNumericWeightFromName(fontStrings: string, fallbackValue?: number): number;
declare type FontStyleCSSString = 'normal' | 'oblique' | 'italic';
export declare function parseStyleFromName(fontStrings: string, format?: 'cssString', fallbackValue?: FontStyleCSSString): FontStyleCSSString;
export declare function parseStyleFromName(fontStrings: string[], format?: 'cssString', fallbackValue?: FontStyleCSSString): FontStyleCSSString[];
export declare function parseStyleFromName(fontStrings: string, format?: 'boolean', fallbackValue?: boolean): boolean;
export declare function parseStyleFromName(fontStrings: string[], format?: 'boolean', fallbackValue?: boolean): boolean[];
export {};
