import {FormGroup} from '@/utils/form/FormgGroup';
import {FormArray} from '@/utils/form/FormArray';

export class FormBuilder {
    static group( data : any ){
        return new FormGroup( data ) ;
    }

    static array( data : any[] ){
        return new FormArray( data ) ;
    }
};
