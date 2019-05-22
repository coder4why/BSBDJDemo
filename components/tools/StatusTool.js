
import {StatusBar,Platform} from 'react-native';
export const iOS = () => Platform.OS === 'ios'

export default function setStatusBar(isLight){

    StatusBar.setBarStyle(isLight?"default":'default');
    if (!iOS) {
      StatusBar.setTranslucent(false)
      StatusBar.setBackgroundColor('#fff');
    }
}