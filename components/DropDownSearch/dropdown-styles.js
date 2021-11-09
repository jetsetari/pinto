import {
    StyleSheet
} from 'react-native';

export const ICONS = {
    ARROW_DOWN: require('./icons/arrow-down.png'),
    ARROW_UP: require('./icons/arrow-up.png'),
    TICK: require('./icons/tick.png'),
    CLOSE: require('./icons/close.png')
};

export default StyleSheet.create({
    container: {
        width: '100%',
        zIndex:999,
        position:"relative"
    },
    style: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#006443",
        paddingHorizontal: 10,
        backgroundColor: "#006443",
        zIndex:999,
        position:"relative"
    },
    label: {
        flex: 1,
        color: "#fff"
    },
    labelContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    arrowIcon: {
        width: 20,
        height: 20
    },
    tickIcon: {
        width: 20,
        height: 20
    },
    closeIcon: {
        width: 30,
        height: 30
    },
    badgeStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: "#006443",
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    badgeDotStyle: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginRight: 8,
        backgroundColor: "#006443"
    },
    badgeSeparator: {
        width: 5,
    },
    listBody: {
        height: '100%',
    },
    listBodyContainer: {
        flexGrow: 1,
        alignItems: 'center',
    },
    dropDownContainer: {
        position: 'absolute',
        backgroundColor: "#006443",
        borderRadius: 8,
        borderColor: "#006443",
        borderWidth: 1,
        width: '100%',
        overflow: 'hidden',
        zIndex: 1000
    },
    modalContentContainer: {
        flexGrow: 1,
        backgroundColor: "#006443"
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        height: 40
    },
    listItemLabel: {
        flex: 1,
        color: "#fff"
    },
    iconContainer: {
        marginRight: 10
    },
    arrowIconContainer: {
        marginLeft: 10
    },
    tickIconContainer: {
        marginLeft: 10
    },
    closeIconContainer: {
        marginLeft: 10
    },
    listParentLabel: {

    },
    listChildLabel: {

    },
    listParentContainer: {

    },
    listChildContainer: {
        paddingLeft: 40,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomColor: "#006443",
        borderBottomWidth: 1
    },
    searchTextInput: {
        flexGrow: 1,
        flexShrink: 1,
        margin: 0,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderWidth: 0,
        color: "#fff"
    },
    itemSeparator: {
        height: 1,
        backgroundColor: "#006443",
    },
    flatListContentContainer: {
        flexGrow: 1
    },
    customItemContainer: {

    },
    customItemLabel: {
        fontStyle: 'italic'
    },
    listMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    listMessageText: {

    },
    selectedItemContainer: {

    },
    selectedItemLabel: {

    }
});