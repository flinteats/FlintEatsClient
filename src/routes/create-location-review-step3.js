import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import { Icon, } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';
import LinearGradient from 'react-native-linear-gradient';
import CreateLocationReviewHeader from './location-review-header'
import MSU from '../msu';


const camera = require('../../res/camera.png');

let MarketNameSource;
let MarketImageSource;

export default class CreateLocationReviewScreenStep3 extends React.Component {

    constructor(props) {
        super(props);
        if (this.props.navigation.getParam('PassMarket', null)) {
            this.state = {
                draw:0,
                uri: false,
                market: this.props.navigation.getParam('PassMarket', null),
                marketText: ' '
            }
        } else {
            this.state = {
                draw: 0,
                uri: false,
                //Reference to the current market object 
                market: null,
                //The current text of the market search
                marketText: '',
            }
            // [this state member] : [default value],
            //etc....
        }
    }

    static navigationOptions = ({ navigation }) => ({
        header: null,
    });

    render() {
        const clean = this.props.navigation.getParam('clean', null);
        const friendly = this.props.navigation.getParam('friendly', null);
        const selection = this.props.navigation.getParam('selection', null);
        const access = this.props.navigation.getParam('access', null);
        const safe = this.props.navigation.getParam('safe', null);

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
                <KeyboardAwareScrollView>
                    <View style={styles.innermaster}>
                        <View style={{ height: '33%', maxHeight: '33%' }}>
                            <CreateLocationReviewHeader ImageSource={MarketImageSource} MarketName={MarketNameSource} navigation={this.props.navigation} />
                        </View>


                        <View style={{ height: '33%', maxHeight: '33%' }}>
                            <TextInput autoFocus={false}
                                onChangeText={(title) => this.setState({ title })}
                                placeholder='What are your thoughts on this market?'></TextInput>
                        </View>


                        {/* Footer area */}
                        <View style={{ width: '100%', justifyContent: 'space-around', alignItems: 'center', height: '27%', maxHeight: '27%' }}>
                            <View style={styles.view4}>
                                <Text style={{ fontSize: 16, color: 'gray' }}>Step 3/4</Text>
                            </View>
                            <View style={styles.progressbar}>
                                <LinearGradient
                                    style={styles.progress}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    colors={['#ABE894', '#54E085']}></LinearGradient>
                            </View>

                            <TouchableOpacity style={{}}
                                onPress={() => this.props.navigation.navigate('CreateLocationReviewStep4', {
                                    PassMarket: this.state.market,
                                    Clean: clean,
                                    Friendly: friendly,
                                    Selection: selection,
                                    Access: access,
                                    Safe: safe,
                                    text: this.state.title,
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
        marginRight: '25%',
        borderRadius: 10,
        maxHeight: 14,
        height: 14,
    },

})