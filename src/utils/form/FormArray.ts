import { FormControl } from './FormControl' ;
import { FormGroup } from './FormgGroup' ;
import {merge, Observable} from 'rxjs';

export class FormArray{
    private controls : FormGroup[] = [];

    public valid : boolean = false ;

    public event$ : Observable<any> = new Observable() ;

    constructor( data : any[] ){
        data.forEach( item => {
            const formGroup : FormGroup = new FormGroup( item ) ;
            this.controls.push( formGroup ) ;
            this.event$ = merge(this.event$ , formGroup.event$ ) ;
        });

        this._sub() ;
    };

    public value() : { [ key : string ] : any }[]{
        const value : { [ key : string ] : any }[]= [] ;

        this.controls.forEach( item => {
            value.push( item.value() ) ;
        });


        return value;
    };

    private _sub() : void{
        this.event$
            .subscribe( res => {

                const result : boolean[] = this.controls.map( item => item.valid ) ;

                const hasFalse = result.indexOf( false ) ;

                if(!~hasFalse)
                    this.valid = true ;
                else
                    this.valid = false ;
            });
    };
}
