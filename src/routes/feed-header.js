import React from 'react';
import { Image, Keyboard, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon, Left, Right } from 'native-base';
import { connect } from 'react-redux';
import { actions } from '../actions/index';
import LinearGradient from 'react-native-linear-gradient';

import MSU from '../msu';

const deal0 = require('../../res/deal0.png');
const deal1 = require('../../res/deal1.png');
const tip0 = require('../../res/tip0.png');
const tip1 = require('../../res/tip1.png');
const recipe0 = require('../../res/recipe0.png');
const recipe1 = require('../../res/recipe1.png');
const review0 = require('../../res/review0.png');
const review1 = require('../../res/review1.png');

const buttonsmalldiameter = 45;
const buttonbigdiameter = 50;

class FeedHeaderView extends React.Component {
  constructor(props) {
    super(props);
  }

  clear = () => {
    this.props.setQueryText('');
    this.props.setQuery('');
  }

  search = (q) => {
    Keyboard.dismiss();
    this.props.setQuery(q);
  }

  render() {
    return (
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={['#ABE894', '#54E085']}
        style={{height:80}}>

        {/* The following view is the container for the entire search bar */}
        <View style={styles.searchBar}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Left style={{ alignItems:'center' }}>
              {/* Search icon and button */}
              <TouchableOpacity style={{ marginLeft:5, alignItems:'center' }}
                onPress={() => this.search(this.props.queryText)}>
                <Icon name='search' />
              </TouchableOpacity>
            </Left>
            <TextInput style={{flex:6, fontSize:12 }}
              onChangeText={(text) => this.props.setQueryText(text)}
              onSubmitEditing={() => this.search(this.props.queryText)}
              placeholder={'Search'}
              value={this.props.queryText}
            />
            <Right style={{flex:1, marginRight:9}}>
              {/* Cancel search button and icon */}
              <TouchableOpacity style={{ }}
                onPress={() => this.clear()}>
                <Icon style={{  }} name='close' />
              </TouchableOpacity>
            </Right>
          </View>
        </View>
        
        {/* This view is the tips, deals, reviews, and recipes buttons */}
        <View style={styles.buttonContainer}>

          <TouchableOpacity accessibilityLabel='tips' onPress={() => this.props.setFocus('tip')}>

            {this.props.focus == 'tip' ?
              <View style={styles.buttonWrapperView}>
                <Image style={styles.bigButton} source={tip1} />
              </View>
              :
              <View style={styles.buttonWrapperView}>
                <Image style={styles.smallButton} source={tip0} />
              </View>
            }

          </TouchableOpacity>

          <TouchableOpacity accessibilityLabel='deals' onPress={() => this.props.setFocus('deal')}>

            {this.props.focus == 'deal' ?
              <View style={styles.buttonWrapperView}>
                <Image style={styles.bigButton} source={deal1} />
              </View>
              :
              <View style={styles.buttonWrapperView}>
                <Image style={styles.smallButton} source={deal0} />
              </View>
            }

          </TouchableOpacity>

          <TouchableOpacity accessibilityLabel='reviews' onPress={() => this.props.setFocus('review')}>

            {this.props.focus == 'review' ?
              <View style={styles.buttonWrapperView}>
                <Image style={styles.bigButton} source={review1} />
              </View>
              :
              <View style={styles.buttonWrapperView}>
                <Image style={styles.smallButton} source={review0} />
              </View>
            }

          </TouchableOpacity>

          <TouchableOpacity accessibilityLabel='recipes' onPress={() => this.props.setFocus('recipe')}>

            {this.props.focus == 'recipe' ?
              <View style={styles.buttonWrapperView}>
                <Image style={styles.bigButton} source={recipe1} />
              </View>
              :
              <View style={styles.buttonWrapperView}>
                <Image style={styles.smallButton} source={recipe0} />
              </View>
            }

          </TouchableOpacity>

        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00CE66',
    height: 95
  },
  searchBar: {
    backgroundColor: '#FFF',
    alignItems: 'center',
    margin: 10,
    borderRadius: 50,
    height: 35,
    width: '95%',
    justifyContent: 'flex-start',
    alignSelf: 'center'
  },
  buttonContainer: {
    position: 'absolute',
    top:55,
    left:0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: buttonbigdiameter,
  },
  buttonWrapperView: {
    height: buttonbigdiameter, 
    width: buttonbigdiameter, 
    justifyContent:'center', 
    alignItems:'center'
  },
  bigButton: {
    height: buttonbigdiameter,
    width: buttonbigdiameter,
    justifyContent: 'center',
    alignItems:'center'
  },
  smallButton: {
    height: buttonsmalldiameter,
    width: buttonsmalldiameter,
    justifyContent: 'center',
    alignItems:'center'
  },
  button: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    backgroundColor: '#FFF',
    borderRadius: 40,
  }
});

const mapStateToProps = (state) => ({
  focus: state.eats.focus,
  query: state.eats.query,
  queryText: state.eats.queryText
});

const mapDispatchToProps = {
  setFocus: actions.setFocus,
  setQuery: actions.setQuery,
  setQueryText: actions.setQueryText
};

const FeedHeader = connect(mapStateToProps, mapDispatchToProps)(FeedHeaderView);
export default FeedHeader;
