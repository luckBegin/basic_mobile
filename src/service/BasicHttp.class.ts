import { Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax' ;
import { RESPONSE } from '../model'
import {ObjectUtil} from '@/utils/object.util';
export  class HttpHeaders{
    private headers : { [key : string] : string } = {} ;

    public set : Function = (key : string , value : string) : HttpHeaders => {
        this.headers.key = value ;
        return this ;
    }

    public get : Function = () : object => {
        return this.headers ;
    }
};

export class HttpParams {
    private para : { [key : string ] : string } = {} ;

    public set : Function = (key : string , value : string ) : HttpParams => {
        this.para.key = value ;
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

    public get  = ( url : string , config ?: { params : HttpParams , headers : HttpHeaders } ) : Observable< RESPONSE > => {
        return new Observable( obsr => {
            const _url = url ;
            const header = config && config.headers ? config.headers.get() : {} ;

            if(config && config.params )
                url += "?" + config.params.toStr() ;

            const _header = ObjectUtil.extend(this._header.get() , header ) ;
            ajax.get( _url , _header )
                .subscribe( ( res ) => {
                    obsr.next( res.response ) ;
                });
        });
    }

    public post = ( url : string , data : HttpParams | FormData , config ?: { headers : HttpHeaders } ) : Observable< RESPONSE > => {
        return new Observable( obsr => {
            const _url = url ;
            const header = config && config.headers ? config.headers.get() : {} ;

            const body = data instanceof HttpParams ? data.get() : data ;
            const _header = ObjectUtil.extend(this._header.get() , header ) ;

            ajax.post( _url  , data , _header )
                .subscribe( ( res ) => {
                    obsr.next( res.response ) ;
                });
        });
    }

    public put = ( url : string , data : HttpParams | FormData , config ?: { headers : HttpHeaders } ) : Observable< RESPONSE > => {
        return new Observable( obsr => {
            const _url = url ;
            const header = config && config.headers ? config.headers.get() : {} ;

            const body = data instanceof HttpParams ? data.get() : data ;
            const _header = ObjectUtil.extend(this._header.get() , header ) ;

            ajax.put( _url  , data , _header )
                .subscribe( ( res ) => {
                    obsr.next( res.response ) ;
                });
        });
    }

    public delete = ( url : string , config ?: { headers : HttpHeaders } ) : Observable< RESPONSE > => {
        return new Observable( obsr => {
            const _url = url ;
            const header = config && config.headers ? config.headers.get() : {} ;
            const _header = ObjectUtil.extend(this._header.get() , header ) ;

            ajax.delete( _url , _header )
                .subscribe( ( res ) => {
                    obsr.next( res.response ) ;
                });
        });
    }
}

export  const HTTP = new BasicHttpClass ;

