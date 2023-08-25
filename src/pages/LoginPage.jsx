import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';

const LoginPage = () => {

  return (
    <div>
      <h1>Login Page</h1>
      <LoginSocialFacebook
      appId='614802087391122'
      onResolve={(response) => {
        console.log(response, 'response');
      }}
      onReject={(error) => {console.log(error, 'error');}}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>
    </div>
  );
};

export default LoginPage;
