import React from 'react';
import { Alert, BackHandler, Button, Image, StyleSheet, TouchableOpacity, Text, TextInput, View } from 'react-native';
import { Card, CardItem, Icon, Spinner } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Permissions from 'react-native-permissions';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import Autocomplete from 'react-native-autocomplete-input';
import DatePicker from 'react-native-datepicker';


import moment from 'moment';
import MSU from '../msu';
import styles from './style';

const camera = require('../../res/camera.png');

let tagsCardItem;


export default class CreateDealScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      draw: 0,
      market: null,
      marketResults: [],
      marketText: '',
      price: '',
      tags: [],
      tagResults: [],
      tagText: '',
      text: '',
      title: '',
      uri: null
    };
  }

  // static navigationOptions = ({ navigation }) => {
  //   const { params = {} } = navigation.state;
  //   return {
  //     title: `New Deal`,
  //     headerRight: (
  //       <View style={{ marginRight: 5 }}>
  //         {params.submitting
  //           ? <Spinner />
  //           : <Button
  //             color='#00CE66'
  //             title='Submit'
  //             onPress={() => params.submit()}
  //           />
  //         }
  //       </View>
  //     )
  //   };
  // }





  static navigationOptions = ({ navigation }) => {


    return {
      header: null,
      tabBarLabel: 'new deal',
    }
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Main');
      return true;
    });
    this.setState({
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD')
    });
    this.props.navigation.setParams({ submit: this.submit });

    // Permission trial - tag
  }

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
    if (!this.state.market) {
      Alert.alert('Market Not Selected');
      return;
    }
    this.props.navigation.setParams({ submitting: true });
    let startMoment = moment(this.state.startDate).valueOf();
    let endMoment = moment(this.state.endDate).valueOf();
    let tags = [];
    this.state.tags.forEach(tag => tags.push(tag.name));
    MSU.post('/ugc/deals/create',
      {
        startDate: startMoment,
        endDate: endMoment,
        image: this.state.uri,
        title: this.state.title,
        price: this.state.price,
        market: this.state.market,
        text: this.state.text,
        tags: tags
      })
      .then(res => {
        this.props.navigation.navigate('Feed');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Error Submitting Deal', err);
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
          // Request not working
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
        <TouchableOpacity
          key={tag.id}
          style={{ paddingBottom: 2, paddingRight: 4 }}
          onPress={() => this.removeTag(tag)}>
          <LinearGradient
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            colors={['#ABE894', '#54E085']}
            style={{ borderRadius: 20 }}>
            <Text style={{ textAlign: 'center' }}>
              {'  ' + tag.name + '  '}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    });

    var params = this.props.navigation.state;
 
    if (tags.length == 0) {
      tagsCardItem = <View />
    } else {
      tagsCardItem = <CardItem style={{ flexWrap: 'wrap' }}>{tags}</CardItem>
    }

    let productimage;
    if (this.state.uri) {
      productimage = <Image style={styles.smallAddPhoto} source={{ uri: 'data:image/png;base64,' + this.state.uri }} />
    } else {
      productimage = <Image style={styles.dealImage} source={camera} />
    }

    // Tom's version of create deal. Use the other return for the original.
    return (<KeyboardAwareScrollView keyboardShouldPersistTaps='always'>

      {/* topNav */}
      <View style={styles.topNav}>
        <TouchableOpacity
          style={styles.buttonLeft}
          onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.btntxt}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonRight}
          onPress={() => 
            this.submit()
          }
        >
          <Text style={styles.btntxt}>Save</Text>
        </TouchableOpacity>
      </View>
      {/* Image, product name, and comments card */}
      <View style={styles.dealImageContain}>
        <TouchableOpacity
          onPress={() => this.checkPermissions()}
        // onPress={() => this._alertForPhotosPermission()}
        >
          {productimage}
        </TouchableOpacity>
      </View>

      <Card>
        <View style={styles.dealImageContain}>

          <TextInput
            style={{ flex: 1, width: '95%', textAlign: 'center', fontSize: 20 }}
            onChangeText={(title) => this.setState({ title })}
            defaultValue={this.state.title}
            placeholder='Product'
          />

          <View style={{ backgroundColor: 'lightgray', height: 1, width: '90%' }} />

          <TextInput
            style={{ flex: 3, width: '95%', textAlign: 'center' }}
            onChangeText={(text) => this.setState({ text })}
            onSubmitEditing={() => this.submit}
            multiline={true}
            defaultValue={this.state.text}
            placeholder='Other comments'
          />
        </View>
      </Card>


      <Card style={{ padding: 5 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='calendar' />
          </View>
          <Card style={{ flex: 40, alignItems: 'center', justifyContent: 'center' }}>
            <DatePicker
              style={{ height: 40 }}
              date={this.state.startDate}
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              showIcon={false}
              onDateChange={(startDate) => this.setState({ startDate })}
            />
          </Card>
          <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='remove' />
          </View>
          <Card style={{ flex: 40, alignItems: 'center', justifyContent: 'center' }}>
            <DatePicker
              style={{ height: 40 }}
              date={this.state.endDate}
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              showIcon={false}
              onDateChange={(endDate) => this.setState({ endDate })}
            />
          </Card>
        </View>


        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='logo-usd' />
          </View>
          <Card style={{ flex: 90 }}>
            <TextInput
              style={{ height: 40 }}
              onChangeText={(price) => this.setState({ price })}
              defaultValue={this.state.price}
              placeholder='Price'
            />
          </Card>
        </View>


        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 10, alignItems: 'center', justifyContent: 'center' }}>
            <Icon name='pin' />
          </View>
          <Card style={{ flex: 90 }}>
            <Autocomplete style={styles.autocompleteContainer}
              style={{ height: 40 }}
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
      </Card>


      <Card>
        {/* <CardItem>
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

    </KeyboardAwareScrollView>);
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
//   autocompleteContainer: {
//     flex: 1,
//     left: 0,
//     //    position: 'absolute',
//     right: 0,
//     top: 0,
//     zIndex: 1
//   },
//   pic: {
//     width: 80,
//     height: 80,
//   }
// });
