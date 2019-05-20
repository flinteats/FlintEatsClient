import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { StyleSheet, Text, TouchableOpacity, View, TextInput, Dimensions } from 'react-native';
import { Icon, } from 'native-base';
import Autocomplete from 'react-native-autocomplete-input';
import LinearGradient from 'react-native-linear-gradient';
import CreateLocationReviewHeader from './location-review-header'
import MSU from '../msu';
export default class CreateLocationReviewScreenStep3 extends React.Component {

    constructor(props) {
        super(props);
        // [this state member] : [default value],
        //etc....
    }

    render() {
        return (
            <KeyboardAwareScrollView>
                

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
        marginRight: '60%',
        borderRadius: 10,
        maxHeight: 14,
        height: 14,
    },

})