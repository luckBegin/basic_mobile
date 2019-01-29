import { combineLatest , Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
export interface control{
    value : any ;
    valid : boolean ;
    validators : any[] ;
}

export class FormControl implements control{
    _value : any ;

    valid : boolean = false ;

    validators : any[] ;

    event$ : Subject< any > = new Subject() ;

    notify : Subject< any > ;

    name : string ;

    constructor(value : string , validators : any[] , notify : Subject< any > , name : string ){
        this.value = value ;
        this.validators = validators ;
        this.notify = notify ;
        this.name = name ;
        this.validate()
    };

    public set value( value : any ){
        this._value = value ;
        this.event$.next(value) ;
    };

    public get value(){
        return this._value ;
    };

    private validate() : void {
        this.event$
            .pipe( debounceTime(200) )
            .subscribe( data => {
                const obsrs : any[] = [] ;

                this.validators.forEach( item => {
                    obsrs.push( item( this ) ) ;
                });

                combineLatest( obsrs )
                    .subscribe( ( res : boolean[]) => {
                        const hasFalse : number = res.indexOf(false) ;
                        if(!~hasFalse)
                            this.valid = true ;
                        else
                            this.valid = false ;

                        this.notify.next( { key : this.name , value : this.valid } ) ;
                    });
            });
    };
}
