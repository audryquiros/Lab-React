import "./ErrorMessage.css";

const ErrorMessage = ({ message }) => {
    return (
        <div className="error-message">
            <div className="error-message__icon">
                !
            </div>

            <div className="error-message__content">
                <span className="error-message__label">
                    Something went wrong
                </span>

                <p>{message}</p>
            </div>
        </div>
    );
};

export default ErrorMessage;