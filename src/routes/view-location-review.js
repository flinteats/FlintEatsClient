import React from 'react';
import { View } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import CreateLocationReviewHeader from './location-review-header'

const camera = require('../../res/camera.png');

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

        return (
            <KeyboardAwareScrollView>
                {/* Header Area */}
                <View style={{height: Dimensions.get('window').height * 0.33}}>
                    <CreateLocationReviewHeader style={{ height:'100%', width: '100%', backgroundColor: 'white' }}
                        MarketName='Text' ImageSource={camera} navigation={this.props.navigation} />
                </View>

                

                {/* The text for the review area */}
                <View></View>

                {/* Star boxes for the review */}

                {/* Tags */}
            </KeyboardAwareScrollView>
        );
    }


}