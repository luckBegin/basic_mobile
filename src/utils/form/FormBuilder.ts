import { combineLatest , Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
export interface control{
    value : any ;
    valid : boolean ;
    validators : any[] ;
}

class FormControl implements control{

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
        this.validate() ;
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
            .pipe( debounceTime(300))
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

export class FormGroup {

    public readonly controls : { [key : string ] : FormControl } = {} ;

    private readonly formGroup : any ;

    public valid : boolean = false ;

    public event$ : Subject< any > = new Subject() ;

    private controlsValid : { [ name : string] : boolean } = {} ;


    constructor(form : object ) {

        if(form){
            this.formGroup = form ;
            this.init() ;
        }
        else
            throw new Error("Invalid form input") ;

        this.event$
            .subscribe( data => {
                this.controlsValid[data.key] = data.value ;
                const result : boolean[] = [] ;

                Object.keys( this.controlsValid ).forEach( key => {
                    result.push( this.controlsValid[key] ) ;
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
            const value = config[0] ;
            const control = new FormControl( value , config[1] , this.event$ , key ) ;
            this.controls[key] = control  ;
        });
    };

    getControl( name : string ) : FormControl | null {
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
            value[key] = this.controls[key].value ;
        });

        return value ;
    };
}
