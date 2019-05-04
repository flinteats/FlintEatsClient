import React from 'react';
import { BackHandler, Button, Dimensions, FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Body, Card, CardItem, Icon, Spinner } from 'native-base';
import AutoLink from 'react-native-autolink';
import { connect } from 'react-redux';
import { actions } from '../actions/index';

import MSU from '../msu';

const like0 = require('../../res/like0.png');
const like1 = require('../../res/like1.png');
const profile = require('../../res/me0.png');
const comment = require('../../res/comment.png');

const { width, height } = Dimensions.get('window');

class ViewTipScreenView extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: null, commenting: false, reacted: false, tags: null, text: '' };
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Tip`,
    style: { backgroundColor: '#00CE66' }
  });

  componentDidMount() {
    let { obj } = this.props.navigation.state.params;
    MSU.post('/viewings/open', obj.id);
    MSU.get('/ugc/comments/list/' + obj.id)
      .then(res => {
        this.setState({ comments: res });
      });
    MSU.get('/tags/list/' + obj.id)
      .then(res => {
        this.setState({ tags: res });
      });

    this.setState({ reacted: obj.iLike });
  }

  componentWillUnmount() {
    let { obj } = this.props.navigation.state.params;
    MSU.post('/viewings/close', obj.id);
  }

  addComment = (target, val) => {
    this.setState({ commenting: true });
    const { obj } = this.props.navigation.state.params;
    MSU.post('/ugc/comments/create', { target: obj.id, text: this.state.text })
      .then(res => {
        if (res > 0) {
          //TODO: what's the second call for here?
          MSU.get('/ugc/comments/' + res)
            .then(rez => {
              let comments = this.state.comments;
              comments.push(rez)
              this.setState({ comments, commenting: false });

              // update feeds
              let feeds = this.props.feeds;
              for (let f in feeds) {
                feeds[f].forEach((item, idx, f) => {
                  if (item && item.id == obj.id
                    && !isNaN(item.commentCount)) {
                    f[idx].commentCount++;
                  }
                });
                this.props.setFeed(f, feeds[f]);
              }
            });
        }
      });
    this.setState({ text: '' });
  }

  goToProfile = (user) => {
    if (this.props.me
      && this.props.me.id == user.id) {
      this.props.navigation.navigate('Me');
    } else {
      this.props.navigation.navigate('Profile', { user });
    }
  }


  react = (target, val) => {
    const { obj } = this.props.navigation.state.params;
    this.setState({ reacted: !this.state.reacted });
    MSU.post('/reactions/create', { target: target, value: val })
      .then(res => {
        console.log(res);
        let feeds = this.props.feeds;
        if (feeds[this.props.me.id] && this.props.faveMode) {
          let feed = feeds[this.props.me.id];
          // if fave feed is present, add/remove accordingly
          if (res) {
            // where to add?
          } else {
            feed = feed.filter(e => e.id !== target);
          }
          this.props.setFeed(this.props.me.id, feed);
        }
      });

    // update feeds
    let feeds = this.props.feeds;
    for (let f in feeds) {
      feeds[f].forEach((item, idx, f) => {
        if (item && item.id == obj.id) {
          f[idx].iLike = !f[idx].iLike;
          if (f[idx].iLike) {
            f[idx].reactionCount++;
          } else {
            f[idx].reactionCount--;
          }
        }
      });
      this.props.setFeed(f, feeds[f]);
    }
  }

  renderComment = ({ item }) => {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <TouchableOpacity
          accessibilityLabel={item.usr.username + '\'s profile picture'}
          onPress={() => this.goToProfile(item.usr)}>
          <Image
            style={styles.commentPic}
            source={item.usr.avatar64
              ? { uri: 'data:image/png;base64,' + item.usr.avatar64 }
              : profile}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, flexDirection: 'column', marginTop: 5 }}>
          <Text style={{ fontWeight: 'bold' }} >{item.usr.username}</Text>
          <AutoLink style={styles.body} text={item.text} />
        </View>
      </View>
    );
  }

  render() {
    let { obj } = this.props.navigation.state.params;
    let clazz = obj.class.split('.').slice(-1)[0];
    let tagBubbles = [];
    if (this.state.tags) {
      this.state.tags.forEach(tag => {
        tagBubbles.push(
          <View style={{ paddingLeft: 5 }}
            key={tag.id}>
            <TouchableOpacity style={{ backgroundColor: '#00CE66', borderRadius: 20, paddingBottom: 2 }}
              onPress={() => console.log(tag.name)}>
              <Text style={{ textAlign: 'center' }}>{'  ' + tag.name + '  '}</Text>
            </TouchableOpacity>
          </View>
        );
      });
    }

    return (
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ flex: 1, }}>
        <Card>
          <CardItem>
            <TouchableOpacity
              accessibilityLabel={obj.usr.username + '\'s profile picture'}
              onPress={() => this.goToProfile(obj.usr)}>
              <Image
                style={styles.pic}
                source={this.props.avatars[obj.usr.id]
                  ? { uri: 'data:image/png;base64,' + this.props.avatars[obj.usr.id] }
                  : profile}
              />
            </TouchableOpacity>
            <Body style={{ flexDirection: 'column', justifyContent: "flex-start" }}>
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                {obj.usr.username}
              </Text>
              <Text note style={{ fontSize: 11 }}>
                {clazz}
              </Text>
            </Body>
            <TouchableOpacity
              accessibilityLabel={this.state.reacted ? 'unlike' : 'like'}
              style={{ padding: 8, alignItems: 'center' }}
              onPress={() => this.react(obj.id, 1)}>
              <Image
                style={{ width: 30, height: 30 }}
                source={this.state.reacted
                  ? like1
                  : like0}
              />
            </TouchableOpacity>
          </CardItem>
          {/* The image of the tip is rendered here, based on if obj.image64 exists */}
          {obj.image64 && <Image
            style={styles.tipPic}
            source={{ uri: 'data:image/png;base64,' + obj.image64 }} />}
          <CardItem>
            {/* The text of the tip is rendered here */}
            <AutoLink text={obj.text} />
          </CardItem>
          <CardItem>
            <Text style={{ fontWeight: 'bold' }}>Tags{' '}</Text>
            {tagBubbles}
          </CardItem>
        </Card>



        {/* This starts the comments section of the page */}
        <View backgroundColor={'#b1b2b5'} style={{ height: '10%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
          <Image style={{ height: 25, width: 25 }} source={comment} />
          <Text note style={{ marginLeft: 7 }}>COMMENTS</Text>
        </View>

        <Card>
          {!this.state.comments
            ? <Spinner />
            : <View>
              <FlatList
                data={this.state.comments}
                extraData={this.state}
                keyExtractor={(item, idx) => item ? item.id : idx}
                renderItem={this.renderComment}
              />
              
            </View>
          }
        </Card>

        {/* This is the last box on the screen for submitting new comments */}
        <View backgroundColor={'#b1b2b5'} style={{ height: '10%', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', marginTop:5 }}>
          <View style={{borderRadius:50, width:'75%', backgroundColor:'#f7f7f7'}}>
            <TextInput
              style={{ width: '100%', textAlign: 'center' }}
              value={this.state.text}
              onChangeText={(text) => this.setState({ text })}
              onSubmitEditing={() => this.addComment}
              placeholder='New comment'
            />
          </View>
          {this.state.commenting
            ? <Spinner />
            : <Button
              title='Submit'
              color='#00CE66'
              onPress={this.addComment}
              disabled={!this.state.text}
            />
          }
        </View>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  body: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
  },
  pic: {
    width: 40,
    height: 40,
    borderColor: '#FFF',
    borderRadius: 40,
    marginRight: 15
  },
  commentPic: {
    width: 30,
    height: 30,
    borderColor: '#FFF',
    borderRadius: 15,
    margin: 10
  },
  tipPic: {
    alignSelf: 'center',
    width: width - 32,
    height: width / 3,
    resizeMode: 'cover'
  },

});

const mapStateToProps = (state) => ({
  me: state.eats.me,
  avatars: state.eats.avatars,
  faveMode: state.eats.faveMode,
  feeds: state.eats.feeds,
});

const mapDispatchToProps = {
  setFeed: actions.setFeed,
};

const ViewTipScreen = connect(mapStateToProps, mapDispatchToProps)(ViewTipScreenView);
export default ViewTipScreen;
