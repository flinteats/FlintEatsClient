import React from 'react';
import { BackHandler, Button, Text, TextInput, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Permissions from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';

import MSU from '../msu';

const review = require('../../res/img_review.png');
const icon0 = require('../../res/add0.png');
const icon1 = require('../../res/add1.png');
const addPhoto = require('../../res/addAphoto.png');


export default class ReviewFoodScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      uri: null
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
      <View style={{ flex: 1, }}>

        <View style={styles.view1}>
          <Button
            title='Cancel'
            color='#00CE66'
            //onPress={() => this.props.navigation.navigate('Add')}
            onPress={() => this.props.navigation.goBack()}
          />
          <View style={{ flex: 1, }} />
          <Button
            title='Save'
            color='#00CE66'
            // Needs added functionality to save started recipe
            // REMOVES NAVIGATION BAR on return to Add screen!
            // MUST FIX!
            onPress={() => this.props.navigation.navigate('Add')}
          />
        </View>

        <View style={styles.view2}>
          <Image
            style={styles.pic}
            source={review}
          />
        </View>

        <View style={styles.view3}>
          <View style={{
            width: '80%', textAlign: 'center', borderBottomWidth: 1,
            borderBottomColor: '#B8B8B8',
          }}>
            <TextInput
              style={{ fontSize: 30, flex: 1, textAlign: 'center', }}
              autoFocus={true}
              onChangeText={(text) => this.setState({ text })}
              onSubmitEditing={() => this.submit}
              placeholder='Add an item'
              returnKeyType={"next"} />
          </View>
        </View>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
          <Image
            style={{ height: 140, width: 250, }}
            source={addPhoto}
          />
        </View>

        <View style={styles.view4}>
          <Text style={{ fontSize: 16, color: 'gray' }}>Step 1/3</Text>
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
  view1: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 40,
    marginRight: 15,
    marginLeft: 15,
    paddingTop: 10,
  },
  view2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    maxHeight: 200,
    height: 200,
  },
  view3: {
    flex: 1,
    maxHeight: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
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
    marginRight: 200,
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
  pic: {
    width: 140,
    height: 140,
    marginTop: 18,
  }
});
