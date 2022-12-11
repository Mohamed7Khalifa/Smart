import { StyleSheet } from "react-native";

const Colors = {
    light: '#f2f2f7',
    primary: '#34c759',
    danger: '#de4251',
    warning: '#feeb08',
    info: '#F0F',
    dark: '#2A2A37',
    white: '#FAFCFF',
    black: '#000',
    muted: '#D6D6D6',
    transparent: '#00000000',
    prettyGray: "#848484",
    gray100: '#e5e5e5',
    gray200: '#e9ecef',
    gray300: '#dee2e6',
    gray400: '#ced4da',
    gray500: '#adb5bd',
    gray600: '#6c757d',
    gray700: '#495057',
    gray800: '#343a40',
    gray900: '#212529',
}

const ColorsStyleSheet = StyleSheet.create({
    bgLight: {
        backgroundColor: Colors.light
    },
    bgPrimary: {
        backgroundColor: Colors.primary
    },
    bgDanger: {
        backgroundColor: Colors.danger
    },
    bgWarning: {
        backgroundColor: Colors.warning
    },
    bgInfo: {
        backgroundColor: Colors.info
    },
    bgDark: {
        backgroundColor: Colors.dark
    },
    bgWhite: {
        backgroundColor: Colors.white
    },
    bgBlack: {
        backgroundColor: Colors.black
    },
    bgMuted: {
        backgroundColor: Colors.muted
    },
    textLight: {
        color: Colors.light
    },
    textPrimary: {
        color: Colors.primary
    },
    textDanger: {
        color: Colors.danger
    },
    textWarning: {
        color: Colors.warning
    },
    textInfo: {
        color: Colors.info
    },
    textDark: {
        color: Colors.dark
    },
    textWhite: {
        color: Colors.white
    },
    textBlack: {
        color: Colors.black
    },
    textMuted: {
        color: Colors.muted
    },
});
export default Colors;