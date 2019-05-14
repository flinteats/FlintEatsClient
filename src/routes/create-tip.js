import React from 'react';
import { Alert, BackHandler, Button, Image, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { Card, CardItem, Icon, Spinner } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Permissions from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';
import LinearGradient from 'react-native-linear-gradient';
import Autocomplete from 'react-native-autocomplete-input';

import MSU from '../msu';

const camera = require('../../res/camera.png');

let imageJSX;
let tagsCardItem;

export default class CreateTipScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      tagResults: [],
      tagText: '',
      text: '',
      uri: null
    };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: `New Tip`,
      headerRight: (
        <View style={{ marginRight: 5 }}>
          {params.submitting
            ? <Spinner />
            : <Button
              color='#00CE66'
              title='Submit'
              onPress={() => params.submit()}
            />
          }
        </View>
      )
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Main');
      return true;
    });
    this.props.navigation.setParams({ submit: this.submit });
  }

  tagScan = (q) => {
    this.setState({ tagText: q });
    MSU.get('/tags/search', { q })
      .then(res => {
        this.setState({ tagResults: res });
      })
      .catch(err => {
        console.log(err);
      });
  }

  addTag = (tag) => {
    // only add if not already added
    if (this.state.tags.indexOf(tag) < 0
      && tag.name.length > 0) {
      this.setState({ tags: this.state.tags.concat([tag]), tagText: '', tagResults: [] });
    }
  }

  removeTag = (tag) => {
    let tags = this.state.tags;
    tags = tags.filter(e => e !== tag);
    this.setState({ tags });
  }


  submit = () => {
    this.props.navigation.setParams({ submitting: true });
    let tagNames = []
    this.state.tags.forEach(tag => tagNames.push(tag.name));
    MSU.post('/ugc/tips/create',
      {
        image: this.state.uri,
        text: this.state.text,
        tags: tagNames
      })
      .then(res => {
        this.props.navigation.navigate('Feed');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error Submitting Tip', err);
        this.props.navigation.setParams({ submitting: false });
      });
  };

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
    let tags = [];
    this.state.tags.forEach(tag => {
      tags.push(
        <LinearGradient
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          colors={['#ABE894', '#54E085']}
          style = {{borderRadius:20, margin:2}}>
          <TouchableOpacity
            key={tag.id}
            style={{ }}
            onPress={() => this.removeTag(tag)}>
            <Text style={{ textAlign: 'center', color:'white', padding:2 }}>
              {' #' + tag.name + '  '}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      );
    });

    if(tags.length == 0){
      tagsCardItem = <View />
    }else{
      tagsCardItem = <CardItem style = {{flexWrap:'wrap'}}>{tags}</CardItem>
    }

    if(this.state.uri){
      imageJSX = <Image style={{height:125, width:200}} source = {{ uri: 'data:image/png;base64,' + this.state.uri }}></Image>
    }else{
      imageJSX = <Image style={styles.pic} source = {camera}></Image>
    }

    console.log(this.state.uri);
    return (
      <KeyboardAwareScrollView
        style={styles.container}
        keyboardShouldPersistTaps='always'
      >
        <View style={{ flex: 20 }} />
        <Card style={{ flex: 40 }}>
          <View style={{ flex: 20, alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity
              onPress={() => this.checkPermissions()}>
              {/* <Image
                style={styles.pic}
                source={this.state.uri
                  ? { uri: 'data:image/png;base64,' + this.state.uri }
                  : camera}
              /> */}
              {imageJSX}
            </TouchableOpacity>
          </View>
          <TextInput
            style={{textAlign:'center', fontSize:19, color: 'black'}}
           
            onChangeText={(text) => this.setState({ text })}
            onSubmitEditing={() => this.submit}
            multiline={true}
            numberOfLines={5}
            placeholder="What is the tip?"
          />
        </Card>
        <Card style={{ flex: 20 }}>
          {/* <CardItem style={{flexWrap:'wrap'}}>
            {tags}
          </CardItem> */}
          {tagsCardItem}
          
          <CardItem>
            <Autocomplete style={styles.autocompleteContainer}
              autoCapitalize='none'
              data={this.state.tagResults}
              value={this.state.tagText}
              onChangeText={(text) => this.tagScan(text)}
              onSubmitEditing={() => this.addTag({ name: this.state.tagText.toLowerCase(), id: this.state.tags.length })}
              placeholder='Tags'
              renderItem={(data) => (
                <TouchableOpacity
                  onPress={() => this.addTag(data)}>
                  <Text>{data.name}</Text>
                </TouchableOpacity>
              )}
            />
          </CardItem>
        </Card>
        <View style={{ flex: 20 }} />
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    //    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  pic: {
    margin: 16,
    width: 56,
    height: 56,
  }
});
