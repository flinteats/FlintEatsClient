import React from 'react';
import { BackHandler, Image, StyleSheet, View } from 'react-native';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import { actions } from '../actions/index';

import MSU from '../msu';
import ProfileHeader from './profile-header';
import FeedList from './feed-list';

const icon0 = require('../../res/me0.png')
const icon1 = require('../../res/me1.png')

// me.js is specifically the local user (the owner of the apps) profile display.

class MeScreenView extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarLabel: 'Me',
    tabBarIcon: ({ focused }) => <Image
      style={{ width: 25, height: 25 }}
      source={focused
        ? icon1
        : icon0}
    />,
  });

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Home');
      return true;
    });
  }

  render() {
    return (
      <View style={styles.container}>
        
        <ProfileHeader
          navigation={this.props.navigation}
        />
        <View style={{ flex: 1, marginTop:25 }}>
          <FeedList
            feedKey={this.props.me.id}
            user={this.props.me}
            navigation={this.props.navigation}
          />
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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

const mapStateToProps = (state) => ({
  me: state.eats.me
});

const mapDispatchToProps = {
};

const MeScreen = connect(mapStateToProps, mapDispatchToProps)(MeScreenView);
export default MeScreen;
