// Packages
import React from "react"

// Components
import Input from "../forms/Input"
import Select from "../forms/Select"
import Button from "../ui/Button"

// Styles
import styles from "./Search.module.scss"

const Search = props => {
    return (
        <aside className={styles.Container}>
            <Input
                label="Search by app name"
                id="searchName"
                onChange={props.searchName}
                value={props.valueSearchName}
            />

            {props.authors && props.authors.length > 1 && (
                <Select
                    label="Filter by author's name"
                    id="searchAuthor"
                    onChange={props.searchAuthor}
                    value={props.valueSearchAuthor}
                >
                    <option value="all">All</option>

                    {props.authors.map((author, i) => (
                        <option value={author} key={i}>
                            {author}
                        </option>
                    ))}
                </Select>
            )}

            {props.langs.length > 1 && (
                <Select
                    label="Filter by language"
                    id="searchLang"
                    onChange={props.searchLang}
                    value={props.valueSearchLang}
                >
                    <option value="all">All</option>

                    {props.langs.map((lang, i) => (
                        <option value={lang} key={i}>
                            {lang}
                        </option>
                    ))}
                </Select>
            )}

            <Button variant="primary" onClick={props.handleReset}>Reset filters</Button>
        </aside>
    )
}

export default Search
