import React from 'react';
import {Col, Row} from "antd";
import {Link} from "react-router-dom";
import {classNames} from "../../../helpers/classNames/classNames";
import cls from "./GameList.module.scss";
import {useTheme} from "../../../theme/useTheme";
import GameCard from '../GameCard/GameCard';

export type GameCardType = {
    id: number;
    title: string;
    release_date: string;
    publisher: string;
    genre: string;
    thumbnail: string;
    platform: string;
}

interface IProps {
    currentGames: GameCardType[];
}

const GameList = ({currentGames}: IProps) => {
    const {theme, toggleTheme} = useTheme();
    return (
        <div className={classNames(cls.wrapper, {}, [theme])}>
            <Row gutter={[24, 24]}>
                {
                    currentGames.map(game =>
                        <Col span={24} md={8} xl={6} key={game.id}>
                            <Link to={`/${game.id}`}>
                                <GameCard game={game}/>
                            </Link>
                        </Col>
                    )
                }
            </Row>
        </div>
    );
};

export default GameList;