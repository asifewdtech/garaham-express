
const LoginPage = () => {
  const responseFacebook = (response) => {
    console.log('login-response' , response)
  }

  const componentClicked = (data) => {
    console.log('user-data' , data);
  }
  return (
    <div>
      <h1>Login Page</h1>
      <FacebookLogin 
      appId="259412120318115"
      autoLoad={true}
      fields="name,email,picture"
      onClick={componentClicked}
      callback={responseFacebook}
      />
    </div>
  );
};

export default LoginPage;
