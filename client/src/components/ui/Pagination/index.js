// Packages
import React from "react"
import { useNavigate } from "react-router-dom"

// Components
import PaginationButton from "../PaginationButton"

// Styles
import styles from "./Pagination.module.scss"

const Pagination = ({ currentPage, setCurrentPage, totalPages, pageLimit }) => {
    const navigate = useNavigate()

    // Pagination functions
    const nextPage = () => {
        setCurrentPage(currentPage + 1)
        navigate(`/apps/${currentPage + 1}`)
        window.scrollTo(0, 0)
    }

    const prevPage = () => {
        setCurrentPage(currentPage - 1)
        navigate(`/apps/${currentPage - 1}`)
        window.scrollTo(0, 0)
    }

    const changePage = e => {
        const pageNumber = Number(e.target.textContent)
        setCurrentPage(pageNumber)
        navigate(`/apps/${pageNumber}`)
        window.scrollTo(0, 0)
    }

    const getPaginationGroup = () => {
        let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit
        return new Array(pageLimit)
            .fill()
            .map((_, i) => start + i + 1)
            .filter(item => item <= totalPages)
    }

    return (
        <div className={styles.Container}>
            <PaginationButton
                onClick={prevPage}
                disabled={currentPage === 1 && true}
                prev
                aria-label="Go to previous page"
            />

            {getPaginationGroup()[0] !== 1 && (
                <>
                    <PaginationButton
                        number={1}
                        onClick={changePage}
                        aria-label="Go to page 1"
                    />
                    <PaginationButton more />
                </>
            )}

            {getPaginationGroup().map(item => (
                <PaginationButton
                    number={item}
                    key={item}
                    onClick={changePage}
                    active={currentPage === item && true}
                    aria-label={`Go to page ${item}`}
                />
            ))}

            {getPaginationGroup()[getPaginationGroup().length - 1] !==
                totalPages && (
                <>
                    <PaginationButton more />

                    <PaginationButton
                        number={totalPages}
                        onClick={changePage}
                        aria-label={`Go to page ${totalPages}`}
                    />
                </>
            )}

            <PaginationButton
                onClick={nextPage}
                next
                disabled={currentPage === totalPages && true}
                aria-label="Go to next page"
            />
        </div>
    )
}

export default Pagination
