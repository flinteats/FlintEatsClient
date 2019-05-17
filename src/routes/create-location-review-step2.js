import React from 'react';
import { Alert, Image, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card, CardItem, Icon, Spinner } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { actions } from '../actions/index';
import StarRating from 'react-native-star-rating';

import MSU from '../msu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const camera = require('../../res/camera.png');

export default class CreateLocationReviewScreenStep2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            draw: 0,
            uri: false,
            starCountCleanliness: 0,
            starCountFriendliness: 0,
            starCountSelection: 0,
            starCountAccess: 0,
            starCountSafety: 0,
            //Reference to the current market object 
            market: null,

            //The list of results from the market search drop-down
            marketResults: [],

            //The current text of the market search
            marketText: '',

            //The list of all tags the user has given to the market
            tags: [],

            //The list of all results from tag search
            tagResults: [],
            tagText: '',
            text: '',
        };
    }


    render() {
        return (
            <KeyboardAwareScrollView>
                

            </KeyboardAwareScrollView>
        );
    };

}