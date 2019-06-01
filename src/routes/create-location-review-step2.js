import React from 'react';
import { Alert, Image, Button, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Card, CardItem, Icon, Spinner } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { actions } from '../actions/index';
import StarRating from 'react-native-star-rating';
import CreateLocationReviewHeader from './location-review-header'

import MSU from '../msu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const camera = require('../../res/camera.png');

let MarketNameSource;
let MarketImageSource;

export default class CreateLocationReviewScreenStep2 extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.navigation.getParam('PassMarket', null)) {
            this.state = {
                draw: 0,
                uri: false,
                starCountCleanliness: 0,
                starCountFriendliness: 0,
                starCountSelection: 0,
                starCountAccess: 0,
                starCountSafety: 0,
                //Reference to the current market object 
                market: this.props.navigation.getParam('PassMarket', null),

                //The current text of the market search
                marketText: '',


            };
        } else {
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

                //The current text of the market search
                marketText: '',


            };
        }
    }

    onStarRatingPress(rating, x) {
        if (x == 1) {
            this.setState({
                starCountCleanliness: rating,
            });
        } else if (x == 2) {
            this.setState({
                starCountFriendliness: rating,
            });
        } else if (x == 3) {
            this.setState({
                starCountSelection: rating,
            });
        } else if (x == 4) {
            this.setState({
                starCountAccess: rating,
            });
        } else if (x == 5) {
            this.setState({
                starCountSafety: rating,
            });
        }

    }

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });


    render() {
        if (this.state.market) {
            if (this.state.market.image64) {
                MarketImageSource = { uri: 'data:image/png;base64,' + this.state.market.image64 };
            } else {
                MarketImageSource = camera;
            }
            MarketNameSource = this.state.market.name;
        } else {
            MarketImageSource = camera;
            MarketNameSource = "No Market Selected"
        }
        return (
            <View style={styles.master}>

                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={false}>

                    <View style={styles.innermaster}>

                        <View style={{ height: '33%', maxHeight: '33%' }}>
                            <CreateLocationReviewHeader ImageSource={MarketImageSource} MarketName={MarketNameSource} navigation={this.props.navigation} />
                        </View>


                        <View style={{ alignItems: 'center', height: '30%', justifyContent: 'flex-start' }}>
                            <View style={styles.starselectview}>
                                <Text style={{ fontSize: 20 }}>Cleanliness</Text>
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
                                    starSize={22}
                                />
                            </View>

                            <View style={styles.starselectview}>
                                <Text style={{ fontSize: 20 }}>Friendliness</Text>
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
                                    starSize={22}
                                />
                            </View>

                            <View style={styles.starselectview}>
                                <Text style={{ fontSize: 20 }}>Selection</Text>
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
                                    starSize={22}
                                />
                            </View>

                            <View style={styles.starselectview}>
                                <Text style={{ fontSize: 20 }}>Accessibility</Text>
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
                                    starSize={22}
                                />
                            </View>

                            <View style={styles.starselectview}>
                                <Text style={{ fontSize: 20 }}>Safety</Text>
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
                                    starSize={22}
                                />
                            </View>

                        </View>



                        {/* Footer area */}
                        <View style={{ width: '100%', justifyContent: 'space-around', alignItems: 'center', height: '27%', maxHeight: '27%' }}>
                            <View style={styles.view4}>
                                <Text style={{ fontSize: 16, color: 'gray' }}>Step 2/4</Text>
                            </View>
                            <View style={styles.progressbar}>
                                <LinearGradient
                                    style={styles.progress}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={['#ABE894', '#54E085']}></LinearGradient>
                            </View>

                            <TouchableOpacity style={{}}
                                onPress={() => this.props.navigation.navigate('CreateLocationReviewStep3', {
                                    PassMarket: this.state.market,
                                    clean: this.state.starCountCleanliness,
                                    friendly: this.state.starCountFriendliness,
                                    selection: this.state.starCountSelection,
                                    access: this.state.starCountAccess,
                                    safe: this.state.starCountSafety,
                                })}
                            >
                                <Text style={{
                                    color: '#00CE66',
                                    fontSize: 20,
                                    textAlign: 'center'
                                }}>Next</Text>
                            </TouchableOpacity>
                        </View>

                    </View>

                </KeyboardAwareScrollView>

            </View>
        );
    };

}


const styles = StyleSheet.create({
    master: {
        flex: 1,
        backgroundColor: 'white',
        maxHeight: Dimensions.get('window').height,
        backgroundColor: 'white',
    },
    innermaster: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height - 30,
        justifyContent: 'space-between',
    },
    starselectview: {
        padding: 0,
        paddingTop: 3,
        paddingBottom: 3,
        flexDirection: 'row'
    },
    progressbar: {
        marginTop: 0,
        paddingTop: 0,
        paddingBottom: 0,
        //marginLeft: 30,
        //marginRight: 30,
        backgroundColor: '#D2D2D2',
        borderRadius: 10,
        maxHeight: 14,
        height: 14,
        width: '95%'
    },
    progress: {
        marginRight: '50%',
        borderRadius: 10,
        maxHeight: 14,
        height: 14,


    },

})