import { Observable } from 'rxjs';
import { control } from './FormControl' ;

export class Validators {

    static min( length : number ) : Function {
        return function( control : control ) : Observable< boolean >{
            return new Observable( obsr => {
                const value : any = control.value ;

                if(typeof value === 'string' || typeof  value === 'number'){
                    obsr.next( value.toString().length >= length ) ;
                }else{
                    obsr.next(true) ;
                };
            });
        }
    }

    static max( length : number ) : Function {
        return function( control : control ) {
            return new Observable( obsr => {
                const value : any = control.value ;
                if(typeof value === 'string' || typeof  value === 'number'){
                    obsr.next( value.toString().length <= length ) ;
                }else{
                    obsr.next(true) ;
                };
            });
        }
    }

    static required( control : control ) : Observable< boolean > {
        return new Observable( obsr => {
            const value : any = control.value ;
            if(value !== null && value !== undefined && value !== ""){
                obsr.next(true) ;
            }else{
                obsr.next(false) ;
            };
        });
    }

    static phone( control : control ) : Observable< boolean>{
        const value = control.value ;
        const reg = /^1[346578]\d{9}$/ ;
        return new Observable( obsr => {
            obsr.next( reg.test(value)) ;
        })
    }
}
