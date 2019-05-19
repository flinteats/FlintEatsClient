import React from 'react';
import { Alert, Image, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Card, CardItem, Icon, Spinner } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';
import LinearGradient from 'react-native-linear-gradient';
import { connect } from 'react-redux';
import { actions } from '../actions/index';
import StarRating from 'react-native-star-rating';
import CreateLocationReviewHeader from './location-review-header'

import MSU from '../msu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const camera = require('../../res/camera.png');



let marketimageJSX;
let marketnameJSX;

let MarketNameSource;
let MarketImageSource;


let tagsCardItem;



export default class CreateLocationReviewScreen extends React.Component {
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
        if (this.props.navigation.state.params.market) {
            // If the page has been passed a market when being navigated to,
            // fill the info this page uses with the given market.

            this.setState({ market: this.props.navigation.params.market });
            this.setState({ marketText: this.props.navigation.params.market.name });
            //this.state.market = this.props.navigation.params.market;
            //this.state.marketText = this.props.navigation.params.market.name;
        } else {
            this.setState({ market: 'null' });
            this.setState({ marketText: 'No Market Selected' });
            //this.state.market = 'null';
            //this.state.marketText = 'No Market Selected';
        }
    }

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    marketScan = (q) => {
        let draw = this.state.draw + 1;
        this.setState({ marketText: q, draw });
        MSU.get('/markets/search', { draw, q })
            .then(res => {
                this.setState({ marketResults: res });
            })
            .catch(err => {
                console.log(err);
            });
    }

    tagScan = (q) => {
        this.setState({ tagText: q });
        MSU.get('/tags/search', { q })
            .then(res => {
                this.setState({ tagResults: res });
            })
            .catch(err => {
                console.log(err);
            });
    }

    addTag = (tag) => {
        // only add if not already added
        if (this.state.tags.indexOf(tag) < 0
            && tag.name.length > 0) {
            this.setState({ tags: this.state.tags.concat([tag]), tagText: '', tagResults: [] });
        }
    }

    removeTag = (tag) => {
        let tags = this.state.tags;
        tags = tags.filter(e => e !== tag);
        this.setState({ tags });
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



    render() {
        if (this.state.market) {
            if (this.state.market.image64) {
                // marketimageJSX = <Image source={{ uri: 'data:image/png;base64,' + this.state.market.image64 }} />
                MarketImageSource = { uri: 'data:image/png;base64,' + this.state.market.image64 };
            } else {
                // marketimageJSX = <Image source={camera} />
                MarketImageSource = camera;
            }

            // marketnameJSX = <Text>{this.state.market.name}</Text>
            MarketNameSource = this.state.market.name;
        } else {
            // marketimageJSX = <Image source={camera} />
            // marketnameJSX = <Text>Market Name Here</Text>

            MarketImageSource = camera;
            MarketNameSource = "Market Name Here"
        }


        // Creates an array of tags for all the tags currently on the review.
        let tags = [];
        this.state.tags.forEach(tag => {
            tags.push(
                <LinearGradient
                    style={{ borderRadius: 20, margin: 1 }}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    colors={['#ABE894', '#54E085']}>
                    <TouchableOpacity
                        key={tag.id}
                        style={{ borderRadius: 20, paddingBottom: 2 }}
                        onPress={() => this.removeTag(tag)}>
                        <Text style={{ textAlign: 'center' }}>
                            {'  ' + tag.name + '  '}
                        </Text>
                    </TouchableOpacity>
                </LinearGradient>
            );
        });
        if (tags.length == 0) {
            tagsCardItem = <View />
        } else {
            tagsCardItem = <CardItem style={{ flexWrap: 'wrap' }}>{tags}</CardItem>;
        }
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={false}>

                    <View style={{ backgroundColor: 'white', height: Dimensions.get('window').height, justifyContent:'center' }}>
                        <View style={{ height:'30%' }}>
                            <CreateLocationReviewHeader ImageSource={MarketImageSource} MarketName={MarketNameSource} navigation={this.props.navigation} />
                        </View>

                        {/* Select location View */}
                        <View style={{ flexDirection: 'row', backgroundColor: 'white', height:'30%', alignItems: 'center' }}>
                            <Icon name='pin' style={{ marginTop: 12, marginLeft: 6 }} color='#00CE66' />
                            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '90%' }}>
                                <Autocomplete
                                    style={{ position: 'relative', height:75, zIndex:1 }}
                                    inputContainerStyle={{ borderColor: null, borderWidth: 0 }}
                                    data={this.state.marketResults}
                                    value={this.state.marketText}
                                    listUpwards={true}
                                    onChangeText={(text) => this.marketScan(text)}
                                    placeholder='Location'
                                    renderItem={(data) => (
                                        <TouchableOpacity
                                            style={{}}
                                            onPress={() => this.setState({ market: { id: data.id, name: data.name }, marketText: data.name, marketResults: [] })}>
                                            <Text style={{ textAlign: 'center' }}>{data.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        </View>





                        {/* Footer area */}
                        <View style={{ width: '100%', justifyContent: 'space-around', alignItems: 'center', height:'30%' }}>
                            <View style={styles.view4}>
                                <Text style={{ fontSize: 16, color: 'gray' }}>Step 1/5</Text>
                            </View>
                            <View style={styles.progressbar}>
                                <LinearGradient
                                    style={styles.progress}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={['#ABE894', '#54E085']}></LinearGradient>
                            </View>

                            <TouchableOpacity style={{}}
                                onPress={() => this.props.navigation.navigate('CreateLocationReviewStep2')}
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
    }
}

const styles = StyleSheet.create({
    view4: {
        flex: 1,
        maxHeight: 30,
        flexDirection: 'row',
        justifyContent: 'center',
      },
      progressbar: {
        marginTop: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#D2D2D2',
        borderRadius: 10,
        maxHeight: 14,
        height: 14,
        width: '95%'
      },
      progress: {
        marginRight: '80%',
        borderRadius: 10,
        maxHeight: 14,
        height: 14,
        
    
      },
})