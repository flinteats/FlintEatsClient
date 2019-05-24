import React from 'react';
import { View } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import StarRating from 'react-native-star-rating';
import CreateLocationReviewHeader from './location-review-header'

const camera = require('../../res/camera.png');

let MarketName;
let MarketImage;
let ReviewText;
let Cleanliness;
let Friendliness;
let Selection;
let Access;
let Safety;
let ReviewTags;

export default class ViewLocationReviewScreenView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    render() {
        // In the future, this object would be the object that contains all the review data
        //Expected data in the Review object:
        // market - a reference to the actual market object
        // Text - the text of the user's thoughts on the market
        // CleanCount - These are all the respective star ratings count
        // FriendlyCount
        // SelectCount
        // AccessCount
        // SafetyCount
        let review = this.props.navigation.getParam('Review', null);

        //Guard the review in case any of it's members are somehow null:
        if(review.market.name){
            MarketName = review.market.name;
        }else{
            MarketName = 'No market';
        }

        if(review.market.uri){
            MarketImage = {uri: 'data:image/png;base64,' + review.market.image64 };
        }else{
            MarketImage = {camera};
        }

        if(review.Text){
            ReviewText = review.Text;
        }else{
            ReviewText = '   User did not leave any thoughts on this market';
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
                {/* Header Area */}
                <View style={{ height: Dimensions.get('window').height * 0.33 }}>
                    <CreateLocationReviewHeader style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
                        MarketName={MarketName} ImageSource={MarketImage} navigation={this.props.navigation} />
                </View>

                {/* The text for the review area */}
                <View style={{ height: Dimensions.get('window').height * 0.33, backgroundColor:'white' }}>
                    <Text>{ReviewText}</Text>
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
                            rating={review.CleanCount}
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
                            rating={review.FriendlyCount}
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
                            rating={review.SelectCount}
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
                            rating={review.AccessCount}
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
                            rating={review.SafetyCount}
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