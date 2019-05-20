import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const camera = require('../../res/camera.png');

let MarketNameSource;
let MarketImageSource;

export default class CreateLocationReviewScreenStep4 extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            draw: 0,
            uri: false,
            //Reference to the current market object 
            market: null,
            //The current text of the market search
            marketText: '',
            //The list of all tags the user has given to the market
            tags: [],

            //The list of all results from tag search
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

    render() {
        // Creates an array of tags for all the tags currently on the review.
        let tags = [];
        this.state.tags.forEach(tag => {
            tags.push(
                <LinearGradient
                    style={{ borderRadius: 20 }}
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
            <KeyboardAwareScrollView>
                {/* Card view for displaying and adding tags to the review */}
                <Card style={{ minHeight: 65, maxHeight: 300 }}>
                    {tagsCardItem}
                    <CardItem style={{ alignItems: 'flex-start' }}>
                        <Autocomplete style={{ position: 'relative' }}
                            autoCapitalize='none'
                            data={this.state.tagResults}
                            value={this.state.tagText}
                            onChangeText={(text) => this.tagScan(text)}
                            onSubmitEditing={() => this.addTag({ name: this.state.tagText.toLowerCase(), id: this.state.tags.length })}
                            placeholder='Tags'
                            renderItem={(data) => (
                                <TouchableOpacity
                                    onPress={() => this.addTag(data)}>
                                    <Text>{data.name}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </CardItem>
                </Card>

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
        //marginLeft: 30,
        //marginRight: 30,
        backgroundColor: '#D2D2D2',
        borderRadius: 10,
        maxHeight: 14,
        height: 14,
        width: '95%'
    },
    progress: {
        marginRight: '20%',
        borderRadius: 10,
        maxHeight: 14,
        height: 14,
    },

})