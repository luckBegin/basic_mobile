import { GetNumService as AndroidGetNum } from './android' ;
import { GetNumService as IOSGetNum} from './ios' ;

class JsBridge{
    public DeviceDetect = ( OsType : "Iphone" | "Android") : boolean => {
        const reg = new RegExp(OsType , 'g') ;
        return reg.test( window.navigator.userAgent ) ;
    };

    public isAndroid : boolean = this.DeviceDetect("Android") ;

    getNum() : void {
        if(this.isAndroid){
            console.log(AndroidGetNum.get());
        }else{
            console.log(IOSGetNum.get()) ;
        }
    }
}
export const JsBridgeService = new JsBridge ;
