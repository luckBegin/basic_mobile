import { Storage } from './basic' ; 

class LocalStorage extends Storage{
    constructor(){
        super(window.localStorage) ;
    }
};

export const LocalStorageService = new LocalStorage ;
