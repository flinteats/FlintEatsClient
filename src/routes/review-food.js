import React from 'react';
import { BackHandler, Button, Text, TextInput, StyleSheet, TouchableOpacity, View, Image, ScrollView } from 'react-native';
import Permissions from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import { Card, CardItem, Icon } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import MSU from '../msu';
import styles from './style';

const review = require('../../res/img_review.png');
const icon0 = require('../../res/add0.png');
const icon1 = require('../../res/add1.png');
const addPhoto = require('../../res/addAphoto.png');
//const pin = require('../../res/icon_location.png');


export default class ReviewFoodScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      foodItem: '',
      uri: null,
      text: '',
      market: null,
      marketResults: [],
      marketText: '',
      draw: 0,
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

  marketScan = (q) => {
    let draw = this.state.draw + 1;
    this.setState({ marketText: q, draw });
    MSU.get('/markets/search', { draw, q })
      .then(res => {
        this.setState({ marketResults: res });
      })
      .catch(err => {
        console.log(err);
      });
  }
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
        console.log('User cancelled image picker');
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



  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={false}
        keyboardShouldPersistTaps='always'
      >
        <View style={styles.topNav}>
          <TouchableOpacity
            style={styles.buttonLeft}
            onPress={() => this.props.navigation.navigate('Add')}>
            <Text style={styles.btntxt}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonRight}
          // onPress={() => this.props.navigation.navigate('ReviewFood2', {
          //   foodItem: this.state.foodItem,
          //   uri: this.state.uri,
          //   market: this.state.marketText,
          // })}
          >
            <Text style={styles.btntxt}>Save</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.fullBody}>

          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={true}
            keyboardShouldPersistTaps='always'
          >
            <View style={styles.logoContain}>
              <Image
                style={styles.pic}
                source={review}
                resizeMode='contain'
              />
            </View>

            <View style={styles.title}>
              <View style={{
                width: '80%', borderBottomWidth: 1,
                borderBottomColor: '#B8B8B8',
              }}>
                <TextInput
                  style={{ textAlign: 'center', fontSize: 28, minHeight: 40 }}
                  autoFocus={true}
                  onChangeText={(foodItem) => this.setState({ foodItem })}
                  placeholder='Add an item'
                  returnKeyType={"next"} />
              </View>
            </View>

            {/* <View style={styles.location}>
              <View style={{ height: 42, width: '20%', justifyContent: 'center', alignItems: "center", marginLeft: 5, }}>
                <Icon name='ios-pin' type='Ionicons' style={{ color: '#00CE66', fontSize: 24 }} />
              </View>

              <View style={styles.autocompleteContain}>
                <Autocomplete
                  containerStyle={styles.autocomplete}
                  style={{ height: '100%', fontSize: 18 }}
                  inputContainerStyle={{ borderWidth: 0, borderColor: null, }}
                  listContainerStyle={{ borderWidth: 0, borderColor: null, }}
                  listStyle={{ borderWidth: 0, borderColor: null, }}

                  data={this.state.marketResults}
                  value={this.state.marketText}
                  listUpwards={true}
                  onChangeText={(text) => this.marketScan(text)}
                  placeholder='Location'
                  renderItem={(data) => (
                    <TouchableOpacity
                      onPress={() => this.setState({ market: { id: data.id }, marketText: data.name, marketResults: [] })}>

                      <Text style={{ fontSize: 18 }}>{data.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View> */}

            <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Icon name='ios-pin' type='Ionicons' style={{ color: '#00CE66', fontSize: 24 }} />
              </View>
              <Card style={{ flex: 90 }}>
                <Autocomplete style={styles.autocompleteContainer}
                  style={{ height: 40 }}
                  inputContainerStyle={{ borderWidth: 0, borderColor: null, backgroundColor: '#F5FCFF', }}
                  listContainerStyle={{ borderWidth: 0, borderColor: null, backgroundColor: '#F5FCFF', }}
                  listStyle={{ borderWidth: 0, borderColor: null, backgroundColor: '#F5FCFF', }}

                  data={this.state.marketResults}
                  value={this.state.marketText}
                  listUpwards={true}
                  onChangeText={(text) => this.marketScan(text)}
                  placeholder='Location'
                  renderItem={(data) => (
                    <TouchableOpacity
                      onPress={() => this.setState({ market: { id: data.id }, marketText: data.name, marketResults: [] })}>
                      <Text>{data.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </Card>
            </View>

            <View style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              height: 200,
            }}>
              <TouchableOpacity
                onPress={() => this.checkPermissions()}
                style={{ justifyContent: "center", alignItems: "center", }}>
                <Image
                  style={styles.smallAddPhoto}
                  source={this.state.uri
                    ? { uri: 'data:image/png;base64,' + this.state.uri }
                    : addPhoto}
                  resizeMode='contain'
                />
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </View>

        {/* view 4 */}
        <View style={styles.view4}>
          <Text style={{ fontSize: 16, color: 'gray' }}>Step 1/3</Text>
        </View>
        <View style={styles.progressbar}>
          <LinearGradient
            style={{
              marginRight: '66%',
              borderRadius: 10,
              maxHeight: 14,
              height: 14,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#ABE894', '#54E085']}></LinearGradient>
        </View>
        <View style={{ flex: 1, maxHeight: 10, }} />

        {/* view 5 */}
        <View style={styles.view5}>
          <TouchableOpacity
            style={styles.button}

            onPress={() => this.props.navigation.navigate('ReviewFood2', {
              foodItem: this.state.foodItem,
              uri: this.state.uri,
              market: this.state.marketText,
            })}>
            <Text style={styles.btntxt}>Next</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}


// const styles = StyleSheet.create({
//   view1: {
//     flex: 1,
//     flexDirection: 'row',
//     maxHeight: 60,
//     height: 60,

//   },
//   view2: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     maxHeight: 80,
//     height: 80,


//   },
//   view3: {
//     flex: 1,
//     height: 50,
//     minHeight: 50,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   location: {
//     flex: 1,
//     flexDirection: 'row',
//     left: 0,
//     right: 0,
//     minHeight: 120,
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
//     marginRight: '66%',
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
//   pic: {
//     width: 350,
//     height: 199,
//     marginBottom: 18,
//     marginTop: 18,
//   },
//   button: {
//     flex: 1,
//     flexDirection: 'column',
//     justifyContent: 'center',
//     marginTop: 20,
//   },
//   btntxt: {
//     color: '#00CE66',
//     fontSize: 20,
//     textAlign: 'center'
//   },
//   autocompleteContainer: {
//     flex: 1,
//     left: 0,
//     position: 'absolute',
//     right: 0,
//     top: 0,
//     zIndex: 1,
//   },
// });
