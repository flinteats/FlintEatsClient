import React from 'react';
import { BackHandler, Button, Text, TextInput, StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import Permissions from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import { Icon } from 'native-base';
import StarRating from 'react-native-star-rating';

import MSU from '../msu';

const potatos = require('../../res/potatos.png');
const icon0 = require('../../res/add0.png');
const icon1 = require('../../res/add1.png');
const addPhoto = require('../../res/addAphoto.png');
const pin = require('../../res/pin0.png');


export default class ReviewFoodScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
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
    if(x==1){
      this.setState({
        starCountFreshness: rating,
      });
    }else if(x==2){
      this.setState({
        starCountPrice: rating,
      });
    }else if(x==3){
      this.setState({
        starCountQuality: rating,
      });
    } else{}
    
  }


  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={{ flex: 1, }}>
        <ImageBackground source={potatos} style={styles.itemImg}>
          <View style={styles.view1}>
            <Button
              color='white'
              title='Cancel'
              //onPress={() => this.props.navigation.navigate('Add')}
              onPress={() => this.props.navigation.goBack()}
            />
            <View style={{ flex: 1, }} />
            <Button
              color='white'
              title='Save'
              // Needs added functionality to save started recipe
              // REMOVES NAVIGATION BAR on return to Add screen!
              // MUST FIX!
              onPress={() => this.props.navigation.navigate('Add')}
            />
          </View>
          <View style={styles.view2} />
          <View style={styles.view2}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: 'white' }}>Potato</Text>
          </View>
          <View style={styles.view2}>
            <Icon name='ios-pin' type='Ionicons' style={{ color: '#ffffff', fontSize: 24 }} />
            <Text style={{ fontSize: 24, color: 'white' }}> Kroger</Text>
          </View>
          <View style={styles.view2} />
        </ImageBackground>

        <View style={styles.view3}>
          <Text style={styles.title}>How did you like the potato from Kroger?</Text>
        </View>

        <View style={styles.rating}>
          <Text style={{ fontSize: 22 }}>Freshness</Text>
          <View style={{ width: 10 }} />
          <StarRating
            disabled={false}
            emptyStar={'star-o'}
            fullStar={'star'}
            iconSet={'FontAwesome'}
            rating={this.state.starCountFreshness} 
            selectedStar={(rating) => this.onStarRatingPress(rating,1)}
            fullStarColor={'orange'}
            emptyStarColor={'orange'}
            starSize={24}
          />
        </View>
        <View style={styles.rating}>
          <Text style={{ fontSize: 22 }}>Price</Text>
          <View style={{ width: 10 }} />
          <StarRating
            disabled={false}
            emptyStar={'star-o'}
            fullStar={'star'}
            iconSet={'FontAwesome'}
            rating={this.state.starCountPrice}
            selectedStar={(rating) => this.onStarRatingPress(rating,2)}
            fullStarColor={'orange'}
            emptyStarColor={'orange'}
            starSize={24}
          />
        </View>
        <View style={styles.rating}>
          <Text style={{ fontSize: 22 }}>Quality</Text>
          <View style={{ width: 10 }} />
          <StarRating
            disabled={false}
            emptyStar={'star-o'}
            fullStar={'star'}
            iconSet={'FontAwesome'}
            rating={this.state.starCountQuality}
            selectedStar={(rating) => this.onStarRatingPress(rating,3)}
            fullStarColor={'orange'}
            emptyStarColor={'orange'}
            starSize={24}
          />
        </View>



        <View style={styles.view4}>
          <Text style={{ fontSize: 16, color: 'gray' }}>Step 2/3</Text>
        </View>
        <View style={styles.progressbar}>
          <LinearGradient
            style={styles.progress}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#ABE894', '#54E085']}></LinearGradient>
        </View>
        <View style={{ flex: 1, maxHeight: 10, }} />
        <View style={styles.view5}>
          <Button
            title='Next'
            color='#00CE66'
            onPress={() => this.props.navigation.navigate('ReviewFood2')}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  itemImg: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 15,
    maxHeight: 200,
    height: 200,
  },
  view1: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 30,
  },
  view2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    maxHeight: 40,
    height: 40,
  },
  view3: {
    flex: 1,
    maxHeight: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  view4: {
    flex: 1,
    maxHeight: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressbar: {
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#D2D2D2',
    borderRadius: 10,
    maxHeight: 14,
    height: 14,
  },
  progress: {
    marginRight: 90,
    borderRadius: 10,
    maxHeight: 14,
    height: 14,
  },
  view5: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    maxHeight: 40,
    marginLeft: 30,
    marginRight: 30,
  },
  Pic: {
    width: 140,
    height: 140,
    marginTop: 18,
  },
  pin: {
    height: 30,
    width: 30,
  },
  rating: {
    flex: 1,
    maxHeight: 35,
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    color: 'gray',
    flexWrap: 'wrap'
  },
});
