import React from 'react';
import { BackHandler, Button, Text, TextInput, StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import styles from './style';


export default class IngredientInput extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {

  }

  onTextChange = (text) => {

    this.props.changeText(text, this.props.id);
  }
  render() {
    return (
      <View style={styles.ingredient}>
        <View style={{
          width: '80%', textAlign: 'center', borderBottomWidth: 1,
          borderBottomColor: '#B8B8B8',
        }}>
          <TextInput
            style={{ fontSize: 20, flex: 1, minHeight:50, maxHeight:51, }}
            autoFocus={false}
            onChangeText={this.onTextChange}
            placeholder={'Enter Ingredient'}
            returnKeyType={"next"} />
        </View>
      </View>
    )
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
//     height: 52,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'stretch',
//     marginTop: 10,
//     backgroundColor:'#556b2f' //darkolivegreen (#556b2f)
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
