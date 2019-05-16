import React from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Icon, Left, Right, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { actions } from '../actions/index';
import LinearGradient from 'react-native-linear-gradient';
import Permissions from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';

import MSU from '../msu';

const profile = require('../../res/me00.png');
const deal0 = require('../../res/deal0.png');
const deal1 = require('../../res/deal1.png');
const tip0 = require('../../res/tip0.png');
const tip1 = require('../../res/tip1.png');
const recipe0 = require('../../res/recipe0.png');
const recipe1 = require('../../res/recipe1.png');
const review0 = require('../../res/review0.png');
const review1 = require('../../res/review1.png');

const buttonsmallwidth = 45;
const buttonsmallheight = 45;
const buttonbigwidth = 50;
const buttonbigheight = 50;


class ProfileHeaderView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { uri: false };
  }

  checkPermissions(isMe) {
    if (!isMe) {
      // don't allow change of other profile pics!
      return;
    }
    let allow = true;
    Permissions.checkMultiple(['camera', 'photo'])
      .then(res => {
        if (res.camera == 'authorized'
          && res.photo == 'authorized') {
          this.changePic();
        } else if (res.camera != 'authorized'
          && res.photo == 'authorized') {
          Permissions.request('camera')
            .then(rez => {
              if (rez == 'authorized') {
                this.changePic();
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
                this.changePic();
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
                      this.changePic();
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

  changePic() {
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
        let av = {};
        av[this.props.me.id] = uri;
        this.props.mergeAvatars(av);
        MSU.put('/users/me/avatar', uri.replace(/\n/g, ''))
          //                .then(() => navigate('Me', {uri}))
          .catch(err => console.log(err));
      }
    });
  }

  render() {

    let isMe = false;
    let user = this.props.user;
    if (!user || user == this.props.me) {
      user = this.props.me;
      isMe = true;
    }

    const { navigate, state } = this.props.navigation;
    return (
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={['#ABE894', '#54E085']}>
        <View style={styles.infoContainer}>
          
          <View style={styles.innerInfoContainer}>
            <Left>
              {isMe ? null :
                <TouchableOpacity
                  accessibilityLabel='back'
                  onPress={() => this.props.navigation.goBack()}>
                  <Icon name='arrow-back' />
                </TouchableOpacity>
              }
              {false ?
                <TouchableOpacity
                  accessibilityLabel='badges'
                  onPress={null}>
                  <Icon name='trophy' />
                </TouchableOpacity>
                : null}
            </Left>
            <Text style={{ backgroundColor: 'transparent', fontWeight: 'bold' }}>
              {user
                ? user.username
                : '. . .'}
            </Text>
            <Right>
              {isMe
                ? <TouchableOpacity
                  accessibilityLabel='settings'
                  onPress={() => navigate('Settings')}>
                  <Icon style={{ backgroundColor: 'transparent' }} name='settings' />
                </TouchableOpacity>
                : null}
            </Right>
          </View>
          <View style={styles.innerInfoContainer}>
            <TouchableOpacity
              accessibilityLabel='followers'
              style={styles.follow}
              onPress={() => navigate('Follow', { target: user, dir: 'ers', isMe })}>
              <Text style={{ backgroundColor: 'transparent', textAlign: 'center' }}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel={isMe ? 'my profile picture' : user.username + '\'s profile picture'}
              onPress={() => this.checkPermissions(isMe)}>
              <Image
                style={styles.pic}
                source={user && this.props.avatars[user.id]
                  ? { uri: 'data:image/png;base64,' + this.props.avatars[user.id] }
                  : profile}
              />
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel='following'
              style={styles.follow}
              onPress={() => navigate('Follow', { target: user, dir: 'ees', isMe })}>
              <Text style={{ backgroundColor: 'transparent', textAlign: 'center' }}>Following</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.innerInfoContainer}>
            <View />
            <TouchableOpacity
              accessibilityLabel={isMe ? 'my posts' : 'user posts'}
              style={{
                margin: 3, width: 85, height: 20, borderRadius: 20,
                backgroundColor: this.props.faveMode ? '#B0BEC5' : '#FF6F00'
              }}
              onPress={() => this.props.setFaveMode(false)}>
              <Text style={{ backgroundColor: 'transparent', textAlign: 'center' }}>{isMe ? 'My' : 'User'} Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              accessibilityLabel={isMe ? 'my favorites' : 'user favorites'}
              style={{
                margin: 3, width: 85, height: 20, borderRadius: 20,
                backgroundColor: this.props.faveMode ? '#FF6F00' : '#B0BEC5'
              }}
              onPress={() => this.props.setFaveMode(true)}>
              <Text style={{ backgroundColor: 'transparent', textAlign: 'center' }}>Favorites</Text>
            </TouchableOpacity>
            <View />
          </View>
        </View>


        {/* This view is the tips, deals, reviews, and recipes buttons */}
        <View style={styles.buttonContainer}>

          <TouchableOpacity accessibilityLabel='tips' onPress={() => this.props.setFocus('tip')}>

            {this.props.focus == 'tip' ?
              <View style={{ height: buttonbigheight, width: buttonbigwidth, justifyContent:'center', alignItems:'center' }}>
                <Image style={{ height: buttonbigheight, width: buttonbigwidth }} source={tip1} />
              </View>
              :
              <View style={{ height: buttonbigheight, width: buttonbigwidth, justifyContent:'center', alignItems:'center' }}>
                <Image style={{ height: buttonsmallheight, width: buttonsmallwidth }} source={tip0} />
              </View>
            }

          </TouchableOpacity>

          <TouchableOpacity accessibilityLabel='deals' onPress={() => this.props.setFocus('deal')}>

            {this.props.focus == 'deal' ?
              <View style={{ height: buttonbigheight, width: buttonbigwidth, justifyContent:'center', alignItems:'center' }}>
                <Image style={{ height: buttonbigheight, width: buttonbigwidth }} source={deal1} />
              </View>
              :
              <View style={{ height: buttonbigheight, width: buttonbigwidth, justifyContent:'center', alignItems:'center' }}>
                <Image style={{ height: buttonsmallheight, width: buttonsmallwidth }} source={deal0} />
              </View>
            }

          </TouchableOpacity>

          <TouchableOpacity accessibilityLabel='reviews' onPress={() => this.props.setFocus('review')}>

            {this.props.focus == 'review' ?
              <View style={{ height: buttonbigheight, width: buttonbigwidth, justifyContent:'center', alignItems:'center' }}>
                <Image style={{ height: buttonbigheight, width: buttonbigwidth }} source={review1} />
              </View>
              :
              <View style={{ height: buttonbigheight, width: buttonbigwidth, justifyContent:'center', alignItems:'center' }}>
                <Image style={{ height: buttonsmallheight, width: buttonsmallwidth }} source={review0} />
              </View>
            }

          </TouchableOpacity>

          <TouchableOpacity accessibilityLabel='recipes' onPress={() => this.props.setFocus('recipe')}>

            {this.props.focus == 'recipe' ?
              <View style={{ height: buttonbigheight, width: buttonbigwidth, justifyContent:'center', alignItems:'center' }}>
                <Image style={{ height: buttonbigheight, width: buttonbigwidth }} source={recipe1} />
              </View>
              :
              <View style={{ height: buttonbigheight, width: buttonbigwidth, justifyContent:'center', alignItems:'center' }}>
                <Image style={{ height: buttonsmallheight, width: buttonsmallwidth }} source={recipe0} />
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
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 5,
  },
  innerInfoContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  follow: {
    width: 80,
    height: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  pic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 15,
    marginRight: 15
  },
  buttonContainer: {
    position: 'absolute',
    top:120,
    left:0,
    width: '100%',
    //marginTop: 2,
    //marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: buttonbigheight,
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
  me: state.eats.me,
  avatars: state.eats.avatars,
  faveMode: state.eats.faveMode,
  focus: state.eats.focus,
});

const mapDispatchToProps = {
  mergeAvatars: actions.mergeAvatars,
  setFaveMode: actions.setFaveMode,
  setFocus: actions.setFocus
};

const ProfileHeader = connect(mapStateToProps, mapDispatchToProps)(ProfileHeaderView);
export default ProfileHeader;
