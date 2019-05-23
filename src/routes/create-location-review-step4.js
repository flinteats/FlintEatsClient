import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Card, CardItem, Icon, Spinner } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Autocomplete from 'react-native-autocomplete-input';
import CreateLocationReviewHeader from './location-review-header'
import MSU from '../msu';


const camera = require('../../res/camera.png');

let MarketNameSource;
let MarketImageSource;

export default class CreateLocationReviewScreenStep4 extends React.Component {

    constructor(props) {
        super(props);
        // if (this.props.navigation.getParam('PassMarket', null)) {
        //     this.state = {
        //         draw: 0,
        //         uri: false,
        //         //Reference to the current market object 
        //         market: this.props.navigation.getParam('PassMarket', null),
        //         //The current text of the market search
        //         marketText: '',
        //         //The list of all tags the user has given to the market
        //         tags: [],

        //         //The list of all results from tag search
        //         tagResults: [],
        //         tagText: '',
        //         text: '',
        //     }
        // } else {
        //     this.state = {
        //         draw: 0,
        //         uri: false,
        //         //Reference to the current market object 
        //         market: null,
        //         //The current text of the market search
        //         marketText: '',
        //         //The list of all tags the user has given to the market
        //         tags: [],

        //         //The list of all results from tag search
        //         tagResults: [],
        //         tagText: '',
        //         text: '',
        //     }
        // }
        this.state = {
            draw: 0,
            uri: false,
            market: this.props.navigation.getParam('PassMarket', null),
            marketText: '',
            starCountCleanliness: this.props.navigation.getParam('StarClean', 0),
            starCountFriendliness: this.props.navigation.getParam('StarFriend', 0),
            starCountSelection: this.props.navigation.getParam('StarSelection', 0),
            starCountAccess: this.props.navigation.getParam('StarAccess', 0),
            starCountSafety: this.props.navigation.getParam('StarSafety', 0),
            title: this.props.navigation.getParam('ReviewText', ''),
            tags: [],
            tagResults: [],
            tagText: '',
            text: '',

        }



        // [this state member] : [default value],
        //etc....
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

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    render() {
        // Creates an array of tags for all the tags currently on the review.
        let tags = [];

        // this.state.tags.forEach(tag => {
        //     tags.push(
        //         <LinearGradient
        //             style={{ borderRadius: 20 }}
        //             start={{ x: 0, y: 0.5 }}
        //             end={{ x: 1, y: 0.5 }}
        //             colors={['#ABE894', '#54E085']}>
        //             <TouchableOpacity
        //                 key={tag.id}
        //                 style={{ borderRadius: 20, paddingBottom: 2 }}
        //                 onPress={() => this.removeTag(tag)}>
        //                 <Text style={{ textAlign: 'center' }}>
        //                     {'  ' + tag.name + '  '}
        //                 </Text>
        //             </TouchableOpacity>
        //         </LinearGradient>
        //     );
        // });

        this.state.tags.forEach(tag => {
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


        if (tags.length == 0) {
            tagsCardItem = <View />
        } else {
            tagsCardItem = <CardItem style={{ flexWrap: 'wrap' }}>{tags}</CardItem>;
        }

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

                        {/* Card view for displaying and adding tags to the review */}
                        <View style={{ minHeight: 65, maxHeight: 300 }}>
                            {tagsCardItem}
                            <CardItem style={{ alignItems: 'flex-start' }}>
                                <Autocomplete style={{ position: 'relative' }}
                                    autoCapitalize='none'
                                    data={this.state.tagResults}
                                    value={this.state.tagText}
                                    onChangeText={(text) => this.tagScan(text)}
                                    onSubmitEditing={() => this.addTag({ name: this.state.tagText.toLowerCase(), id: this.state.tags.length })}
                                    placeholder='Please add some tags to your review'
                                    renderItem={(data) => (
                                        <TouchableOpacity
                                            onPress={() => this.addTag(data)}>
                                            <Text>{data.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </CardItem>
                        </View>

                        {/* Footer area */}
                        <View style={{ width: '100%', justifyContent: 'space-around', alignItems: 'center', height: '27%', maxHeight: '27%' }}>
                            <View style={styles.view4}>
                                <Text style={{ fontSize: 16, color: 'gray' }}>Step 4/4</Text>
                            </View>
                            <View style={styles.progressbar}>
                                <LinearGradient
                                    style={styles.progress}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={['#ABE894', '#54E085']}></LinearGradient>
                            </View>

                            <TouchableOpacity style={{}}
                                onPress={() => this.props.navigation.navigate('Feed')}
                            >
                                <Text style={{
                                    color: '#00CE66',
                                    fontSize: 20,
                                    textAlign: 'center'
                                }}>Post</Text>
                            </TouchableOpacity>
                        </View>


                    </View>
                </KeyboardAwareScrollView>
            </View>
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
        //marginLeft: 30,
        //marginRight: 30,
        backgroundColor: '#D2D2D2',
        borderRadius: 10,
        maxHeight: 14,
        height: 14,
        width: '95%'
    },
    progress: {
        marginRight: '0%',
        borderRadius: 10,
        maxHeight: 14,
        height: 14,
    },
    tag: {
        borderRadius: 20,
        padding: 2
    }

})