export class CachePolicy{
    private constructor(){}
    static calcExpiration(current:Date,time:Date):boolean{
        const timestamp=new Date(time)
        timestamp.setDate(timestamp.getDate()+3)
        return current<timestamp
    }
}