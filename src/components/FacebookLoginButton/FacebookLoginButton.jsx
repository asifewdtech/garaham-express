import { FacebookLogin } from 'react-facebook-login';

export const FacebookLoginButton = () => {
  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <FacebookLogin
      appId="202878742780794"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
    />
  );
};

export default FacebookLoginButton;
