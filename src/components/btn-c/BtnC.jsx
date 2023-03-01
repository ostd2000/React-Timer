import React from "react";

import { APP_COLORS, APP_FONTS } from "../../consts/generalConsts";

const BtnC = ({
    children,
    primary,
    secondary,
    danger,
    disabled,
    filled,
    outlined,
    dashed,
    xSmall,
    small,
    large,
    xLarge,
    icon,
    sharpEdge,
    opt,
    ...otherProps
}) => {
    let styles = {
        width: "10rem",
        height: "4rem",

        fontSize: APP_FONTS.FONT_SIZE_300,

        border: "none",
        borderRadius: "3px",

        color: "#000",
    };

    let btnBackgroundColor;
    let btnColor;
    let btnTxtColor;

    if (primary) {
        btnBackgroundColor = APP_COLORS.COLOR_PRIMARY;
        btnColor = APP_COLORS.COLOR_PRIMARY;
    }

    if (secondary) {
        btnBackgroundColor = APP_COLORS.COLOR_SECONDARY;
        btnColor = APP_COLORS.COLOR_SECONDARY;
    }

    if (danger) {
        btnBackgroundColor = APP_COLORS.COLOR_DANGER;
        btnColor = APP_COLORS.COLOR_DANGER;
        btnTxtColor = "#fff";
    }

    if (disabled) {
        btnBackgroundColor = APP_COLORS.COLOR_DISABLED;
        btnColor = APP_COLORS.COLOR_DISABLED_TEXT;
        btnTxtColor = APP_COLORS.COLOR_DISABLED_TEXT;

        styles = {
            ...styles,
            cursor: "not-allowed",
        };
    }

    if (filled) {
        styles = {
            ...styles,
            backgroundColor: btnBackgroundColor,
            color: btnTxtColor,
        };
    }

    if (outlined) {
        styles = {
            ...styles,
            backgroundColor: "transparent",
            border: `2px solid ${btnColor}`,
            color: btnColor,
        };
    }

    if (dashed) {
        styles = {
            ...styles,
            backgroundColor: "transparent",
            border: `2px dashed ${btnColor}`,
            color: btnColor,
        };
    }

    if (xSmall) {
        styles = {
            ...styles,
            width: "6rem",
            height: "2rem",
        };
    }

    if (small) {
        styles = {
            ...styles,
            width: "8rem",
            height: "3rem",
        };
    }

    if (large) {
        styles = {
            ...styles,
            width: "12rem",
            height: "5rem",
        };
    }

    if (xLarge) {
        styles = {
            ...styles,
            width: "14rem",
            height: "6rem",
        };
    }

    if (sharpEdge) {
        styles = {
            ...styles,
            borderRadius: "0",
        };
    }

    if (icon) {
        styles = {
            ...styles,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
        };
    }

    if (opt) {
        styles = {
            ...styles,
            ...opt,
        };
    }

    return (
        <button className="btn-c" style={styles} {...otherProps}>
            <span className="btn-c__name">{children}</span>

            <span className="btn-c__icon">{icon}</span>
        </button>
    );
};

export default BtnC;
