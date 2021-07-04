export interface SavePurchase{
    save:(purchases:Array<Params>)=>Promise<void>
}

export type Params={
    id:string,
    date:number,
    value:number
}