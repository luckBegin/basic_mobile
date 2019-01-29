import {Subject} from 'rxjs';
import { FormControl } from './FormControl' ;
import {FormArray} from '@/utils/form/FormArray';

export class FormGroup {

    public readonly controls : { [key : string ] : FormControl | FormArray } = {} ;

    private readonly formGroup : any ;

    public valid : boolean = false ;

    public event$ : Subject< any > = new Subject() ;

    constructor(form : object ) {

        if(form){
            this.formGroup = form ;
            this.init() ;
        }
        else
            throw new Error("Invalid form input")

        this.event$
            .subscribe( data => {
                const result : boolean[] = [] ;

                Object.keys( this.controls ).forEach( key => {
                    result.push( this.controls[key].valid ) ;
                });

                const hasFalse = result.indexOf( false ) ;

                if(!~hasFalse)
                    this.valid = true ;
                else
                    this.valid = false ;
            })
    };

    init(): void{
        Object.keys(this.formGroup).forEach( key => {
            const config = this.formGroup[ key ] ;

            if(config instanceof FormArray){

                this.controls[key] = config ;

                config.event$.subscribe( res => {
                    this.event$.next("") ;
                });

            }else{
                const value = config[0] ;

                const control = new FormControl( value , config[1] , this.event$ , key ) ;

                this.controls[key] = control  ;
            };
        });
    };

    getControl( name : string ) : FormControl | FormArray | null {
        const control = this.controls[name] ;
        return control ? control : null ;
    };

    patchValue( data : any ){
        Object.keys( data ).forEach( key => {
            const control = this.getControl( key ) ;

            if(control)
                control.value = data[key] ;
        });
    };

    value() : any {
        const value : { [ key : string ] : any }= {} ;

        Object.keys( this.controls ).forEach( key => {
            const control = this.controls[key] ;

            if(control instanceof FormArray ){
                value[key] = control.value() ;
            }else{
                value[key] = control.value ;
            };
        });
        return value ;
    };
}
