import React from 'react';
import { BackHandler, Button, Text, TextInput, StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Card, CardItem, } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';

import MSU from '../msu';

const icon0 = require('../../res/add0.png');
const icon1 = require('../../res/add1.png');
const turkey = require('../../res/turkey.png');
const addPhoto = require('../../res/addAphoto.png');
const recipe = require('../../res/img_recipes.png');


export default class CreateRecipeScreen5 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      uri: null,
      //ingredientList: [{ key: 0, ingredName: '' }],
      //allSteps: [{ key: 0, instructions: '', stepImg: null }],
      countVal: 1,
      tags: [],
      tagResults: [],
      tagText: '',
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
    // this.setState(function (state, props) {
    //   let newValue;
    //   if (state.allSteps) {
    //     newValue = state.allSteps.concat({ key: state.countVal, instructions: '', stepImg: null });
    //   } else {
    //     newValue = [{ key: 0, instructions: '', stepImg: null }];
    //   }
    //   return {
    //     allSteps: newValue,
    //     countVal: state.countVal + 1
    //   };
    // });
  }

  onIngredientTextChange = (text, id) => {
    this.setState(function (state) {
      let newSteps;
      newSteps = state.allSteps.slice();
      newSteps[id].instructions = text;
      return {
        allSteps: newSteps
      }
    })
  }
  render() {
    let tags = [];
    this.state.tags.forEach(tag => {
      tags.push(
        <TouchableOpacity
          key={tag.id}
          style={styles.tag}
          onPress={() => this.removeTag(tag)}>
          <LinearGradient
            style={styles.tag}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={['#ABE894', '#54E085']}>
            <Text style={{ textAlign: 'center' }}>
              {'  ' + tag.name + '  '}
            </Text>
          </LinearGradient>

        </TouchableOpacity>
      );
    });
    const { navigation } = this.props;
    const uri = navigation.getParam('uri', '');
    const title = navigation.getParam('title', '');
    let ingredientList = navigation.getParam('ingredientList', '');
    let stepView = null;
    if (this.state.allSteps) {
      //console.warn(this.state.allSteps);

      stepView = this.state.allSteps.map(step => {
        //console.warn('number is '+step.key);
        return (
          <StepInput key={step.key} id={step.key} changeText={this.onIngredientTextChange} img={step.stepImg} />
          // passing image: image={step.img} 
        );
      })
    }

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
                  title: title,
                  uri: uri,
                  ingredientList: ingredientList,
                  allSteps: this.state.allSteps,
                })}>
                <Text style={styles.topbtntxt}>Save</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1, height: 100, maxHeight: 100, }} />
          </ImageBackground>
        </View>


        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={true}
        >
          <View style={styles.view2}>
            <Text style={styles.view2txt}>Add instruction steps</Text>
          </View>
          <View style={styles.step}>
            <Card style={{ flex: 30, height: 140, backgroundColor: '#F8F8F8' }}>
              <CardItem>
                {tags}
              </CardItem>
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
          </View>

          {/* step 3/5 */}
          <View style={styles.view4}>
            <Text style={{ fontSize: 16, color: 'gray' }}>Step 5/5: The last step!</Text>
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
          {/* <View style={{ flex: 1, maxHeight: 30, }} /> */}

          {/*  */}
          <View style={styles.view5}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.goBack()}>
              <Text style={styles.btntxt}>Back</Text>
            </TouchableOpacity>
            <View style={{ flex: 2,}} />
            {/* <TouchableOpacity
              style={styles.button}
              onPress={() => this.props.navigation.navigate('CreateRecipe4')}>
              <Text style={styles.btntxt}>Skip</Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.view3}>
            <TouchableOpacity
              style={styles.Button}
              onPress={this.onPress}>
              <Text style={{ color: '#00CE66', paddingBottom:10, fontSize:24, textAlign: 'center' }}>Send your recipe</Text>
            </TouchableOpacity>
          </View>
          {/* Testing that the ingredient list was passed from recipe step 3 */}
          {/* <View>{ingredientList.map(ingredientList =><Text>{ingredientList.ingredName}</Text>)}</View> */}
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
    maxHeight: 250,
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
  },
  view3: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    //maxHeight: 50,
    marginTop: 30,
    paddingBottom: 10,
  },
  Button: {
    alignItems: 'center',
    padding: 10,
    color: '#00CE66',
    backgroundColor: null,
    borderRadius: 40,
    borderColor: '#00CE66',
    borderWidth: 3,
    maxHeight: 80,
    paddingLeft: 20,
    paddingRight: 20,
  },
  view4: {
    flex: 1,
    maxHeight: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressbar: {
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: '#D2D2D2',
    borderRadius: 10,
    maxHeight: 14,
    height: 14,
  },
  progress: {
    marginRight: '0%',
    borderRadius: 10,
    maxHeight: 14,
    height: 14,
  },
  tag: {
    borderRadius: 20, 
    height:25,
    minHeight:25,
    marginRight:5,
  },
  view5: {
    flex: 1,
    flexDirection: 'row',
    maxHeight: 40,
    height: 40,
    marginLeft: 30,
    marginRight: 30,
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
  },
  topbtntxt: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
});
