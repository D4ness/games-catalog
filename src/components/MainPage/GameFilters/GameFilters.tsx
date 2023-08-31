import React, {SetStateAction} from 'react';
import {Select} from "antd";
import {useActions} from "../../../helpers/hooks/useActions";
import categories from "../../../store/categories";
import {classNames} from "../../../helpers/classNames/classNames";
import {useTheme} from "../../../theme/useTheme";
import cls from "./GameFilters.module.scss"
import ButtonUI from "../../UI/ButtonUI/ButtonUI";

interface IProps {
    filters: Record<string, string>;
    setFilters: React.Dispatch<SetStateAction<Record<string, string>>>
}

const GameFilters = ({filters, setFilters}: IProps) => {
    const {fetchGamesList} = useActions();
    const {theme} = useTheme();

    return (
        <>
            <div>Фильтры:</div>
            <div>
                По жанру:
                <Select
                    allowClear
                    className={classNames(cls.select, {}, [theme])}
                    onChange={option => {
                        setFilters({...filters, genre: option})
                    }}
                    defaultValue={filters?.genre}
                    options={categories}
                />
            </div>
            <div>
                По платформе:
                <Select
                    allowClear
                    className={classNames(cls.select, {}, [theme])}
                    onChange={option => setFilters({...filters, platform: option})}
                    defaultValue={filters?.platform}
                    options={[
                        {value: "pc", label: "PC"},
                        {value: "browser", label: "Browser"}
                    ]}
                />
            </div>
            <div>
                Сортировка:
                <Select
                    allowClear

                    className={classNames(cls.select, {}, [theme])}
                    onChange={option => setFilters({...filters, sortBy: option})}
                    defaultValue={filters?.sortBy}
                    options={[
                        {value: "alphabetical", label: "По алфавитному порядку"},
                        {value: "release-date", label: "По дате релиза"},
                        {value: "popularity", label: "По популярности"},
                    ]}
                />
            </div>
            <ButtonUI type="button" onClick={() => fetchGamesList(filters)}>Применить</ButtonUI>
        </>
    );
};

export default GameFilters;