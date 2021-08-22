import React from "react";
// import { GoogleLogin } from "react-google-login";
import { useGoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { refreshTokenSetup } from "./refreshToken";
import "./Login.css";

const clientId =
  "486736129260-11h11i0v3g3trc3dskg5vqsff0v2qn0s.apps.googleusercontent.com";
function Login() {
  const history = useHistory();

  const onSuccess = (res) => {
    const Username = res.profileObj.name;
    console.log("Login Success,Current User:", res.profileObj.name);
    localStorage.setItem("user-name", Username);
    history.push("/todo");
    refreshTokenSetup(res);
  };
  const onFailure = (res) => {
    console.log("login Failure", res);
  };
  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
  });
  return (
    <div className="login-main-div">
      <div className="login-container">
        <h2>Login</h2>
        <span>
          <button onClick={signIn} className="button">
            <img src="./googleicon.png" alt="loading" />
            <span className="button-text">Sign In with Google</span>
          </button>
        </span>
      </div>
    </div>
  );
}

export default Login;
export { clientId };
{
  /* <GoogleLogin
            clientId={clientId}
            buttonText="Login with Google"
            onSuccess={onLoginSuccess}
            onFailure={onLoginFailure}
            cookiePolicy={"single_host_origin"}
            style={{ color: "blue" }}
          /> */
}
