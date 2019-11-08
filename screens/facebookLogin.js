import React, {Component} from 'react';
import {View, Button} from 'react-native';
import {
  LoginButton,
  AccessToken,
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk';
class FacebookLogin extends Component {
  getUser(token, userId) {
    //let url = `https://graph.facebook.com/${userId}?fields=id,email,name&access_token=${token}`;
    let req = new GraphRequest(
      '/' + userId,
      {
        httpMethod: 'GET',
        parameters: {
          fields: {
            string: 'email,name,id',
          },
        },
      },
      (err, resp) => {
        console.log(resp);
      },
    );
    new GraphRequestManager().addRequest(req).start();
  }

  render() {
    return (
      <View>
        <Button
          title="Inicie sesión"
          onPress={() => {
            LoginManager.logInWithPermissions(['public_profile', 'email']).then(
              result => {
                if (result.isCancelled) {
                  alert('Login cancelled');
                } else {
                  AccessToken.getCurrentAccessToken().then(data => {
                    this.getUser(data.accessToken.toString(), data.userID);
                  });
                }
              },
              error => {
                alert('Login fail with error: ' + error);
              },
            );
          }}
        />
        <LoginButton
          publishPermissions={['publish_actions']}
          readPermissions={['public_profile']}
          onLoginFinished={(error, result) => {
            if (error) {
              alert('Login failed with error: ' + error.message);
            } else if (result.isCancelled) {
              alert('Login was cancelled');
            } else {
              alert(
                'Login was successful with permissions: ' +
                  result.grantedPermissions,
              );
              AccessToken.getCurrentAccessToken().then(data => {
                //console.log(data);
              });
            }
          }}
          onLogoutFinished={() => alert('User logged out')}
        />
      </View>
    );
  }
}
export default FacebookLogin;
