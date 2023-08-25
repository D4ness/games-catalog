import React from 'react';
import cls from "./gameCard.module.scss";
import {classNames} from "../../../helpers/classNames/classNames";
import {useTheme} from "../../../theme/useTheme";
interface IProps {
    title: string;
    releaseDate: string;
    publisher: string;
    genre: string;
    imageURL: string;
}
const GameCard = ({title, releaseDate, publisher, genre, imageURL}: IProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classNames(cls.cardWrapper, {}, [theme])}>

        </div>
    );
};

export default GameCard;