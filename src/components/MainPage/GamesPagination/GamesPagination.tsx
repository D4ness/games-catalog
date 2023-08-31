import React from 'react';
import {Col, Pagination, Row} from "antd";
import {useActions} from "../../../helpers/hooks/useActions";
import {classNames} from "../../../helpers/classNames/classNames";
import cls from "./GamesPagination.module.scss";
import {useTheme} from "../../../theme/useTheme";

interface IProps {
    gamesListLength: number;
    currentPage: number;
    gamesPerPage: number;
}

const GamesPagination = ({gamesListLength, currentPage, gamesPerPage}: IProps) => {
    const {theme} = useTheme();
    const {changePage} = useActions();
    return (
        <Row justify="center" className={classNames(cls.wrapper, {}, [theme])} >
            <Col>
                <Pagination
                    className={classNames(cls.paginationPage, {}, [theme])}
                    current={currentPage}
                    onChange={(page) => changePage(page)}
                    total={gamesListLength}
                    pageSize={gamesPerPage}
                    showSizeChanger={false}
                />
            </Col>
        </Row>
    );
};

export default GamesPagination;