import React from 'react';
import { BackHandler, Image, Keyboard, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { actions } from '../actions/index';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import ClusteredMapView from 'react-native-maps-super-cluster'

import MapHeader from './map-header';
import MSU from '../msu';
import DismissKeyboardHOC from '../dismiss-kb';

const DismissKeyboardView = DismissKeyboardHOC(View)

const icon0 = require('../../res/nearby0.png');
const icon1 = require('../../res/nearby1.png');
const tomatoPos = require('../../res/tomato_pos_small.png');
const tomatoNeu = require('../../res/tomato_neu.png');
const tomatoNeg = require('../../res/tomato_neg.png');
const tomatobasket = require('../../res/basket1.png');



class MapScreenView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draw: 0,
      region: {
        latitude: 43.016193,
        longitude: -83.705521,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      },
      markets: [],
      queried: '',
      data: [{ id: 1, location: { latitude: 18, longitude: 18 } },
      { id: 2, location: { latitude: 18.2, longitude: 18 } },
      { id: 3, location: { latitude: 18, longitude: 18.3 } },]
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Home');
      return true;
    });

    this.fetchMarkets();
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
    tabBarLabel: 'Nearby',
    tabBarIcon: ({ focused }) => <Image
      style={{ width: 25, height: 25 }}
      source={focused
        ? icon1
        : icon0}
    />,
  });

  fetchMarkets() {
    /*
        if (this.props.query.length == 1 || this.props.query.length == 2) {
          // don't bother with 1- or 2-character queries
          this.setState({queried: this.props.query});
          return;
        }
    */
    let draw = this.state.draw + 1;
    this.setState({ draw, queried: this.props.query });
    MSU.get('/markets/map', { draw, q: this.props.query })
      .then(res => {
        if (res.draw === this.state.draw) {
          this.setState({ markets: res.markets });
        }
      })
      .catch(err => {
        console.log('err: /markets/map');
        console.log(err);
      });
  }

  componentDidUpdate() {
    if (this.props.query != this.state.queried) {
      this.fetchMarkets();
    }
  }


  renderCluster = (cluster, onPress) => {
    const pointCount = cluster.pointCount,
      coordinate = cluster.coordinate,
      clusterId = cluster.clusterId;

    // use pointCount to calculate cluster size scaling
    // and apply it to "style" prop below

    // eventually get clustered points by using
    // underlying SuperCluster instance
    // Methods ref: https://github.com/mapbox/supercluster
    const clusteringEngine = this.map.getClusteringEngine(),
      clusteredPoints = clusteringEngine.getLeaves(clusterId, 100)

    return (
      <Marker coordinate={coordinate} onPress={onPress} image={tomatobasket}>
        <View style={styles.myClusterStyle}>
          <Text style={styles.myClusterTextStyle}>
            {/*pointCount*/}
          </Text>
        </View>
      </Marker>
    )
  }

  renderMarker = (data) => {

    const { navigate } = this.props.navigation;

    let mkt = data;
    let coord = false;
    let review;
    review = mkt.id % 6;
    if (mkt) {
      coord = {
        latitude: mkt.lat,
        longitude: mkt.lng
      };
    }
    if (coord && coord.latitude && coord.longitude) {
      if (review < 2) {
        return (<MapView.Marker
          tracksViewChanges={false}
          key={mkt.id}
          coordinate={coord}
          title={mkt.name}
          image={tomatoNeg}
          description={mkt.description}
        >
          <MapView.Callout
            onPress={() => {
              Keyboard.dismiss();
              navigate('Market', { market: mkt });
            }}
          >
            <Text>
              {mkt.name}
            </Text>
          </MapView.Callout>
        </MapView.Marker>)
      }
      if (review < 4) {
        return (<MapView.Marker
          tracksViewChanges={false}
          key={mkt.id}
          coordinate={coord}
          title={mkt.name}
          image={tomatoNeu}
          description={mkt.description}
        >
          <MapView.Callout
            onPress={() => {
              Keyboard.dismiss();
              navigate('Market', { market: mkt });
            }}
          >
            <Text>
              {mkt.name}
            </Text>
          </MapView.Callout>
        </MapView.Marker>)
      }
      return (<MapView.Marker
        tracksViewChanges={false}
        key={mkt.id}
        coordinate={coord}
        title={mkt.name}
        image={tomatoPos}
        description={mkt.description}
      >
        <MapView.Callout
          onPress={() => {
            Keyboard.dismiss();
            navigate('Market', { market: mkt });
          }}
        >
          <Text>
            {mkt.name}
          </Text>
        </MapView.Callout>
      </MapView.Marker>)
    }
  }
  render() {
    let marketMarkers = [];
    for (var m in this.state.markets) {
      let mkt = this.state.markets[m];
      let coord = false;
      if (mkt) {
        coord = {
          latitude: mkt.lat,
          longitude: mkt.lng
        };
      }
      if (coord && coord.latitude && coord.longitude) {
        mkt.location = coord;
        marketMarkers.push(mkt)
      }
    }

    return (
      <DismissKeyboardView style={styles.container}>
        <MapHeader />
        <View style={styles.mapContainer}>
          <ClusteredMapView
            style={styles.map}
            data={marketMarkers}
            initialRegion={this.state.region}
            ref={(r) => { this.map = r }}
            renderMarker={this.renderMarker}
            renderCluster={this.renderCluster}
            radius={75} 
            maxZoom={12} />
        </View>
      </DismissKeyboardView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 50,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const mapStateToProps = (state) => ({
  query: state.eats.query
});

const mapDispatchToProps = {
};

const MapScreen = connect(mapStateToProps, mapDispatchToProps)(MapScreenView);
export default MapScreen;