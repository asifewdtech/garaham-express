import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import { useState } from 'react';
import axios from 'axios';
import axiosInstance from '@/components/utils/Utils';
// import { useRouter } from 'next/router';


const LoginPage = () => {
  const [profile, setProfile] = useState(null);
  // console.log(profile);

  const [video_url, setInputValue] = useState('');
  

  const handleSubmit = async (e) => {
    console.log(e)
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      
      const response = await axiosInstance.post(``,formData);
      console.log('Server response:', response.data);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  function objectToFormData(obj) {
    const formData = new FormData();
    for (const key in obj) {
      formData.append(key, obj[key]);
    }
    return formData;
  }

  return <>
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='video_url'
          value={video_url}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {!profile ? <LoginSocialFacebook
      appId='614802087391122'
      onResolve={(response) => {
        console.log(response, 'response');
        // setProfile(response.data);
        const finalData = {name: response.data.name,userName: response.data.name, email: response.data.email, id: response.data.id, access_token: response.data.accessToken, resource:"facebook",facebookInstagramCallback:"set"}
        console.log(finalData, 'finaldata');
        const formData = objectToFormData(finalData);
        try {
          axiosInstance.post('', formData)
          .then(function (response) {
            console.log(response);
          })
        } catch (error) {
          console.log('error', error);
        }
      }}
      onReject={(error) => {console.log(error, 'error');}}
      >
        <FacebookLoginButton />
      </LoginSocialFacebook>: ''}

      {profile ? <div>
        <h2>{profile.name}</h2>
        <img src={profile.picture.data.url} />
      </div> : ''}
    </div>
    </>
};

export default LoginPage;
