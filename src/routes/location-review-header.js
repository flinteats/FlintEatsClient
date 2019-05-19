import React from 'react';
import { Alert, Image, Button, StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView, KeyboardAvoidingView, Dimensions } from 'react-native';

export default class CreateLocationReviewHeader extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <View style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'white',
                height: '100%',
                maxHeight:'100%'
            }}
            >
                {/* Back and Save buttons */}
                <View style={{ zIndex: 1, height: '37%', width: '100%', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableOpacity
                        style={{ marginLeft: 10 }}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Text style={{
                            color: '#00CE66',
                            fontSize: 20,
                            textAlign: 'center'
                        }}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ marginRight: 10 }}
                    >
                        <Text style={{
                            color: '#00CE66',
                            fontSize: 20,
                            textAlign: 'center'
                        }}>Save</Text>
                    </TouchableOpacity>
                </View>

                {/* Market Title */}
                <Text style={{ fontSize: 25, color: 'black', marginBottom: 5, color:'gray' }}>{this.props.MarketName}</Text>

                {/* Image */}
                <View style={{ zIndex: 0, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', justifyContent: 'center' }}>
                    <Image source={this.props.ImageSource} style={{ alignSelf: 'center' }} />
                </View>
            </View>

        );
    }
}
