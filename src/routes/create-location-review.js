import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import { Icon, } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';
import LinearGradient from 'react-native-linear-gradient';
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
        if (this.props.navigation.getParam('PassMarket', null)) {
            this.state = {
                draw: 0,
                uri: false,

                //Reference to the current market object 
                market: this.props.navigation.getParam('PassMarket', null),

                //The list of results from the market search drop-down
                marketResults: [],

                //The current text of the market search
                marketText: '',
            }
        } else {
            this.state = {
                draw: 0,
                uri: false,

                //Reference to the current market object 
                market: null,

                //The list of results from the market search drop-down
                marketResults: [],

                //The current text of the market search
                marketText: '',
            }
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
            MarketNameSource = "Market Name Here"
        }



        return (
            <View style={styles.master}>
                <KeyboardAwareScrollView
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    scrollEnabled={false}>

                    <View style={styles.innermaster}>
                        <View style={{ height: '33%' }}>
                            <CreateLocationReviewHeader ImageSource={MarketImageSource} MarketName={MarketNameSource} navigation={this.props.navigation} />
                        </View>

                        {/* Select location View */}
                        <View style={{ flexDirection: 'row', backgroundColor: 'white', height: '33%', maxHeight: '33%', alignItems: 'center', justifyContent: 'space-around', }}>
                            <Icon name='pin' style={{ color: '#00CE66', fontSize: 44, paddingLeft: 13 }} />

                            <Autocomplete
                                style={{ position: 'relative', height: 40, zIndex: 6, paddingLeft: 35, backgroundColor: 'white' }}
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





                        {/* Footer area */}
                        <View style={{ width: '100%', justifyContent: 'space-around', alignItems: 'center', height: '27%', maxHeight: '33%' }}>
                            <View style={styles.view4}>
                                <Text style={{ fontSize: 16, color: 'gray' }}>Step 1/4</Text>
                            </View>
                            <View style={styles.progressbar}>
                                <LinearGradient
                                    style={styles.progress}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={['#ABE894', '#54E085']}></LinearGradient>
                            </View>

                            <TouchableOpacity style={{}}
                                onPress={() => this.props.navigation.navigate('CreateLocationReviewStep2', { 
                                    PassMarket: this.state.market 
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
    }
}

const styles = StyleSheet.create({
    master: {
        flex: 1,
        backgroundColor: 'white',
        maxHeight: Dimensions.get('window').height,
        backgroundColor: 'white',

    },
    masterscroll: {

    },
    innermaster: {
        backgroundColor: 'white',
        height: Dimensions.get('window').height - 30,
        justifyContent: 'space-between',
    },
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
        //marginLeft: 30,
        //marginRight: 30,
        backgroundColor: '#D2D2D2',
        borderRadius: 10,
        maxHeight: 14,
        height: 14,
        width: '95%'
    },
    progress: {
        marginRight: '75%',
        borderRadius: 10,
        maxHeight: 14,
        height: 14,


    },
})