import React from 'react';
import { BackHandler, Button, Text, TextInput, StyleSheet, TouchableOpacity, View, Image, ImageBackground } from 'react-native';
import Permissions from 'react-native-permissions';
import ImagePicker from 'react-native-image-picker';

import styles from './style';
const addPhoto = require('../../res/addAphoto.png');

export default class StepInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSource: null,
        }
    }
    componentDidMount() {
    }

    onTextChange = (text) => {
        this.props.changeText(text, this.props.id);
    }

    checkPermissions() {
        let allow = true;
        Permissions.checkMultiple(['camera', 'photo'])
            .then(res => {
                if (res.camera == 'authorized'
                    && res.photo == 'authorized') {
                    this.setPic();
                } else if (res.camera != 'authorized'
                    && res.photo == 'authorized') {
                    Permissions.request('camera')
                        .then(rez => {
                            if (rez == 'authorized') {
                                this.setPic();
                            } else {
                                Alert.alert('Insufficient Permissions',
                                    'Flint Eats was not granted Camera permissions.');
                            }
                        });
                } else if (res.photo != 'authorized'
                    && res.camera == 'authorized') {
                    Permissions.request('photo')
                        .then(rez => {
                            if (rez == 'authorized') {
                                this.setPic();
                            } else {
                                Alert.alert('Insufficient Permissions',
                                    'Flint Eats was not granted Photo permissions.');
                            }
                        });
                } else {
                    Permissions.request('photo')
                        .then(rez => {
                            if (rez == 'authorized') {
                                Permissions.request('camera')
                                    .then(rex => {
                                        if (rex == 'authorized') {
                                            this.setPic();
                                        } else {
                                            Alert.alert('Insufficient Permissions',
                                                'Flint Eats was not granted Camera permissions.');
                                        }
                                    });
                            } else {
                                Alert.alert('Insufficient Permissions',
                                    'Flint Eats was not granted Photo permissions.');
                            }
                        });
                }
            });
    }

    setPic() {
        let options = {};
        ImagePicker.showImagePicker(options, (res) => {
            if (res.didCancel) {
                console.log('User cancelled image picker');
            } else if (res.error) {
                console.log('ImagePicker Error: ', res.error);
            } else if (res.customButton) {
                console.log('User tapped custom button: ', res.customButton);
            } else {
                let imgSource = res.data;
                this.setState({ imgSource });
            }
        });
    }

    render() {
        const imgSource = this.props.img;
        const stepNum = this.props.id + 1;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'stretch',
                marginTop: 10,
                borderBottomWidth: 1,
                borderBottomColor: '#B8B8B8',
            }}>
                <View style={styles.stepContain}>
                    <Text style={styles.stepTitle}>Step {JSON.stringify(stepNum)}</Text>

                    <TouchableOpacity
                        onPress={() => this.checkPermissions()}
                        style={{ justifyContent: "center", alignItems: "center", }}>
                        <Image
                            resizeMode='contain'
                            style={styles.stepAddPhoto}
                            source={this.state.imgSource
                                ? { uri: 'data:image/png;base64,' + this.state.imgSource }
                                : addPhoto}
                        />
                    </TouchableOpacity>
                    <TextInput
                        style={{ fontSize: 20, flex: 1, }}
                        autoFocus={false}
                        multiline={true}
                        onChangeText={this.onTextChange}
                        placeholder={'Add instructions...'}
                        placeholderTextColor={'#a0a0a0'}
                        returnKeyType={"next"} />
                </View>


            </View>
        )
    }
}


// const styles = StyleSheet.create({
//     title: {
//         flex: 1,
//         maxHeight: 25,
//         height: 25,
//     },
//     recipeImg: {
//         flex: 1,
//         flexDirection: 'column',
//         height: 250,
//         maxHeight: 250,
//         width: '100%',
//     },
//     view1: {
//         flex: 1,
//         flexDirection: 'row',
//         height: 60,
//         maxHeight: 60,
//     },
//     view2: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         marginBottom: 10,

//     },
//     view2txt: {
//         fontSize: 20,
//         color: '#565656'
//     },
//     step: {
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'stretch',
//         marginTop: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#B8B8B8',
//     },
//     view3: {
//         flex: 1,
//         flexDirection: 'row',
//         maxHeight: 40,
//         marginTop: 30,
//     },
//     Button: {
//         alignItems: 'center',
//         padding: 10,
//         color: '#00CE66',
//         backgroundColor: null,
//         borderRadius: 20,
//         marginLeft: 30,
//         borderColor: '#00CE66',
//         borderWidth: 3,
//         maxHeight: 40,
//     },
//     view4: {
//         flex: 1,
//         maxHeight: 30,
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },
//     progressbar: {
//         marginTop: 0,
//         paddingTop: 0,
//         paddingBottom: 0,
//         marginLeft: 30,
//         marginRight: 30,
//         backgroundColor: '#D2D2D2',
//         borderRadius: 10,
//         maxHeight: 14,
//         height: 14,
//     },
//     progress: {
//         marginRight: '40%',
//         borderRadius: 10,
//         maxHeight: 14,
//         height: 14,

//     },
//     view5: {
//         flex: 1,
//         flexDirection: 'row',
//         maxHeight: 60,
//         height: 60,
//         marginLeft: 30,
//         marginRight: 30,
//         marginTop: 30,
//     },
//     pic: {
//         width: 350,
//         height: 200,
//     },
//     button: {
//         flex: 1,
//         flexDirection: 'column',
//         justifyContent: 'center',
//     },
//     btntxt: {
//         color: '#00CE66',
//         fontSize: 20,
//         textAlign: 'center'
//     },
//     topbtntxt: {
//         color: 'white',
//         fontSize: 20,
//         textAlign: 'center'
//     },
// });