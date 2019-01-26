export class ObjectUtil {
    static objToStr( data : { [key:string] : any } ) : string {
        let str = '' ;
        Object.keys(data).forEach( ( key , index , raw ) => {
            str += key + "=" + data[key] ;
            if( index + 1 < raw.length )
                str += "&";
        }) ;
        return str ;
    }
    static extend(target : { [ key : string] : string } , src : { [ key : string] : string } ) : object {
        const obj : { [ key : string] : string }= {} ;

        Object.keys( src ).forEach( key => {
            obj[key] = src[key] ;
        }) ;

        Object.keys(target).forEach( key => {
            obj[key] = target[key] ;
        });

        return obj ;
    }
}
