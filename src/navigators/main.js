import React from 'react';
import { BackHandler } from 'react-native';
import { connect } from 'react-redux';
import { addNavigationHelpers, NavigationActions, StackNavigator, TabNavigator } from 'react-navigation';
import { createReduxBoundAddListener, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers';


import LoginScreen from '../routes/login';
import CreateAccountScreen from '../routes/create-account';
import ForgotScreen from '../routes/forgot';

import AboutScreen from '../routes/about';
import AddScreen from '../routes/add';
import CreateDealScreen from '../routes/create-deal';
import CreateTipScreen from '../routes/create-tip';
import CreateRecipeScreen from '../routes/create-recipe';
import FeedScreen from '../routes/feed';
import FollowScreen from '../routes/follow';
import HelpScreen from '../routes/help';
import LibraryScreen from '../routes/library';
import MapScreen from '../routes/map';
import MarketDealsScreen from '../routes/market-deals';
import MarketScreen from '../routes/market';
import MeScreen from '../routes/me';
import PreferencesScreen from '../routes/preferences';
import ProfileScreen from '../routes/profile';
import SecurityScreen from '../routes/security';
import SettingsScreen from '../routes/settings';
import ViewDealScreen from '../routes/view-deal';
import ViewTipScreen from '../routes/view-tip';

const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);

const addListener = createReduxBoundAddListener('root');

const MainNavigator = TabNavigator(
  {
    Map: { screen: MapScreen },
    Feed: { screen: FeedScreen },
    Add: { screen: AddScreen },
    Library: { screen: LibraryScreen },
    Me: { screen: MeScreen },
  },
  {
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: '#00CE66',
      inactiveTintColor: '#000',
      indicatorStyle: {
        backgroundColor: '#00CE66'
      },
      labelStyle: {
        fontSize: 8,
      },
      showIcon: true,
      style: {
        backgroundColor: '#F8F8F8'
      },
    }
  }
);

export const AppNavigator = StackNavigator(
  {
    Login: { screen: LoginScreen },
    CreateAccount: { screen: CreateAccountScreen },
    Forgot: { screen: ForgotScreen },
    Main: { screen: MainNavigator },

    About: { screen: AboutScreen },
    CreateDeal: { screen: CreateDealScreen },
    CreateTip: { screen: CreateTipScreen },
    CreateRecipe: {screen: CreateRecipeScreen},
    Follow: { screen: FollowScreen },
    Help: { screen: HelpScreen },
    Market: { screen: MarketScreen },
    MarketDeals: { screen: MarketDealsScreen },
    Preferences: { screen: PreferencesScreen },
    Profile: { screen: ProfileScreen },
    Security: { screen: SecurityScreen },
    Settings: { screen: SettingsScreen },
    ViewDeal: { screen: ViewDealScreen },
    ViewTip: { screen: ViewTipScreen },
  },
  {
    navigationOptions: {
      headerMode: 'screen',
    }
  }
);

class ReduxNavigation extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  render() {
    const { dispatch, nav } = this.props;
    const navigation = addNavigationHelpers({
      dispatch,
      state: nav,
      addListener
    });

    return <AppNavigator navigation={navigation} />;
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(ReduxNavigation);
