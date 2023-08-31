import React from 'react';
import {Col, Pagination, Row} from "antd";
import {useActions} from "../../../helpers/hooks/useActions";

interface IProps {
    gamesListLength: number;
    currentPage: number;
    gamesPerPage: number;
}

const GamesPagination = ({gamesListLength, currentPage, gamesPerPage}: IProps) => {
    const {changePage} = useActions();
    return (
        <Row justify="center">
            <Col>
                <Pagination
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