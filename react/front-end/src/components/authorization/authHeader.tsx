import favicon from "../../assets/img/favicon.png";

interface AuthHeaderParams {
  title: string;
}

/** Display header for the authentication pages
 *  @param {AuthHeaderParams} title - the title of this pages
 */
const AuthHeader = ({ title }: AuthHeaderParams) => {
  return (
    <div className="auth-header box">
      <h1 className="name">Bill-Split Management System</h1>
      <p className="page-name">{title}</p>
    </div>
  );
};

export default AuthHeader;
