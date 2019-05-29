import React from 'react';
import { BackHandler, Button, Text, TextInput, StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import IngredientInput from './ingredient-input';

import MSU from '../msu';
import styles from './style';

const icon0 = require('../../res/add0.png');
const icon1 = require('../../res/add1.png');
const turkey = require('../../res/turkey.png');
const addPhoto = require('../../res/addAphoto.png');
const recipe = require('../../res/img_recipes.png');


export default class CreateRecipeScreen3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      uri: null,
      ingredient: '',
      ingredientList: [{ key: 0, ingredName: '' }],
      countVal: 1,
    };
    this.onIngredientTextChange = this.onIngredientTextChange.bind(this);
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
    // Correct
    this.setState(function (state, props) {
      let newValue;
      if (state.ingredientList) {
        newValue = state.ingredientList.concat({ key: state.countVal, ingredName: '' });
      } else {
        newValue = [{ key: 0, ingredName: '' }];
      }
      return {
        ingredientList: newValue,
        countVal: state.countVal + 1
      };
    });
  }

  onIngredientTextChange = (text, id) => {
    this.setState(function (state) {
      let newIngredients;
      newIngredients = state.ingredientList.slice();
      newIngredients[id].ingredName = text;
      return {
        ingredientList: newIngredients
      }
    })
  }
  render() {
    const { navigation } = this.props;
    const uri = navigation.getParam('uri', '');
    const title = navigation.getParam('title', '');
    let ingredientView = null;
    if (this.state.ingredientList) {
      //console.warn(this.state.ingredientList);

      ingredientView = this.state.ingredientList.map(step => {
        //console.warn('number is '+step.key);
        return (
          <IngredientInput key={step.key} id={step.key} changeText={this.onIngredientTextChange} />

        );
      })
    }

    return (
      <View style={styles.domainContain}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
        >
          {/* recipe image */}
          <View style={styles.imgContainter}>
            <ImageBackground source={uri
              ? { uri: 'data:image/png;base64,' + uri }
              : turkey} style={styles.recipeImg}>

              <View style={styles.topNav}>
                <TouchableOpacity
                  style={styles.buttonLeft}
                  onPress={() => this.props.navigation.navigate('Add')}>
                  <Text style={styles.topbtntxt}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonRight}
                  >
                  <Text style={styles.topbtntxt}>Save</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>

          <View style={styles.halfBody}>
            <KeyboardAwareScrollView
              resetScrollToCoords={{ x: 0, y: 0 }}
              scrollEnabled={true}
            >
              <View style={styles.view2}>
                <Text style={styles.view2txt}>Add ingredients to {title}</Text>
              </View>

              {ingredientView}

              {/* Add more Button */}
              <View style={styles.view3}>
                <TouchableOpacity
                  style={styles.Button}
                  onPress={this.onPress}>
                  <Text style={{ color: '#00CE66' }}>Add more</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
          </View>
          {/* half body end */}

          {/* step 3/5 */}
          <View style={styles.view4}>
            <Text style={{ fontSize: 16, color: 'gray' }}>Step 3/5</Text>
          </View>

          {/* progress bar */}
          <View style={styles.progressbar}>
            <LinearGradient
              style={{
                marginRight: '40%',
                borderRadius: 10,
                maxHeight: 14,
                height: 14,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={['#ABE894', '#54E085']}></LinearGradient>
          </View>

          {/* view 5 */}
          <View style={styles.view5}>
            <TouchableOpacity
              style={styles.buttonLeft}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.btntxt}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonRight}
              onPress={() => this.props.navigation.navigate('CreateRecipe4', {
                title: title,
                uri: uri,
                ingredientList: this.state.ingredientList,
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
//   imgContainter: {
//     height: 260,
//     maxHeight: 260,
//   },
//   recipeImg: {
//     flex: 1,
//     flexDirection: 'column',
//     height: 250,
//     maxHeight: 250,
//     width: '100%',
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
//     marginBottom: 10,
//     maxHeight: 30,

//   },
//   view2txt: {
//     fontSize: 20,
//     color: '#565656'
//   },
//   ingredient: {
//     flex: 1,
//     height: 40,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'stretch',
//     marginTop: 10,
//   },
//   view3: {
//     flex: 1,
//     flexDirection: 'row',
//     maxHeight: 40,
//     marginTop: 30,
//   },
//   Button: {
//     alignItems: 'center',
//     padding: 10,
//     color: '#00CE66',
//     backgroundColor: null,
//     borderRadius: 20,
//     marginLeft: 30,
//     borderColor: '#00CE66',
//     borderWidth: 3,
//     maxHeight: 40,
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
//     marginRight: '40%',
//     borderRadius: 10,
//     maxHeight: 14,
//     height: 14,

//   },
//   view5: {
//     flex: 1,
//     flexDirection: 'row',
//     maxHeight: 60,
//     height: 60,
//     marginLeft: 30,
//     marginRight: 30,
//     marginTop: 30,
//   },
//   pic: {
//     width: 375,
//     height: 220,
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
