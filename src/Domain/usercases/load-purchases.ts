export interface LoadPurchase{
    loadAll:()=>Promise<Array<Params>>
}

export type Params={
    id:string,
    date:number,
    value:number
}