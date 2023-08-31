import React from 'react';
import cls from "./gameCard.module.scss";
import {classNames} from "../../../helpers/classNames/classNames";
import {useTheme} from "../../../theme/useTheme";
import Meta from "antd/es/card/Meta";
import {DateTime} from "luxon";
import {Card} from "antd";
import {GameCardType} from "../../../types/gamesList";

interface IProps {
    game: GameCardType;
}

const GameCard = ({game}: IProps) => {
    const {theme} = useTheme();

    return (
        <Card
            cover={<img alt={`${game.title}-image`} src={game.thumbnail}/>}
            // style={{backgroundColor: "var(--primary-color)", border: "none"}}
            className={classNames(cls.cardWrapper, {}, [theme])}
        >
            <Meta
                title={game.title}
                description={
                    <div className={classNames(cls.cardInfo, {}, [theme])}>
                        <div style={{marginRight: "10px"}}>{game.genre}</div>
                        <div>
                            Дата издания: {
                            DateTime
                                .fromFormat(game.release_date, 'yyyy-mm-dd')
                                .toFormat('dd LLL yyyy', {locale: 'ru-RU'})
                        }
                        </div>
                    </div>
                }
            />
            <div>{game.publisher}</div>
        </Card>
    );
};

export default GameCard;