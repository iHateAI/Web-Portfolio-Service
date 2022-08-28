const varColors = {
    light: {
        black: "#000000",
        coolDeepBlack: "1b1b1c",
        coolBlack: "#4b4b4e",
        coolDeepGray: "#8a8a8f",
        coolGray: "#cbcbcd",
        coolLightGray: "#e5e5e6",
        coolWhiteGray: "#f2f2f3",
        white: "#ffffff",
        lightSky: "#99ccff",
        sky: "#4da6ff",
    },
};

const varFontSize = {
    bp1024: (size) => `${size * 4}px`,
};

const varFontWeight = {
    light: `200`,
    normal: `400`,
    bold: `500`,
    bolder: `600`,
    black: `800`,
};

const varLineHeight = {
    bp1024: (size) => `${size * 4 + parseInt(size * 0.2)}px`,
};

const varSpacing = {
    bp1024: (size) => `${size * 8}px`,
};

export { varColors, varFontSize, varFontWeight, varLineHeight, varSpacing };
