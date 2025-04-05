import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        textShadowRadius: 15,

    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    circular: {
        width: 12,
        height: 12,
        borderColor: '#82D58E',
        borderWidth: 2,
        borderRadius: 5,

    },
    itemText: {
        maxWidth: '80%',
        fontSize: 16,
        color: '#000',

    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#82D58E',
        opacity: .4,
        borderRadius: 2,
        marginRight: 15
    },

});

export default styles;