import RestClient from 'react-native-rest-client';
import * as Keychain from 'react-native-keychain';
import { Alert } from 'react-native';
const base64 = require('base-64');
 
class Msu extends RestClient {
  constructor() {
    // old dev
//    super('https://flinteats.etshost.com:8443/eats');


    // umflint dev server
    super('http://141.216.22.12:8080/eats');
    // prod
    // super('https://flinteats.cas.msu.edu/eats');
  }

  async get(path, params = null) {
    return await this.GET(path, params);
  }

  async post(path, params = null) {
    return await this.POST(path, params);
  }

  async put(path, params = null) {
    return await this.PUT(path, params);
  }

  async checkForCredentials() {
    return await Keychain.getGenericPassword()
      .then(async (creds) => {
        if (!creds) {
          return creds;
        }
        return await this.login(creds.username, creds.password, true)
          .then(res => {
            return res;
          })
          .catch(res => {
            console.log(res);
            Alert.alert('Login Failed', 'Please check your credentials and try again.');
          });
      })
      .catch(err => console.log(err));
  }

  async clearCredentials() {
    Keychain.resetGenericPassword()
      .then(() => console.log('Stored credentials cleared'));
  }

  async login(username, password, auto = false) {
    this.headers['Authorization'] = 'Basic ' + base64.encode(username.toLowerCase() + ':' + password);

    console.log(this.headers);
    return await this.GET('/users/me')
      .then(res => {
        if (!auto) {
          Keychain.setGenericPassword(username.toLowerCase(), password)
            .then(() => console.log('Credentials saved'))
            .catch(err => console.log(err));
        }
        return res;
      })
      .catch(res => {
        console.log(res);

        this.headers['Authorization'] = null;
        Alert.alert('Login Failed', 'Please check your credentials and try again.');
      });
  }

  async signup(user) {
    this.headers['Authorization'] = null;
    return await this.clearCredentials()
      .then(() =>
        this.post('/auth/create', user)
          .then((res) => res));
  }
}

const MSU = new Msu();
export default MSU;
