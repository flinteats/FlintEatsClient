import React from 'react';
import { BackHandler, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { Spinner } from 'native-base';

import FeedHeader from './feed-header';
import FeedList from './feed-list';

import MSU from '../msu';

const icon0 = require('../../res/feed0.png');
const icon1 = require('../../res/feed1.png');

export default class FeedScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Home');
      return true;
    });
  }

  static navigationOptions = ({navigation}) => ({
    header: null,
    tabBarLabel: 'Feed',
    tabBarIcon: ({focused}) => <Image
                                style={{width: 25, height: 25}}
                                source={focused
                                          ? icon1
                                          : icon0}
                             />,
  });

  render() {
    return (
      <View style={styles.container}>
        <FeedHeader navigation={this.props.navigation} />
        <View style={{flex: 1, marginTop:27}}>
          <FeedList feedKey={0} navigation={this.props.navigation} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
