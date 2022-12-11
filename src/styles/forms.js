import { StyleSheet } from 'react-native';
import Colors from './colors';

const FormsStyleSheet = StyleSheet.create({
    textInput: {
        height: 40,
        padding: 12,
        marginVertical: 4,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.muted,
        fontSize: 12,
        fontWeight: '600',
    },

    inputTitle: {
        color: Colors.muted,
        fontSize: 12,
        fontWeight: '600',
        marginVertical: 4,
        marginTop: 12,
    }

});

export default FormsStyleSheet;