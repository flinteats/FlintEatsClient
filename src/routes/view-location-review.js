import React from 'react';
import { View } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import StarRating from 'react-native-star-rating';
import CreateLocationReviewHeader from './location-review-header'

const camera = require('../../res/camera.png');

export default class ViewLocationReviewScreenView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            starCountCleanliness: 0,
            starCountFriendliness: 0,
            starCountSelection: 0,
            starCountAccess: 0,
            starCountSafety: 0,
        }
    }

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    render() {
        // In the future, this object would be the object that contains all the review data
        let review = {};

        let tags = [];

        if (review.tags != null) {
            review.tags.forEach(tag => {
                tags.push(
                    <TouchableOpacity
                        key={tag.id}
                        style={styles.tag}
                        onPress={() => this.removeTag(tag)}>
                        <LinearGradient
                            style={styles.tag}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            colors={['#ABE894', '#54E085']}>
                            <Text style={{ textAlign: 'center' }}>
                                {'  ' + tag.name + '  '}
                            </Text>
                        </LinearGradient>

                    </TouchableOpacity>
                );
            });
        }

        return (
            <KeyboardAwareScrollView>
                {/* Header Area */}
                <View style={{ height: Dimensions.get('window').height * 0.33 }}>
                    <CreateLocationReviewHeader style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
                        MarketName='Text' ImageSource={camera} navigation={this.props.navigation} />
                </View>

                {/* The text for the review area */}
                <View style={{ height: Dimensions.get('window').height * 0.33, backgroundColor:'white' }}>
                    <Text>Review text here</Text>
                </View>

                {/* Star boxes for the review */}
                <View style={{ alignItems: 'center', justifyContent: 'flex-start', padding: 20, backgroundColor: 'white', height: Dimensions.get('window').height * 0.33 }}>
                    <View style={styles.starselectview}>
                        <Text style={{ fontSize: 20 }}>Cleanliness</Text>
                        <View style={{ width: 10 }} />
                        <StarRating
                            disabled={false}
                            emptyStar={'star-o'}
                            fullStar={'star'}
                            iconSet={'FontAwesome'}
                            rating={3}
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



                {/* Tags */}
                <View style={{backgroundColor:'white'}}>
                    {tags}
                    <Text>Tags go here</Text>
                </View>
            </KeyboardAwareScrollView>
        );
    }


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
    tag: {
        borderRadius: 20,
        padding: 2
    }

})