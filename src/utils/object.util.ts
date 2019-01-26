export class ObjectUtil {
    static objToStr( data : { [key:string] : any } ) : string {
        let str = '' ;
        Object.keys(data).forEach( item => str += item + "=" + data.item + "&") ;
        return str ;
    }
    static extend(target : { [ key : string] : string } , src : { [ key : string] : string } ) : object {
        const obj : { [ key : string] : string }= {} ;

        Object.keys( src ).forEach( item => {
            obj.item = src.item ;
        }) ;

        Object.keys(target).forEach( item => {
            obj.item = target.item ;
        });

        return obj ;
    }
}
