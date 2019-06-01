import React from 'react';
import { BackHandler, Button, Text, TextInput, StyleSheet, TouchableOpacity, View, Image, ImageBackground, Dimensions, } from 'react-native';
import Permissions from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import { Card, CardItem, Icon } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import MSU from '../msu';
import styles from './style';

const potatos = require('../../res/potatos.png');
const icon0 = require('../../res/add0.png');
const icon1 = require('../../res/add1.png');
const addPhoto = require('../../res/addAphoto.png');
const pin = require('../../res/pin0.png');

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;


export default class ReviewFoodScreen3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItem: '',
      uri: null,
      market: null,
      text: '',
      starCountFreshness: 0,
      starCountPrice: 0,
      starCountQuality: 0,
    };
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Home');
      return true;
    });
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarLabel: 'Feed',
    tabBarIcon: ({ focused }) => <Image
      style={{ width: 25, height: 25 }}
      source={focused
        ? icon1
        : icon0}
    />,
  });


  /**
    static navigationOptions = ({ navigation }) => ({
      title: `New deal at ${navigation.state.params.target.name}`
    });
  
    submit = () => {
      MSU.post('/ugc/deals/create', { market: this.props.navigation.state.params.target.id, text: this.state.text })
        .then(res => {
          this.props.navigation.navigate('Main');
        })
        .catch(err => {
          console.log(err);
        });
    };
    */
  checkPermissions() {
    let allow = true;
    Permissions.checkMultiple(['camera', 'photo'])
      .then(res => {
        if (res.camera == 'authorized'
          && res.photo == 'authorized') {
          this.setPic();
        } else if (res.camera != 'authorized'
          && res.photo == 'authorized') {
          Permissions.request('camera')
            .then(rez => {
              if (rez == 'authorized') {
                this.setPic();
              } else {
                Alert.alert('Insufficient Permissions',
                  'Flint Eats was not granted Camera permissions.');
              }
            });
        } else if (res.photo != 'authorized'
          && res.camera == 'authorized') {
          Permissions.request('photo')
            .then(rez => {
              if (rez == 'authorized') {
                this.setPic();
              } else {
                Alert.alert('Insufficient Permissions',
                  'Flint Eats was not granted Photo permissions.');
              }
            });
        } else {
          Permissions.request('photo')
            .then(rez => {
              if (rez == 'authorized') {
                Permissions.request('camera')
                  .then(rex => {
                    if (rex == 'authorized') {
                      this.setPic();
                    } else {
                      Alert.alert('Insufficient Permissions',
                        'Flint Eats was not granted Camera permissions.');
                    }
                  });
              } else {
                Alert.alert('Insufficient Permissions',
                  'Flint Eats was not granted Photo permissions.');
              }
            });
        }
      });
  }

  setPic() {
    let options = {};
    ImagePicker.showImagePicker(options, (res) => {
      if (res.didCancel) {
        console.log('User cancelled image Picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
      } else {
        let uri = res.data;
        this.setState({ uri });
      }
    });
  }


  onStarRatingPress(rating, x) {
    if (x == 1) {
      this.setState({
        starCountFreshness: rating,
      });
    } else if (x == 2) {
      this.setState({
        starCountPrice: rating,
      });
    } else if (x == 3) {
      this.setState({
        starCountQuality: rating,
      });
    } else { }

  }

  submit = () => {
    this.props.navigation.setParams({ submitting: true });
    let food = navigation.getParam('foodItem', '');
    let foodImg = navigation.getParam('uri', '');
    let market = navigation.getParam('market', '');
    let Freshness = navigation.getParam('FreshnessRating', '');
    let Price = navigation.getParam('PriceRating', '');
    let Quality = navigation.getParam('QualityRating', '');
    let comments = this.state.text;

    MSU.post('/ugc/foodReview/create', // is this the right location for food review?
      {
        Food: food,
        Image: foodImg,
        Market: market,
        FreshnessRating: Freshness,
        PriceRating: Price,
        QualityRating: Quality,
        Comments: comments,
      })
      .then(res => {
        this.props.navigation.navigate('Feed');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error Submitting Food Reivew', err);
        this.props.navigation.setParams({ submitting: false });
      });
  };


  render() {
    const { navigation } = this.props;
    const food = navigation.getParam('foodItem', '');
    const uri = navigation.getParam('uri', '');
    const name = navigation.getParam('market', '');

    const Freshness = navigation.getParam('FreshnessRating', '');
    const Price = navigation.getParam('PriceRating', '');
    const Quality = navigation.getParam('QualityRating', '');

    text = this.state.text;


    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
      >
        <View style={{ flex: 1, }}>
          <ImageBackground source={uri
            ? { uri: 'data:image/png;base64,' + uri }
            : potatos} style={styles.imgContainter}>
            <View style={styles.topNav}>
              <TouchableOpacity
                style={styles.buttonLeft}
                onPress={() => this.props.navigation.navigate('Add')}>
                <Text style={styles.topbtntxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonRight}
                onPress={() => this.props.navigation.navigate('CreateRecipe4')}>
                <Text style={styles.topbtntxt}>Save</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.view2} />
            <View style={styles.view2}>
              <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>{food}</Text>
            </View>

            <View style={styles.view2}>
              <Icon name='ios-pin' type='Ionicons' style={{ color: '#ffffff', fontSize: 24 }} />
              <Text style={{ fontSize: 24, color: 'white' }}> {name}</Text>
            </View>
            <View style={styles.view2} />
          </ImageBackground>

          <View style={styles.quarterBody}>
            <View style={styles.card}>
              <TextInput style={{ padding: 10 }}
                onChangeText={(text) => this.setState({ text })}
                placeholder={'Any other thoughts...?'}
                multiline={true} />
            </View>
          </View>


          <View style={styles.view4}>
            <Text style={{ fontSize: 16, color: 'gray' }}>Step 3/3</Text>
          </View>
          <View style={styles.progressbar}>
            <LinearGradient
              style={{
                marginRight: '0%',
                borderRadius: 10,
                maxHeight: 14,
                height: 14,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#ABE894', '#54E085']}></LinearGradient>
          </View>
          <View style={{ flex: 1, maxHeight: 10, }} />
          <View style={styles.view5}>
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            marginLeft: 30,
            marginRight: 30,
            maxHeight: 60,
          }}>
            <TouchableOpacity
              style={styles.submitButton}
              // onPress={() => params.submit()}
              onPress={() => this.props.navigation.navigate('Feed')}
            >
              <Text style={{ color: '#00CE66', fontSize: 24, textAlign: 'center' }}>Send your review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}


// const styles = StyleSheet.create({
//   itemImg: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     paddingLeft: 15,
//     paddingRight: 15,
//     marginBottom: 15,
//     maxHeight: 200,
//     height: 200,
//   },
//   view1: {
//     flex: 1,
//     flexDirection: 'row',
//     height: 60,
//     maxHeight: 60,
//   },
//   view2: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     maxHeight: 40,
//     height: 40,
//   },
//   view3: {
//     flex: 1,
//     maxHeight: 50,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 24,
//   },
//   view4: {
//     flex: 1,
//     maxHeight: 30,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   progressbar: {
//     marginTop: 0,
//     paddingTop: 0,
//     paddingBottom: 0,
//     marginLeft: 30,
//     marginRight: 30,
//     backgroundColor: '#D2D2D2',
//     borderRadius: 10,
//     maxHeight: 14,
//     height: 14,
//   },
//   progress: {
//     marginRight: '0%',
//     borderRadius: 10,
//     maxHeight: 14,
//     height: 14,
//   },
//   view5: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     minHeight: 30,
//     marginLeft: 30,
//     marginRight: 30,
//   },
//   Pic: {
//     width: 140,
//     height: 140,
//     marginTop: 18,
//   },
//   pin: {
//     height: 30,
//     width: 30,
//   },
//   rating: {
//     flex: 1,
//     maxHeight: 35,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 18,
//     color: 'gray',
//     flexWrap: 'wrap'
//   },
//   button: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//   },
//   btntxt: {
//     color: '#00CE66',
//     fontSize: 20,
//     textAlign: 'center'
//   },
//   topbtntxt: {
//     color: 'white',
//     fontSize: 20,
//     textAlign: 'center'
//   },
//   card: {
//     height: deviceHeight * .25,
//     marginLeft: 10,
//     marginRight: 10,
//     marginBottom: 10,
//     borderColor: null,
//     borderWidth: 0,
//     backgroundColor: '#fcfcfc',
//   },
//   submitBtn: {
//     alignItems: 'center',
//     padding: 10,
//     color: '#00CE66',
//     backgroundColor: null,
//     borderRadius: 40,
//     borderColor: '#00CE66',
//     borderWidth: 3,
//     maxHeight: 80,
//     paddingLeft: 20,
//     paddingRight: 20,
//     width: deviceWidth * .75,
//   }
// });
