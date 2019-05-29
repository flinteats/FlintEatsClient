import React from 'react';
import { BackHandler, Button, Text, TextInput, StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import Permissions from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import { Card, CardItem, Icon } from 'native-base';
import StarRating from 'react-native-star-rating';
import Autocomplete from 'react-native-autocomplete-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import MSU from '../msu';
import styles from './style';

const potatos = require('../../res/potatos.png');
const icon0 = require('../../res/add0.png');
const icon1 = require('../../res/add1.png');
const addPhoto = require('../../res/addAphoto.png');
const pin = require('../../res/pin0.png');


export default class ReviewFoodScreen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItem: '',
      uri: null,
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


  render() {
    const { navigation } = this.props;
    const food = navigation.getParam('foodItem', '');
    const uri = navigation.getParam('uri', '');
    const name = navigation.getParam('market', '');

    const Freshness = this.state.starCountFreshness;
    const Price = this.state.starCountPrice;
    const Quality = this.state.starCountQuality;


    return (
      <View style={styles.domainContain}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        >
          <ImageBackground
            style={styles.imgContainter}
            source={uri
              ? { uri: 'data:image/png;base64,' + uri }
              : potatos}>
            <View style={styles.topNav}>
              <TouchableOpacity
                style={styles.buttonLeft}
                onPress={() => this.props.navigation.navigate('Add')}>
                <Text style={styles.topbtntxt}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonRight}
                // onPress={() => this.props.navigation.navigate('ReviewFood3', {
                //   foodItem: food,
                //   uri: uri,
                //   market: name,
                //   FreshnessRating: Freshness,
                //   PriceRating: Price,
                //   QualityRating: Quality,
                // })}
                >
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

          <View style={styles.halfBody}>
            <View style={styles.title}>
              {food && name ? <Text style={styles.view2txt}>How did you like the {food} from {name}?</Text> : null}
              {food && !name ? <Text style={styles.view2txt}>How did you like the {food} from _______ ?</Text> : null}
              {name && !food ? <Text style={styles.view2txt}>How did you like the _______ from {name}?</Text> : null}
            </View>
            <View style={styles.rating}>
              <Text style={{ fontSize: 22, }}>Freshness</Text>
              <View style={{ width: 10 }} />
              <StarRating
                disabled={false}
                emptyStar={'star-o'}
                fullStar={'star'}
                iconSet={'FontAwesome'}
                rating={this.state.starCountFreshness}
                selectedStar={(rating) => this.onStarRatingPress(rating, 1)}
                fullStarColor={'orange'}
                emptyStarColor={'orange'}
                starSize={24}
              />
            </View>
            <View style={styles.rating}>
              <Text style={{ fontSize: 22, }}>Price</Text>
              <View style={{ width: 10 }} />
              <StarRating
                disabled={false}
                emptyStar={'star-o'}
                fullStar={'star'}
                iconSet={'FontAwesome'}
                rating={this.state.starCountPrice}
                selectedStar={(rating) => this.onStarRatingPress(rating, 2)}
                fullStarColor={'orange'}
                emptyStarColor={'orange'}
                starSize={24}
              />
            </View>
            <View style={styles.rating}>
              <Text style={{ fontSize: 22, }}>Quality</Text>
              <View style={{ width: 10 }} />
              <StarRating
                disabled={false}
                emptyStar={'star-o'}
                fullStar={'star'}
                iconSet={'FontAwesome'}
                rating={this.state.starCountQuality}
                selectedStar={(rating) => this.onStarRatingPress(rating, 3)}
                fullStarColor={'orange'}
                emptyStarColor={'orange'}
                starSize={24}
              />
            </View>
          </View>

          <View style={styles.view4}>
            <Text style={{ fontSize: 16, color: 'gray' }}>Step 2/3</Text>
          </View>
          <View style={styles.progressbar}>
            <LinearGradient
              style={{
                marginRight: '33%',
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
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('ReviewFood3', {
                foodItem: food,
                uri: uri,
                market: name,
                FreshnessRating: Freshness,
                PriceRating: Price,
                QualityRating: Quality,
              })}>
              <Text style={styles.btntxt}>Next</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>

      </View>
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
//     marginRight: '33%',
//     borderRadius: 10,
//     maxHeight: 14,
//     height: 14,
//   },
//   view5: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     maxHeight: 40,
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
//     flexWrap: 'wrap',
//     paddingLeft: 5,
//     paddingRight: 5,
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
// });
