import React from 'react';
import { BackHandler, Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'native-base';

import MSU from '../msu';

export default class CreateRecipeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
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

  render() {
    return (
      <View>
        <TextInput
            autoFocus = {true}
            onChangeText = {(text) => this.setState({text})}
            onSubmitEditing = {() => this.submit}
            placeholder = 'Enter Recipe'
            returnKeyType = {"next"}
        />
        <Button
            title='Submit'
            onPress={this.submit}
        />
      </View>
    );
  }
}
