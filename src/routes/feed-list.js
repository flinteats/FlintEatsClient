import React from 'react';
import { Dimensions, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Body, Card, CardItem, Spinner } from 'native-base';
import { connect } from 'react-redux';
import { actions } from '../actions/index';

import moment from 'moment';
import MSU from '../msu';

const tag = require('../../res/tag.png');
const comment = require('../../res/comment.png');
const like0 = require('../../res/like0.png');
const like1 = require('../../res/like1.png');
const profile = require('../../res/me0.png');
const follow0 = require('../../res/follow0.png');
const follow1 = require('../../res/follow1.png');

const { width, height } = Dimensions.get('window');

class FeedListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      end: false,
      draw: 0, 
      page: 0, 
      refreshing: false, 
      loading: false, 
      followees: null, 
      queried: '', 
      faveMode: false, 
      updates: []
    };
    this.navigate = this.navigate.bind(this);
  }

  componentDidMount() {
    MSU.get('/users/me/followees')
      .then(res => {
        let followees = [];
        res.forEach(f => followees.push(f.id));
        this.setState({ followees });
      })
      .catch(err => {
        console.log('error: /users/me/followees');
        console.log(err);
        this.setState({ followees: [] });
      });

    if (!this.props.feedKey
      || !this.props.feeds[this.props.feedKey]) {
      this.setState({ loading: true });
      this.refresh();
    }
    if (this.props.feedKey === 0) {
      this.updateChecker = setInterval(() => this.update(this.props.feedKey), 30000);
    }
  }

  componentDidUpdate() {
    if ((this.props.user
      && this.props.faveMode != this.state.faveMode)
      || (this.props.query != this.state.queried)) {
      this.refresh(true);
    }
  }

  componentDidUmount() {
    if (this.props.feedKey === 0) {
      clearInterval(this.updateChecker);
    }
    delete this.props.feeds[this.props.feedKey];
  }

  follow = (target) => {
    let followees = this.state.followees;
    followees.push(target);
    this.setState({ followees });

    MSU.post('/users/follow', target)
      .then(res => {
        console.log(res);
        if (res < 0) {
          // if removing follow, remove value
          followees = followees.filter(e => e !== target);
          this.setState({ followees });
        }
      })
      .catch(err => {
        console.log('error following ' + target);
        console.log(err);
      });
  }

  detail = (clazz, target) => {
    this.navigate('View' + clazz, { obj: target });
  }

  refresh = (reset = false) => {
    if (reset) {
      this.setState({ page: 0 });
    }
    /*
        if (this.props.query.length == 1 || this.props.query.length == 2) {
          // don't bother with 1- or 2-character queries
          this.setState({queried: this.props.query});
          return;
        }
    */
    this.setState({ refreshing: true, queried: this.props.query, faveMode: this.props.faveMode });
    let feedPath = this.props.user
      ? '/ugc/feed/' + this.props.user.id + '/' + this.props.faveMode // user
      : this.props.feedKey
        ? '/markets/' + this.props.feedKey + '/deals'               // market
        : '/ugc/feed';                                              // main
    if (this.props.query
      && !this.props.feedKey) {
      //TODO: handle q with mode

      if (!this.props.feeds[-1]) {
        // stash main feed
        this.props.setFeed(-1, this.props.feeds[0]);
      }
      let draw = this.state.draw + 1;
      this.setState({ draw });
      MSU.get(feedPath, { draw, end: false, q: this.props.query })
        .then(res => {
          console.log(res);
          if (res.draw === this.state.draw) {
            this.getAvatars(res.feed);
            this.props.setFeed(this.props.feedKey, res.feed);
            this.setState({ loading: false, refreshing: false });
          }
        })
        .catch(err => {
          console.log('error: ' + feedPath);
          console.log(err);
          this.props.setFeed(this.props.feedKey, []);
          this.setState({ loading: false, refreshing: false });
        });
    } else if (!this.props.query
      && !this.props.feedKey
      && this.props.feeds[-1]) {
      // if stashed feed, recover
      this.props.setFeed(0, this.props.feeds[-1]);
      delete this.props.feeds[-1];
      this.setState({ loading: false, refreshing: false });
    } else {
      MSU.get(feedPath)
        .then(res => {
          console.log(res);
          this.getAvatars(res);
          this.props.setFeed(this.props.feedKey, res);
          this.setState({ end: false, loading: false, refreshing: false });
        })
        .catch(err => {
          console.log('error: ' + feedPath);
          console.log(err);
          this.props.setFeed(this.props.feedKey, []);
          this.setState({ loading: false, refreshing: false });
        });
    }
  }

  update = (k) => {
    console.log('fetching updates');
    MSU.get('/ugc/update')
      .then(res => {
        let updates = res.concat(this.state.updates);
        this.setState({ updates });
        console.log(res.length + ' updates found');
      });
  }

  navigate = (name, opt) => {
    this.props.navigation.navigate(name, opt);
  }

  getAvatars = (feed) => {
    let uids = new Set();
    feed.forEach(i => {
      if (i) {
        let uid = i.usr.id;
        if (!this.props.avatars[uid]) {
          uids.add(uid);
        }
      } else {
        console.log('i is ' + i);
      }
    });
    if (uids.size) {
      MSU.post('/users/avatars', [...uids])
        .then(res => {
          this.props.mergeAvatars(res);
        });
    }
  }

  goToProfile = (user) => {
    if (this.props.me
      && this.props.me.id == user.id) {
      this.navigate('Me');
    } else {
      this.navigate('Profile', { user });
    }
  }

  turnPage = () => {
    if (this.props.user
      || this.props.feedKey
      || this.state.end) {
      return;
    }
    if (!this.state.loading) {
      let feed = this.props.feeds[this.props.feedKey];
      let page = this.state.page + 1;
      this.setState({ loading: true, page });
      let opts = { page };
      if (this.props.query) {
        opts.q = this.props.query;
      }
      MSU.get('/ugc/feed', opts)
        .then(res => {
          if (res.length > 0) {
            this.setState({ loading: false });
            this.getAvatars(res);
            this.props.setFeed(this.props.feedKey, feed.concat(res));
          } else {
            this.setState({ loading: false, end: true });
          }
        })
        .catch(err => {
          console.log('error: /ugc/feed');
          console.log(err);
        });
    }
  }

  renderCard = ({ item }) => {
    if (item === false) {
      return <Spinner />;
    }
    if (!item) {
      return null;
    }
    let following = false;
    if (this.state.followees
      && this.state.followees.indexOf(item.usr.id) >= 0) {
      following = true;
    }
    let clazz = item.class.split('.').slice(-1)[0];
    if (this.props.focus
      && this.props.focus != clazz.toLowerCase()) {
      return null;
    }
    return (
      <Card style={{ marginBottom: 17 }}>
        <CardItem>
          {/* profile picture */}
          <TouchableOpacity
            accessibilityLabel={item.usr.username + '\'s profile picture'}
            onPress={() => this.goToProfile(item.usr)}>
            <Image
              style={styles.pic}
              source={this.props.avatars[item.usr.id]
                ? { uri: 'data:image/png;base64,' + this.props.avatars[item.usr.id] }
                : profile}
            />
          </TouchableOpacity>

          {/* post's user, category, and location */}
          <Body>
            <TouchableOpacity
              onPress={() => this.detail(clazz, item)}>
              <Text style={{ fontWeight: 'bold' }}>
                {item.usr.username}
              </Text>
              <Text note>
                {(clazz == 'Deal' && item.market)
                  ? clazz + ' @ ' + item.market.name
                  : clazz
                }
              </Text>
            </TouchableOpacity>
          </Body>

          {/* follow/unfollow button */}
          {this.props.me.id == item.usr.id
            ? null : (
              <TouchableOpacity
                accessibilityLabel={following ? 'unfollow' : 'follow'}
                onPress={() => this.follow(item.usr.id)}>
                <Image style={{ width: 78, height: 24, resizeMode: 'contain' }}
                  source={following ? follow1 : follow0}
                />
              </TouchableOpacity>)
          }
        </CardItem>

        {/* post image (optional) */}
        <TouchableOpacity
          onPress={() => this.detail(clazz, item)}>
          {item.image64
            ? <Image
              style={styles.dealPic}
              source={{ uri: 'data:image/png;base64,' + item.image64 }}
            />
            : null
          }

          {/* post text content */}
          <CardItem cardBody style={styles.body}>
            <Text>
              {item.title
                ? item.title
                : item.text
              }
            </Text>
          </CardItem>

          {/* This is the CardItem for tag, comment, and like buttons */}
          <CardItem bordered={true}>
            <View style={styles.cardResponseContainer}>
              <View style={styles.cardResponse}>
                <Image
                  style={{ width: 23, height: 23 }}
                  source={tag}>
                </Image>
                <Text style={{ marginLeft: 5 }}>{item.tagCount + '\t'}</Text>
              </View>

              <View style={styles.cardResponse}>
                <Image
                  style={{ width: 28, height: 28 }}
                  source={comment}
                />
                <Text style={{ marginLeft: 5 }}>{item.commentCount + '\t'}</Text>
              </View>

              <View style={styles.cardResponse}>
                <Image
                  style={{ width: 23, height: 23 }}
                  source={item.iLike
                    ? like1
                    : like0}
                />
                <Text style={{ marginLeft: 5 }}>{item.reactionCount + '\t'}</Text>
              </View>

            </View>
          </CardItem>
        </TouchableOpacity>
      </Card>
    );
  }

  applyUpdates = () => {
    let feed = this.state.updates.concat(this.props.feeds[0]);
    this.props.setFeed(0, feed);
    this.setState({ updates: [] });
    let params = { index: 0, viewOffset: 0 };
    this.list.scrollToIndex(params);

  }

  renderHeader = () => {
    return null;
  }

  renderFooter = () => {
    if (this.state.loading) {
      return <Spinner />;
    }
    if (this.state.end) {
      return <Text style={{ textAlign: 'center' }}>End of Feed</Text>;
    }
    return null;
  }

  // feed render function
  render() {
    let feed = this.props.feeds[this.props.feedKey];
    if ((!feed || feed.length == 0)
      && !this.state.loading
      && !this.state.refreshing) {
      return (
        <TouchableOpacity
          style={{ flex: 1, alignContent: 'center', justifyContent: 'center' }}
          onPress={() => this.refresh(true)}>
          <Text style={{ textAlign: 'center' }}>
            No content found! {'\n'}Tap to refresh.
          </Text>
        </TouchableOpacity>
      );
    }

    let updater = null;
    if (this.state.updates.length > 0 && !this.props.feedKey) {
      updater = (
        <TouchableOpacity
          style={{
            height: 40, alignItems: 'center', justifyContent: 'center',
            backgroundColor: '#FFF', borderColor: '#00CE66', borderWidth: 2
          }}
          onPress={this.applyUpdates}
        >
          <Text>New Content Available</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View>
        {updater}
        <FlatList
          ref={ref => this.list = ref}
          data={feed}
          extraData={this.state}
          keyExtractor={(item, idx) => item ? String(item.id) : String(idx)}
          ListHeaderComponent={null}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.turnPage}
          onEndReachedThreshold={0.25}
          renderItem={(item) => this.renderCard(item)}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refresh(true)}
            />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    marginLeft: 10,
    marginRight: 10,
  },
  follow: {
    /*
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
    */
    //    width: 50,
    height: 20,
    //    backgroundColor: '#00CE66',
    borderRadius: 20,
    alignSelf: 'flex-start'
  },
  pic: {
    width: 40,
    height: 40,
    borderColor: '#FFF',
    borderRadius: 20,
    marginRight: 15
  },
  dealPic: {
    alignSelf: 'center',
    width: width - 32,
    height: width / 3,
    resizeMode: 'cover'
  },
  cardResponseContainer: {
    flexDirection: 'row',
    height: 25,
    width: '50%',
    justifyContent: 'space-between'
  },
  cardResponse: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

const mapStateToProps = (state) => ({
  me: state.eats.me,
  avatars: state.eats.avatars,
  faveMode: state.eats.faveMode,
  feeds: state.eats.feeds,
  focus: state.eats.focus,
  query: state.eats.query
});

const mapDispatchToProps = {
  mergeAvatars: actions.mergeAvatars,
  setFaveMode: actions.setFaveMode,
  setFeed: actions.setFeed,
  setFocus: actions.setFocus,
  setQuery: actions.setQuery
};

const FeedList = connect(mapStateToProps, mapDispatchToProps)(FeedListView);
export default FeedList;
