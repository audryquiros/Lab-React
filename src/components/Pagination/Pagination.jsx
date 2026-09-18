import "./Pagination.css";

const Pagination = ({
    currentPage,
    hasNextPage,
    hasPreviousPage,
    onNext,
    onPrevious,
}) => {
    return (
        <div className="pagination">
            <button
                type="button"
                className="pagination__button"
                onClick={onPrevious}
                disabled={!hasPreviousPage}
            >
                <span>←</span>
                Previous
            </button>

            <div className="pagination__current">
                <span>Page</span>
                <strong>{currentPage}</strong>
            </div>

            <button
                type="button"
                className="pagination__button"
                onClick={onNext}
                disabled={!hasNextPage}
            >
                Next
                <span>→</span>
            </button>
        </div>
    );
};

export default Pagination;