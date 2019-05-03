import React from 'react';
import { BackHandler, Image, StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';

import MSU from '../msu';
import ProfileHeader from './profile-header';
import FeedList from './feed-list';

const icon0 = require('../../res/me0.png')
const icon1 = require('../../res/me1.png')

//profile.js is the view for any user that is not the local user(user with account in app)

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showUserContent: true, focus: null };
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
  });

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Main');
      return true;
    });
  }

  showUserContent = (showUserContent) => {
    const { user } = this.props.navigation.state.params;
    this.setState({showUserContent});
    this.feedList.refresh(user.id + '/' + showUserContent);
  }

  focus = (focus) => {
    this.setState({focus});
    this.feedList.focus(focus);
  }

  render() {
    const { user } = this.props.navigation.state.params;
    return (
      <View style={{flex: 1}}>
        
        <ProfileHeader
            user={user}
            navigation={this.props.navigation}
        />
        
        <View style={{flex: 1, marginTop:25}}>
          <FeedList
              feedKey={user.id}
              user={user}
              navigation={this.props.navigation}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#00CE66'
  },
  button: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 40,
  }
});
