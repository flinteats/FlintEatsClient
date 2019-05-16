import React from 'react';
import { BackHandler, Dimensions, Image, Linking, Platform, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Card, Icon, Spinner } from 'native-base';

import MSU from '../msu';

const empty = require('../../res/camera.png');
const pin = require('../../res/pin1.png');
const clock = require('../../res/clock.png');
const deals = require('../../res/deals.png');
const phone = require('../../res/phone.png');
const website = require('../../res/website.png');

let curimage;

export default class MarketScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { deals: false };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.market.name}`
  });

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Main');
      return true;
    });

    /*
     * doing this in the list right now
        let id = this.props.navigation.state.params.market.id;
    
        MSU.get('/markets/' + id + '/deals')
          .then(res => {
            this.setState({deals: res});
          })
          .catch(err => {
            console.log('err: /markets/' + id + '/deals');
            console.log(err);
          });
    */
  }

  deals = () => {
    this.props.navigation.navigate('MarketDeals', {
      id: this.props.navigation.state.params.market.id,
      name: this.props.navigation.state.params.market.name
    });
  }

  openExternal = (url) => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (!supported) {
          console.log('Cannot open ' + url);
        } else {
          return Linking.openURL(url);
        }
      });
  }

  render() {
    let { market } = this.props.navigation.state.params;
    let { height, width } = Dimensions.get('window');
    if (!market) {
      return (
        <View>
          <Spinner />
        </View>
      );
    }
    let navPrefix = '';
    if (Platform.OS === 'android') {
      navPrefix = 'geo:0,0?q=';
    }
    if (Platform.OS === 'ios') {
      navPrefix = 'comgooglemaps://?q=';
    }

    if (market.image64) {
      curimage = <Image
        style={{ width: width, height: (height - 80) * (3 / 10) }}
        source={{ uri: 'data:image/png;base64,' + market.image64 }}
      />;
    } else {
      curimage = <Image
        source={empty} style={{width:100, height:100}}
      />;
    }
    //curimage = <View style={{backgroundColor:'red', width:'100%', height:'100%'}}/>

    return (
      <View style={{ flex: 1 }}>
        
        <View style={{ flex: 30, justifyContent:'center', alignItems:'center' }}>
          {/* <Image
            style={{ width: width, height: (height - 80) * (3 / 10) }}
            source={market.image64
              ? { uri: 'data:image/png;base64,' + market.image64 }
              : empty}
          /> */}
          {curimage}



        </View>

        {/* View for the Pin, Clock, Deals, Phone, and Website buttons */}
        <View style={{ flex: 70, justifyContent: 'space-between', flexDirection: 'column', marginBottom: '10%', margin: '7%' }}>
          <TouchableOpacity style={styles.row}
            onPress={() => this.openExternal(navPrefix + market.address.replace(/ /g, '+'))}>
            <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{ width: 30, height: 30 }}
                source={pin}
              />
            </View>
            <Text style={styles.text}>
              {market.address
                ? market.address
                : ''}
            </Text>
          </TouchableOpacity>
          <View style={styles.row}>
            <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{ width: 30, height: 30 }}
                source={clock}
              />
            </View>
            <Text style={styles.text}>
              {market.hours
                ? market.hours
                : ''}
            </Text>
          </View>
          <TouchableOpacity style={styles.row}
            onPress={() => this.deals()}>
            <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{ width: 30, height: 30 }}
                source={deals}
              />
            </View>
            <Text style={styles.text}>
              {market.dealsCount + ' deals found'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}
            onPress={() => this.openExternal('tel:' + market.phone)}>
            <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{ width: 30, height: 30 }}
                source={phone}
              />
            </View>
            <Text style={styles.text}>
              {market.phone
                ? market.phone
                : ''}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.row}
            onPress={() => this.openExternal('https://' + market.url)}>
            <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{ width: 30, height: 30 }}
                source={website}
              />
            </View>
            <Text style={styles.text}>
              {market.url
                ? market.url
                : ''}
            </Text>
          </TouchableOpacity>
          {false ?
            <View style={styles.row}>
              <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name='mail' />
              </View>
              <Text style={styles.text}>
                {market.email
                  ? market.email
                  : ''}
              </Text>
            </View>
            : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    margin: 5,
    padding: 3,
    justifyContent: 'center',

  },
  text: {
    alignSelf: 'center',
    flex: 90,
    marginLeft: 20
  }
});
