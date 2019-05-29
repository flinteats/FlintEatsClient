import React from 'react';
import { BackHandler, Button, Text, TextInput, StyleSheet, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import Permissions from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './style';
import MSU from '../msu';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const camera = require('../../res/camera.png');
const icon0 = require('../../res/add0.png');
const icon1 = require('../../res/add1.png');
const recipe = require('../../res/img_recipes.png');


export default class CreateRecipeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      recipeImg: null,
      ingredient: '',
      ingredientList: [],
      stepImg: null,
      stepInstructions: '',
      step: null,
      allSteps: [],
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
      MSU.post('/ugc/recipes/create', { market: this.props.navigation.state.params.target.id, text: this.state.text })
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
                  'Flint Eats was not granted Camera permissions - A.');
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
                  'Flint Eats was not granted Photo permissions - B.');
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
                        'Flint Eats was not granted Camera permissions - C.');
                    }
                  });
              } else {
                Alert.alert('Insufficient Permissions',
                  'Flint Eats was not granted Photo permissions - D.');
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
        let recipeImg = res.data;
        this.setState({ recipeImg });
      }
    });
  }



  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.domainContain}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        >
          {/* topNav */}
          <View style={styles.topNav}>
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.btntxt}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRight}
              >
              <Text style={styles.btntxt}>Save</Text>
            </TouchableOpacity>
          </View>

          {/* fullBody */}
          <View style={styles.fullBody}>
            {/* logoContain */}
            <View style={styles.logoContain}>
              <Image
                style={styles.pic}
                source={recipe}
                resizeMode='contain'
              />
            </View>
            {/* title */}
            <View style={styles.title}>
              <TextInput
                style={{
                  fontSize: 30, flex: 1,
                  textAlign: 'center',
                  width: deviceWidth,
                }}
                autoFocus={false}
                multiline={true}
                onChangeText={(title) => this.setState({ title })}
                placeholder='Name a recipe'
                returnKeyType={"next"} />
            </View>
          </View>

          {/* View 4 */}
          <View style={styles.view4}>
            <Text style={{ fontSize: 16, color: 'gray' }}>Step 1/5</Text>
          </View>

          {/* Progress bar */}
          <View style={styles.progressbar}>
            <LinearGradient
              style={styles.progress}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#ABE894', '#54E085']}></LinearGradient>
          </View>
          {/* <View style={{ flex: 1, maxHeight: 30, }} /> */}

          {/* View 5 */}
          <View style={styles.view5}>
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.btntxt}>Back</Text>
            </TouchableOpacity>
            {/* <View style={{ flex: 1 }} /> */}
            <TouchableOpacity
              style={styles.buttonRight}
              onPress={() => this.props.navigation.navigate('CreateRecipe2', {
                title: this.state.title
              })}>
              <Text style={styles.btntxt}>Next</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
