import { SavePurchase,Params } from './../../../Domain/usercases/save-purchases';
import {CacheStore} from '@/data/protocols/cache'


export class LocalSavePurchase implements SavePurchase{
    constructor(private readonly cacheStore:CacheStore,private readonly timestamp:Date){}
    async save(purchases:Array<Params>):Promise<void>{
        this.cacheStore.delete('purchase')
        this.cacheStore.insert('purchase',{
            timestamp:this.timestamp,
            value:purchases
        })
    }
}