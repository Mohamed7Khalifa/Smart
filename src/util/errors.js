import { ToastAndroid } from "react-native";

const ERRORS = {
    'NOT_FOUND': 'The room you are trying to access does not exist!',
    'REQUEST_TIMEOUT': 'The device is not responding!',
    'UNREACHABLE' : 'The end device is unreachable, this may indicate communiation issues!',
    'NEXT_HOP_UNREACHABLE' : 'The end device is unreachable, this may indicate communiation issues!',
    // 'Network request failed':'Offline network'
}

function handleError(e){
    ToastAndroid.showWithGravityAndOffset(ERRORS[e.error], ToastAndroid.LONG, ToastAndroid.BOTTOM, 100, 100);
}

export default handleError;