import { Storage } from './basic' ;

class SesssionStorage extends Storage{
    constructor(){
        super(window.sessionStorage) ;
    };
};

export const SesssionStorageService = new SesssionStorage ;
