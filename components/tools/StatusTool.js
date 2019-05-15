
import {StatusBar,Platform} from 'react-native';
export const iOS = () => Platform.OS === 'ios'

export default function setStatusBar(isLight){

    StatusBar.setBarStyle(isLight?"light-content":'light-content');
    if (!iOS) {
      StatusBar.setTranslucent(false)
      StatusBar.setBackgroundColor('#fff');
    }
}