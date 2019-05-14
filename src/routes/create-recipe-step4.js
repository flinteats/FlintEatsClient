import React from 'react';
import { BackHandler, Button, Text, TextInput, StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import MSU from '../msu';

const icon0 = require('../../res/add0.png');
const icon1 = require('../../res/add1.png');
const turkey = require('../../res/turkey.png');
const addPhoto = require('../../res/addAphoto.png');


export default class CreateRecipeScreen4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      uri: null,
      uriStep: null,
      ingredient: '',
      ingredientList: [],
      stepImg: null,
      stepInstructions: '',
      step: null,
      allSteps: [],
      countVal: 0,
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

  onPress = () => {
    this.setState({
      countVal: this.state.countVal + 1
    })
  }


  render() {
    const { navigation } = this.props;
    const count = this.state.countVal;
    const uri = navigation.getParam('uri', '');
    const title = navigation.getParam('title', '');
    return (
      <View style={{ flex: 1, }}>
        {/* recipe image */}
        <View style={styles.imgContainter}>
          <ImageBackground source={uri
            ? { uri: 'data:image/png;base64,' + uri }
            : turkey} style={styles.recipeImg}>

            <View style={styles.view1}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.goBack()}>
                <Text style={styles.topbtntxt}>Cancel</Text>
              </TouchableOpacity>
              <View style={{ flex: 1, }} />
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.props.navigation.navigate('CreateRecipe4', {
                  title: this.state.title,
                  uri: this.state.uri,
                })}>
                <Text style={styles.topbtntxt}>Save</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, height: 100, maxHeight:100,}} />
          </ImageBackground>
        </View>


        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <View style={styles.view2}>
            <Text style={styles.view2txt}>Add ingredients to {JSON.stringify(title)}</Text>
          </View>

          {/* Start of the ingredients list */}
          <View style={styles.ingredient}>
            <View style={{
              width: '80%', textAlign: 'center', borderBottomWidth: 1,
              borderBottomColor: '#B8B8B8',
            }}>
              <TextInput
                style={{ fontSize: 20, flex: 1, }}
                autoFocus={false}
                onChangeText={(text) => this.setState({ text })}
                onSubmitEditing={() => this.submit}
                placeholder='Ingredient 1, amount, and units'
                returnKeyType={"next"} />
            </View>
          </View>
          {count >= 1 ? <View style={styles.ingredient}>
            <View style={{
              width: '80%', textAlign: 'center', borderBottomWidth: 1,
              borderBottomColor: '#B8B8B8',
            }}>
              <TextInput
                style={{ fontSize: 20, flex: 1, }}
                autoFocus={false}
                onChangeText={(text) => this.setState({ text })}
                onSubmitEditing={() => this.submit}
                placeholder='Ingredient 2, amount, and units'
                returnKeyType={"next"} />
            </View>
          </View> : null}
          {count >= 2 ? <View style={styles.ingredient}>
            <View style={{
              width: '80%', textAlign: 'center', borderBottomWidth: 1,
              borderBottomColor: '#B8B8B8',
            }}>
              <TextInput
                style={{ fontSize: 20, flex: 1, }}
                autoFocus={false}
                onChangeText={(text) => this.setState({ text })}
                onSubmitEditing={() => this.submit}
                placeholder='Ingredient 3, amount, and units'
                returnKeyType={"next"} />
            </View>
          </View> : null}
          {count >= 3 ? <View style={styles.ingredient}>
            <View style={{
              width: '80%', textAlign: 'center', borderBottomWidth: 1,
              borderBottomColor: '#B8B8B8',
            }}>
              <TextInput
                style={{ fontSize: 20, flex: 1, }}
                autoFocus={false}
                onChangeText={(text) => this.setState({ text })}
                onSubmitEditing={() => this.submit}
                placeholder='Ingredient 4, amount, and units'
                returnKeyType={"next"} />
            </View>
          </View> : null}
          {count >= 4 ? <View style={styles.ingredient}>
            <View style={{
              width: '80%', textAlign: 'center', borderBottomWidth: 1,
              borderBottomColor: '#B8B8B8',
            }}>
              <TextInput
                style={{ fontSize: 20, flex: 1, }}
                autoFocus={false}
                onChangeText={(text) => this.setState({ text })}
                onSubmitEditing={() => this.submit}
                placeholder='Ingredient 5, amount, and units'
                returnKeyType={"next"} />
            </View>
          </View> : null}
          {/* End of ingredients list */}

          {/* Add more Button */}
          <View style={styles.view3}>
            <TouchableOpacity
              style={styles.Button}
              onPress={this.onPress}>
              <Text style={{ color: '#00CE66' }}>Add more</Text>
            </TouchableOpacity>
          </View>

          {/* step 3/5 */}
          <View style={styles.view4}>
            <Text style={{ fontSize: 16, color: 'gray' }}>Step 4/5: Almost done!</Text>
          </View>

          {/* progress bar */}
          <View style={styles.progressbar}>
            <LinearGradient
              style={styles.progress}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#ABE894', '#54E085']}></LinearGradient>
          </View>

          {/* space */}
          <View style={{ flex: 1, maxHeight: 30, }} />

          {/*  */}
          <View style={styles.view5}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.btntxt}>Back</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('CreateRecipe4')}>
              <Text style={styles.btntxt}>Skip</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  imgContainter: {
    height: 260,
    maxHeight: 260,
  },
  recipeImg: {
    flex: 1,
    flexDirection: 'column',
    height: 250,
    maxHeight:250,
    width: '100%',
  },
  view1: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    maxHeight: 60,
  },
  view2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    maxHeight: 30,

  },
  view2txt: {
    fontSize: 20,
    color: '#565656'
  },
  ingredient: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginTop: 10,
    backgroundColor: 'orange',
  },
  view3: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 40,
    marginTop: 30,
  },
  Button: {
    alignItems: 'center',
    padding: 10,
    color: '#00CE66',
    backgroundColor: null,
    borderRadius: 20,
    marginLeft: 30,
    borderColor: '#00CE66',
    borderWidth: 3,
    maxHeight: 40,
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
    marginRight: '20%',
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
    width: 375,
    height: 220,
  },
  button: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  btntxt: {
    color: '#00CE66',
    fontSize: 20,
    textAlign: 'center'
  },
  topbtntxt: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
});
