import React, {CSSProperties} from 'react';
import {classNames} from "../../../helpers/classNames/classNames";
import cls from "./ButtonUI.module.scss";
import {useTheme} from "../../../theme/useTheme";

type ButtonType = "submit" | "button";

interface IProps {
    children?: React.ReactNode;
    styles?: CSSProperties;
    type?: ButtonType;
    onClick?: () => any;
}

const ButtonUi = ({children, styles, type, onClick}: IProps) => {
    const {theme} = useTheme();
    return (
        <button
            type={type}
            style={styles}
            className={classNames(cls.button, {}, [theme])}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ButtonUi;