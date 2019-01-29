import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax' ;
import { RESPONSE } from '@/model'
import { ObjectUtil } from '@/utils/object.util';

export  class HttpHeaders{
    private headers : { [key : string] : string } = {} ;

    public set : Function = (key : string , value : string) : HttpHeaders => {
        this.headers[key] = value ;
        return this ;
    };

    public get : Function = () : object => {
        return this.headers ;
    };
}

export class HttpParams {
    private para : { [key : string ] : string } = {} ;

    public set : Function = (key : string , value : string ) : HttpParams => {
        this.para[key] = value ;
        return this ;
    }

    public toStr() : string {
        return ObjectUtil.objToStr( this.para ) ;
    }

    public toFormData() : FormData {
        const formData : FormData = new FormData ;

        Object.keys(this.para).forEach( item => {
            formData.append( item , this.para.item ) ;
        });

        return formData ;
    };

    public get() : object {
        return this.para ;
    }
}
class BasicHttpClass{

    private _header = new HttpHeaders ;

    public setHeader  = (key :  string , value : string )  : BasicHttpClass => {
        this._header.set(key , value ) ;
        return this ;
    };

    private errorHandle : any ;

    public setErrorHandle ( fn : Function ) : void {
        this.errorHandle = fn ;
    };

    public get  = ( url : string , config ?: { params ?: HttpParams , headers ?: HttpHeaders } ) : Observable< RESPONSE > => {
        const _this = this ;
        return new Observable( obsr => {
            let _url = url ;
            const header = config && config.headers ? config.headers.get() : {} ;

            if(config && config.params )
                _url += "?" + config.params.toStr() ;

            const _header = ObjectUtil.extend(_this._header.get() , header ) ;
            ajax.get( _url , _header )
                .subscribe( ( res ) => {
                    obsr.next( res.response ) ;
                } , error => {
                    this.errorHandle( error ) ;
                    obsr.error( error ) ;
                });
        });
    }

    public post = ( url : string , data : HttpParams | FormData , config ?: { headers : HttpHeaders } ) : Observable< RESPONSE > => {
        const _this = this ;
        return new Observable( obsr => {
            const _url = url ;
            const header = config && config.headers ? config.headers.get() : {} ;

            const body = data instanceof HttpParams ? data.get() : data ;
            const _header = ObjectUtil.extend(_this._header.get() , header ) ;

            ajax.post( _url  , data , _header )
                .subscribe( ( res ) => {
                    obsr.next( res.response ) ;
                } , error => {
                    this.errorHandle( error ) ;
                    obsr.error( error ) ;
                });
        });
    }

    public put = ( url : string , data : HttpParams | FormData , config ?: { headers : HttpHeaders } ) : Observable< RESPONSE > => {
        const _this = this ;
        return new Observable( obsr => {
            const _url = url ;
            const header = config && config.headers ? config.headers.get() : {} ;
            const body = data instanceof HttpParams ? data.get() : data ;
            const _header = ObjectUtil.extend(_this._header.get() , header ) ;

            ajax.put( _url  , data , _header )
                .subscribe( ( res ) => {
                    obsr.next( res.response ) ;
                } , error => {
                    this.errorHandle( error ) ;
                    obsr.error( error ) ;
                });
        });
    }

    public delete = ( url : string , config ?: { headers : HttpHeaders } ) : Observable< RESPONSE > => {
        const _this = this ;
        return new Observable( obsr => {
            const _url = url ;
            const header = config && config.headers ? config.headers.get() : {} ;
            const _header = ObjectUtil.extend(_this._header.get() , header ) ;

            ajax.delete( _url , _header )
                .subscribe( ( res ) => {
                    obsr.next( res.response ) ;
                } , error => {
                    this.errorHandle( error ) ;
                    obsr.error( error ) ;
                });
        });
    }
}

export const HTTP = new BasicHttpClass ;

