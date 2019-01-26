import {Subject} from 'rxjs';

class JsCall {

    private event$  : Subject< any > = new Subject() ;

    constructor(){
    }

    public JSCALL( eventName : string , data : any){
        const _this = this ;
        try {
            _this.execute( eventName , data ) ;
        }catch (e) {
            console.log(e) ;
        };
    };

    private execute( name : string , data : any ){
        // @ts-ignore
        this[name].call(this , data) ;
    }

    private getA( data : any ){
        console.log(data) ;
    }
}

export const JsCallService  = new JsCall() ;

// @ts-ignore
window['JSCALL'] = function( eventName : string , data : any ){
    JsCallService.JSCALL.call(JsCallService , eventName , data) ;
};
