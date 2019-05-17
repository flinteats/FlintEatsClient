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
                <Card style={{ alignItems: 'center' }}>
                    <CardItem>
                        <Text style={{ fontSize: 22 }}>Cleanliness</Text>
                        <View style={{ width: 10 }} />
                        <StarRating
                            disabled={false}
                            emptyStar={'star-o'}
                            fullStar={'star'}
                            iconSet={'FontAwesome'}
                            rating={this.state.starCountCleanliness}
                            selectedStar={(rating) => this.onStarRatingPress(rating, 1)}
                            fullStarColor={'orange'}
                            emptyStarColor={'orange'}
                            starSize={24}
                        />
                    </CardItem>

                    <CardItem>
                        <Text style={{ fontSize: 22 }}>Friendliness</Text>
                        <View style={{ width: 10 }} />
                        <StarRating
                            disabled={false}
                            emptyStar={'star-o'}
                            fullStar={'star'}
                            iconSet={'FontAwesome'}
                            rating={this.state.starCountFriendliness}
                            selectedStar={(rating) => this.onStarRatingPress(rating, 2)}
                            fullStarColor={'orange'}
                            emptyStarColor={'orange'}
                            starSize={24}
                        />
                    </CardItem>

                    <CardItem>
                        <Text style={{ fontSize: 22 }}>Selection</Text>
                        <View style={{ width: 10 }} />
                        <StarRating
                            disabled={false}
                            emptyStar={'star-o'}
                            fullStar={'star'}
                            iconSet={'FontAwesome'}
                            rating={this.state.starCountSelection}
                            selectedStar={(rating) => this.onStarRatingPress(rating, 3)}
                            fullStarColor={'orange'}
                            emptyStarColor={'orange'}
                            starSize={24}
                        />
                    </CardItem>

                    <CardItem>
                        <Text style={{ fontSize: 22 }}>Accessibility</Text>
                        <View style={{ width: 10 }} />
                        <StarRating
                            disabled={false}
                            emptyStar={'star-o'}
                            fullStar={'star'}
                            iconSet={'FontAwesome'}
                            rating={this.state.starCountAccess}
                            selectedStar={(rating) => this.onStarRatingPress(rating, 4)}
                            fullStarColor={'orange'}
                            emptyStarColor={'orange'}
                            starSize={24}
                        />
                    </CardItem>

                    <CardItem>
                        <Text style={{ fontSize: 22 }}>Safety</Text>
                        <View style={{ width: 10 }} />
                        <StarRating
                            disabled={false}
                            emptyStar={'star-o'}
                            fullStar={'star'}
                            iconSet={'FontAwesome'}
                            rating={this.state.starCountSafety}
                            selectedStar={(rating) => this.onStarRatingPress(rating, 5)}
                            fullStarColor={'orange'}
                            emptyStarColor={'orange'}
                            starSize={24}
                        />
                    </CardItem>

                </Card>

            </KeyboardAwareScrollView>
        );
    };

}