import React, {useLayoutEffect, useRef, useState} from 'react';
import {useParams} from "react-router-dom";
import {DateTime} from "luxon";
import {Carousel} from "antd";
import {useTheme} from "../../theme/useTheme";
import {gameAPI} from "../../services/GameService";


const GamePage = () => {
    const {theme, toggleTheme} = useTheme();
    const {id} = useParams();
    const {data, isLoading, error} = gameAPI.useFetchGameQuery(Number(id));

    const ref = useRef(null);

    const [width, setWidth] = useState(0);
    useLayoutEffect(() => {
        if (ref.current !== null) {
            setWidth(ref.current.offsetWidth)
        }
    }, [data]);
    if (isLoading) {
        return <h1>Идёт загрузка...</h1>
    }
    if (error) {
        return <h1>Произошла ошибка при загрузке данных об игре</h1>
    }
    // TODO Системные требования
    return (
        <>
            {
                data ?
                    <div>
                        <div>{data.title}</div>
                        <div>
                            Дата издания: {
                            DateTime
                                .fromFormat(data.release_date, 'yyyy-mm-dd')
                                .toFormat('dd LLL yyyy', {locale: 'ru-RU'})
                        }
                        </div>
                        <div>Издатель: {data.publisher}, Разработчик: {data.developer}, Жанр: {data.genre}</div>
                        <div>{data.minimum_system_requirements?.values}</div>
                        <Carousel>
                            {data.screenshots.map(screen =>
                                <div key={screen.id} ref={ref}>
                                    <div
                                        style={{
                                            margin: "0 auto", backgroundImage: `url(${screen.image})`,
                                            width: "70%", height: width / 1.78 * 0.7,
                                            backgroundSize: "100%", color: "white"
                                        }}
                                    >
                                    </div>
                                </div>)}
                        </Carousel>
                    </div> :
                    <div>Ошибка</div>
            }
        </>
    );
};

export default GamePage;