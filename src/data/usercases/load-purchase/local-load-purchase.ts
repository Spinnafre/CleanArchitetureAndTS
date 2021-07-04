import { SavePurchase, Params } from './../../../Domain/usercases/save-purchases';
import { CacheStore } from '@/data/protocols/cache'
import { LoadPurchase } from '@/Domain/usercases/load-purchases';
import { CachePolicy } from '@/data/protocols/cache/cache-policy';


export class LocalLoadSavePurchase implements SavePurchase, LoadPurchase {
    constructor(private readonly cacheStore: CacheStore, private readonly currentDate: Date) { }
    async save(purchases: Array<Params>): Promise<void> {
        this.cacheStore.delete('purchase')
        this.cacheStore.insert('purchase', {
            timestamp: this.currentDate,
            value: purchases
        })
    }
    async loadAll(): Promise<Array<Params>> {
        try {
            const cache = this.cacheStore.fetch('purchase')
            if(CachePolicy.calcExpiration(this.currentDate,cache.timestamp)){
                return cache.value
            }else{
                throw new Error()
            }
        } catch (error) {
            this.cacheStore.delete('purchase')
            return []
        }
    }
}