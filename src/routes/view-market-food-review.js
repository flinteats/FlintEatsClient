import React from 'react';
import { View } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import CreateLocationReviewHeader from './location-review-header'

const camera = require('../../res/camera.png');

export default class ViewMarketFoodReviewScreenView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    render() {
        // This is a food review tied to a specific market: I.E. Potatoes at Kroger
        // Food Review Content:
        // Food Name
        let FoodName;
        // Food Image
        let FoodImage;
        // market
        let Market;
        // Thoughts on food
        let ThoughtsText;
        // Freshness Stars
        let FreshCount;
        // Price Stars
        let PriceCount;
        // Quality Stars
        let QualityCount;
        // tags

        let review = this.props.navigation.getParam("FoodReview", {});

        if (review.FoodName) {
            FoodName = review.FoodName;
        } else {
            FoodName = "Food not entered";
        }

        if (review.FoodImage) {
            FoodImage = review.FoodImage;
        } else {
            //Or if there is a marketimage, set foodimage to that
            FoodImage = camera;
        }

        if (review.Market) {
            Market = review.Market;
        } else {
            Market = {};
        }

        if (review.ThoughtsText) {
            ThoughtsText = review.ThoughtsText;
        } else {
            ThoughtsText = "   User did not leave any thoughts on this food."
        }

        if (review.FreshCount) {
            FreshCount = review.FreshCount;
        } else {
            FreshCount = 0;
        }

        if (review.PriceCount) {
            PriceCount = review.PriceCount;
        } else {
            PriceCount = 0;
        }

        if (review.QualityCount) {
            QualityCount = review.QualityCount;
        } else {
            QualityCount = 0;
        }


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
                <View style={styles.innermaster}>
                    {/* Header Area */}
                    <View style={{ height: Dimensions.get('window').height * 0.33 }}>
                        <CreateLocationReviewHeader style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
                            MarketName={FoodName} ImageSource={FoodImage} navigation={this.props.navigation} />
                    </View>

                    {/* The text for the review area */}
                    <View style={{ height: Dimensions.get('window').height * 0.33, backgroundColor: 'white' }}>
                        <Text>{ReviewText}</Text>
                    </View>

                    {/* Star boxes for the review */}
                    <View style={{ alignItems: 'center', justifyContent: 'flex-start', padding: 20, backgroundColor: 'white', height: Dimensions.get('window').height * 0.33 }}>
                        <View style={styles.starselectview}>
                            <Text style={{ fontSize: 20 }}>Freshness</Text>
                            <View style={{ width: 10 }} />
                            <StarRating
                                disabled={false}
                                emptyStar={'star-o'}
                                fullStar={'star'}
                                iconSet={'FontAwesome'}
                                rating={FreshCount}
                                fullStarColor={'orange'}
                                emptyStarColor={'orange'}
                                starSize={22}
                            />
                        </View>

                        <View style={styles.starselectview}>
                            <Text style={{ fontSize: 20 }}>Price</Text>
                            <View style={{ width: 10 }} />
                            <StarRating
                                disabled={false}
                                emptyStar={'star-o'}
                                fullStar={'star'}
                                iconSet={'FontAwesome'}
                                rating={PriceCount}
                                fullStarColor={'orange'}
                                emptyStarColor={'orange'}
                                starSize={22}
                            />
                        </View>

                        <View style={styles.starselectview}>
                            <Text style={{ fontSize: 20 }}>Quality</Text>
                            <View style={{ width: 10 }} />
                            <StarRating
                                disabled={false}
                                emptyStar={'star-o'}
                                fullStar={'star'}
                                iconSet={'FontAwesome'}
                                rating={QualityCount}
                                fullStarColor={'orange'}
                                emptyStarColor={'orange'}
                                starSize={22}
                            />
                        </View>


                    </View>
                    {/* Tags */}
                    <View style={{ backgroundColor: 'white' }}>
                        {tags}
                    </View>
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