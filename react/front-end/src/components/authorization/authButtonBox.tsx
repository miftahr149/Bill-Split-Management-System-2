interface AuthButtonBoxParams {
  msg: string;
  onClick: () => void;
  disabled?: boolean;
  children?: JSX.Element | JSX.Element[];
}

/** Provide the button for the authentication features 
 * @param {AuthButtonBoxParams} msg - the message displayed in the button
 * @param {AuthButtonBoxParams} onClick - the function that will be called if the button is clicked
 * @param {AuthButtonBoxParams} disabled - the button can't be click if true otherwise false
 * @param {AuthButtonBoxParams} children - for adding another component inside of this box
 */
const AuthButtonBox = ({
  msg,
  onClick,
  disabled,
  children,
}: AuthButtonBoxParams) => {
  return (
    <div className="button-box flex-grow-1">
      <div className="d-flex flex-center">
        <button
          type="submit"
          className="flex-grow-1 btn btn-success"
          value="Register"
          onClick={onClick}
          disabled={disabled}
        >
          {msg}
        </button>
      </div>
      <div className="d-flex flex-center">{children}</div>
    </div>
  );
};

export default AuthButtonBox;
