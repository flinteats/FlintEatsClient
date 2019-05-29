import { StyleSheet, Dimensions } from 'react-native';


let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
    domainContain: {
        flex: 1,
    },
    imgContainter: {
        height: 250,
        maxHeight: 250,
    },
    recipeImg: {
        flex: 1,
        flexDirection: 'column',
        height: 250,
        maxHeight: 250,
        width: '100%',
    },

    // Top Nav
    // ======================================================
    topNav: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: deviceHeight * .09,
        // maxHeight: deviceHeight * .09,
        paddingTop: '3%',
        // backgroundColor: '#dc143c', // crimson (#dc143c)
        paddingLeft: 5,
        paddingRight: 5,
    },
    buttonLeft: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: deviceWidth * .3,
        width: deviceWidth * .3,
        width: deviceWidth * .3,
        height: deviceHeight * .06,
        marginRight: '30%',
        // backgroundColor: 'pink', // Pink
    },
    buttonRight: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: deviceWidth * .3,
        height: deviceHeight * .06,
        marginLeft: '30%',
        // backgroundColor: 'pink', // Pink
    },
    btntxt: {
        color: '#00CE66',
        fontSize: 20,
        textAlign: 'center'
    },
    topbtntxt: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center'
    },

    // Main Content
    // ======================================================
    extendedBody: {
        height: deviceHeight * .7,
        // backgroundColor: '#7fff00', // chartreuse (#7fff00)
    },
    fullBody: {
        height: deviceHeight * .6,
        // backgroundColor: '#7fff00', // chartreuse (#7fff00)
    },
    halfBody: {
        height: deviceHeight * .43,
        // backgroundColor: '#7fff00', // chartreuse (#7fff00)
    },
    quarterBody: {
        height: deviceHeight * .25,
        // backgroundColor: '#7fff00', // chartreuse (#7fff00)
    },
    logoContain: {
        alignItems: 'center',
        // backgroundColor: '#ff7f50', // coral
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 40,
        paddingBottom: 10,
    },
    stepContain: {
        // backgroundColor: '#ff7f50', // coral
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
        width: '90%',
    },

    // Center images 
    // -------------
    pic: {
        height: deviceHeight * .25,
        width: deviceWidth * .4,
    },
    addPhoto: {
        height: deviceHeight * .25,
        width: deviceWidth * .9,
    },
    stepAddPhoto: {
        height: deviceHeight * .2,
        width: '100%',
    },
    smallAddPhoto: {
        height: deviceHeight * .2,
        width: deviceWidth * .5,
    },
    // --------------
    view2: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        minHeight: 35,
    },
    view2txt: {
        fontSize: 20,
        color: '#565656'
    },
    title: {
        flex: 1,
        maxHeight: deviceHeight * .2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#6495ed', // cornflowerblue
    },
    stepTitle: {
        flex: 1,
        maxHeight: 25,
        height: 25,
    },
    view3: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 40,
        marginTop: 30,
    },
    location: {
        flex: 1,
        flexDirection: 'row',
        left: 0,
        right: 0,
        minHeight: 120,
        marginBottom: 24,
    },

    Button: {
        alignItems: 'center',
        padding: 10,
        color: '#00CE66',
        backgroundColor: null,
        borderRadius: 20,
        marginLeft: 30,
        borderColor: '#00CE66',
        borderWidth: 3,
        maxHeight: 40,
    },
    submitButton: {
        alignItems: 'center',
        padding: 10,
        color: '#00CE66',
        backgroundColor: null,
        borderRadius: 40,
        borderColor: '#00CE66',
        borderWidth: 3,
        minHeight: 60,
        paddingLeft: 20,
        paddingRight: 20,
        // backgroundColor: '#bdb76b' // darkkhaki (#bdb76b)
    },
    submitContain: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 30,
        // backgroundColor: '#ff7f50', // coral
    },
    // =====================================================

    progressbar: {
        marginTop: 0,
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#D2D2D2',
        borderRadius: 10,
        maxHeight: 14,
        height: 14,
    },
    progress: {
        marginRight: '80%',
        borderRadius: 10,
        maxHeight: 14,
        height: 14,
    },
    view4: {
        flex: 1,
        height: deviceHeight * .04,
        maxHeight: deviceHeight * .04,
        flexDirection: 'row',
        justifyContent: 'center',
        // backgroundColor: '#bdb76b' // darkkhaki (#bdb76b)
    },
    view5: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        height: deviceHeight * .09,
        marginLeft: 30,
        marginRight: 30,
        // backgroundColor: '#7fffd4', // aquamarine
    },
    card: {
        flex: 30,
        height: 140,
        backgroundColor: 'transparent'
    },
    autocomplete: {
        flex: 1,
        left: 0,
        position: 'absolute',
        right: 0,
        top: 0,
        zIndex: 1
    },
    autocompleteContain: {
        backgroundColor: '#F5FCFF',
        flex: 1,
        paddingTop: 25
    },
    
    tag: {
        borderRadius: 20,
        height: 25,
        minHeight: 25,
        marginRight: 5,
    },
    rating: {
        flex: 1,
        maxHeight: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    ingredient: {
        flex: 1,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: 10,
    },


    // Deal specific styles ======================
    dealImage: {
    },
    dealImageContain: {
        alignItems: 'center',
        justifyContent: 'center',
        height: deviceHeight * .2,
    }


});