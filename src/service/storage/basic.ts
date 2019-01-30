export class Storage{
    constructor( storageObj : any ){
        this.storage  = storageObj ;
    };

    storage : any ;

    private typeCheck : Function = ( type : string , obj : any ) : boolean => {
        return Object.prototype.toString.call(obj) === '[object '+type+']';
    };

    set( key : string , value : Array< any > | Object | number | string | boolean ) : Storage {

      if( this.typeCheck("String",value) ){
        // @ts-ignore
          this.storage[key] = value;
      }else{
        // @ts-ignore
          this.storage[key] = JSON.stringify(value);
      }

      return this ;
    };

    get( key : string ) : any {
      // @ts-ignore
      const value = this.storage[key];
      try{
        return JSON.parse(value);
      }catch(e){
        return value
      };
    };

    clear() : Storage {
        this.storage.clear() ;
        return this ;
    };

    remove( list : Array< String > ) : Storage {
      for(var key in list){
        // @ts-ignore
          this.storage.removeItem(list[key]) ;
      };
      return this;
    };
}
