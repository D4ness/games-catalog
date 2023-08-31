import React, {SetStateAction} from 'react';
import {Select} from "antd";
import {useActions} from "../../../helpers/hooks/useActions";
import categories from "../../../store/categories";

interface IProps {
    filters: Record<string, string>;
    setFilters: React.Dispatch<SetStateAction<Record<string, string>>>
}

const GameFilters = ({filters, setFilters}: IProps) => {
    const {fetchGamesList} = useActions();

    return (
        <>
            <div>Фильтры:</div>
            {/*<Space wrap>*/}
            <div>
                По жанру:
                <Select
                    allowClear
                    style={{width: 120}}
                    onChange={option => {
                        setFilters({...filters, genre: option})
                    }}
                    defaultValue={filters.genre}
                    options={categories}

                />
            </div>
            <div>
                По платформе:
                <Select
                    style={{width: 120}}
                    onChange={option => setFilters({...filters, platform: option})}
                    defaultValue={filters.platform}
                    options={[
                        {value: "pc", label: "PC"},
                        {value: "browser", label: "Browser"}
                    ]}
                />
            </div>

            {/*</Space>*/}
            <div>
                Сортировка:
                <Select
                    style={{width: 120}}
                    onChange={option => setFilters({...filters, sortBy: option})}
                    defaultValue={filters.sortBy}
                    options={[
                        {value: "alphabetical", label: "По алфавитному порядку"},
                        {value: "release-date", label: "По дате релиза"},
                        {value: "popularity", label: "По популярности"},
                    ]}
                />
            </div>
            <button type="button" onClick={() => fetchGamesList(filters)}>Применить</button>
        </>
    );
};

export default GameFilters;