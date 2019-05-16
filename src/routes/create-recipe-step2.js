import React from 'react';
import { BackHandler, Button, Text, TextInput, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import Permissions from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';

import MSU from '../msu';

const icon0 = require('../../res/add0.png');
const icon1 = require('../../res/add1.png');
const addPhoto = require('../../res/addAphoto.png');


export default class CreateRecipeScreen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      uri: null,
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
    const { navigation } = this.props;
    const title = navigation.getParam('title', '');
    return (
      <View style={{ flex: 1, }}>

        <View style={styles.view1}>
        <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('Add')}>
              <Text style={styles.btntxt}>Cancel</Text>
            </TouchableOpacity>
            <View style={{ flex: 1, }} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('CreateRecipe3', {
                title: title,
                uri: this.state.uri,
              })}>
              <Text style={styles.btntxt}>Save</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.view2}>
          <TouchableOpacity
            onPress={() => this.checkPermissions()}
            style={{ justifyContent: "center", alignItems: "center", }}>
            <Image
              style={styles.pic}
              source={this.state.uri
                ? { uri: 'data:image/png;base64,' + this.state.uri }
                : addPhoto}
            />
          </TouchableOpacity>
        </View>

        {/* <View style={styles.view3}>
          <View style={{
            width: '80%', textAlign: 'center', borderBottomWidth: 1,
            borderBottomColor: '#B8B8B8',
          }}>
            <TextInput
              style={{ fontSize: 30, flex: 1, textAlign: 'center', }}
              autoFocus={true}
              onChangeText={(text) => this.setState({ text })}
              onSubmitEditing={() => this.submit}
              placeholder='Name a recipe'
              returnKeyType={"next"} />
          </View>
        </View> */}

        <View style={styles.view4}>
          <Text style={{ fontSize: 16, color: 'gray' }}>Step 2/5</Text>
          {/* <Text style={{ fontSize: 16, color: 'gray' }}>{JSON.stringify(title)}</Text> */}
        </View>
        <View style={styles.progressbar}>
          <LinearGradient
            style={styles.progress}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#ABE894', '#54E085']}></LinearGradient>
        </View>
        <View style={{ flex: 1, maxHeight: 30, }} />
        <View style={styles.view5}>
        <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.btntxt}>Back</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('CreateRecipe3', {
                title: title,})}>
              <Text style={styles.btntxt}>Skip</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  view1: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 60,
    height: 60,
  },
  view2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    maxHeight: 200,
    height: 200,
    marginBottom: 100,
    marginTop: 25,
  },
  // view3: {
  //   flex: 1,
  //   maxHeight: 50,
  //   flexDirection: 'row',
  //   justifyContent: 'center',
  //   alignItems: 'stretch',
  //   marginBottom: 75,
  // },
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
    marginRight: '60%',
    borderRadius: 10,
    maxHeight: 14,
    height: 14,

  },
  view5: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 60,
    height: 60,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 30,
  },
  pic: {
    // width: 279,
    // height: 158,
    // try 2
    // width: 295,
    // height: 170,
    width: 350,
    height: 198,
  },
  button: {
    flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: 20,
  },
  btntxt: {
    color: '#00CE66',
    fontSize: 20,
    textAlign: 'center'
  }
});
