import React from 'react';
import { Alert, Image, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card, CardItem, Icon, Spinner } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';
import { connect } from 'react-redux';
import { actions } from '../actions/index';
import Permissions from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';

import MSU from '../msu';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const camera = require('../../res/camera.png');



let marketimageJSX;
let marketnameJSX;

export default class CreateLocationReviewScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            draw: 0,
            uri: false,
            market:null,
            marketResults: [],
            marketText: '',
            tags: [],
            tagResults: [],
            tagText: '',
            text: '',
        };
        if (this.props.navigation.state.params.market) {
            // If the page has been passed a market when being navigated to,
            // fill the info this page uses with the given market.
            //market = this.props.navigation.state.params.market;
            //id = this.props.navigation.state.params.market.id;
            //marketname = this.props.navigation.state.params.market.name;
            this.setState({market: this.props.navigation.params.market});
            this.setState({marketText: this.props.navigation.params.market.name});
            
        } else {
            market = null;
        }
    }

    static navigationOptions = ({ navigation }) => {
        header = null;
        const { params = {} } = navigation.state;
        return {
            title: 'Review Location'
        };
    }

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





    render() {
        if (this.state.market) {
            if(this.state.market.image64){
                marketimageJSX = <Image source={{ uri: 'data:image/png;base64,' + this.state.market.image64 }} />
            }else{
                marketimageJSX = <Image source={camera} />
            }
            
            marketnameJSX = <Text>{this.state.marketText}</Text>
        } else {
            marketimageJSX = <Image source={camera} />
            marketnameJSX = <Text>Market Name Here</Text>
        }


        let tags = [];
        this.state.tags.forEach(tag => {
            tags.push(
                <TouchableOpacity
                    key={tag.id}
                    style={{ borderRadius: 20, backgroundColor: '#00CE66', paddingBottom: 2 }}
                    onPress={() => this.removeTag(tag)}>
                    <Text style={{ textAlign: 'center' }}>
                        {'  ' + tag.name + '  '}
                    </Text>
                </TouchableOpacity>
            );
        });


        return (
            <KeyboardAwareScrollView keyboardShouldPersistTaps={true}>
                <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {marketimageJSX}
                    {marketnameJSX}
                    <TextInput
                        style={{ width: '95%' }}
                        onChangeText={(text) => this.setState({ text })}
                        onSubmitEditing={() => this.submit}
                        multiline={true}
                        defaultValue={this.state.text}
                        placeholder='Other comments'
                    />
                </Card>


                {/* This is the card for selecting the market the user would like to review. Currently it is just a drop down list of all markets */}
                <Card style={{ height: 'auto' }}>
                    <CardItem style={{alignItems:'flex-start'}}>
                        <Icon name='pin' style={{marginTop:12}}/>
                        <View style={{ margin: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch' }}>
                            <Autocomplete
                                style={{ position: 'relative' }}
                                data={this.state.marketResults}
                                value={this.state.marketText}
                                listUpwards={true}
                                onChangeText={(text) => this.marketScan(text)}
                                placeholder='Location'
                                renderItem={(data) => (
                                    <TouchableOpacity
                                        onPress={() => this.setState({ market: { id: data.id }, marketText: data.name, marketResults: [] })}>
                                        <Text>{data.name}</Text>
                                    </TouchableOpacity>
                                )}
                            />

                        </View>
                    </CardItem>

                </Card>


                <Card style={{ flex: 30, height: '50%' }}>
                    <CardItem>
                        {tags}
                    </CardItem>
                    <CardItem>
                        <Autocomplete style={{ zIndex: 1, left: 0, right: 0, top: 0 }}
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
                <Text>hi</Text>
            </KeyboardAwareScrollView>
        );
    }
}