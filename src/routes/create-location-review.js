import React from 'react';
import { Alert, Image, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Card, CardItem, Icon, Spinner } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';
import { connect } from 'react-redux';
import { actions } from '../actions/index';
import Permissions from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';

import MSU from '../msu';

const camera = require('../../res/camera.png');

let market;
let id;
let marketname;

let marketimageJSX;

export default class CreateLocationReviewScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            draw: 0,
            uri: false,
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
            market = this.props.navigation.state.params.market;
            id = this.props.navigation.state.params.market.id;
            marketname = this.props.navigation.state.params.market.name;
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





    render() {
        if (market) {
            marketimageJSX = <Image source={{ uri: 'data:image/png;base64,' + this.state.uri }} />
        } else {
            marketimageJSX = <Image source={camera} />
        }

        return (
            <View>
                <Card style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {marketimageJSX}
                    <Text style={{ fontSize: 22 }}>Store Name Here</Text>
                    <TextInput
                        style={{ width: '95%' }}
                        onChangeText={(text) => this.setState({ text })}
                        onSubmitEditing={() => this.submit}
                        multiline={true}
                        defaultValue={this.state.text}
                        placeholder='Other comments'
                    />
                </Card>



                <Card style={{ height: '37%' }}>
                    <View style={{margin:5, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Icon name='pin' style={{flex:1,marginRight:4}} />

                        <Autocomplete
                            style={{ height: 60, flex:3 }}
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

                </Card>
                <Text>hi</Text>
            </View>
        );
    }
}