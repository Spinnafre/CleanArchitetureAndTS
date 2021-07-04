import { Params } from "./../../Domain/usercases";
import { CacheStore } from "@/data/protocols/cache";
export class ChacheStoreSpy implements CacheStore {
  messages: Array<testOrder> = []
  deletekey: string;
  insertkey: string;
  fetchKey:string;
  fetchValues:any
  public insertValues: Array<Params> = [];
  delete(key: string) {
    this.messages.push(testOrder.delete)
    this.deletekey = key;
  }
  insert(key: string, value: any): void {
    this.messages.push(testOrder.insert)
    this.insertkey = key;
    this.insertValues = value;
  }
  fetch(key: string):any{
    this.fetchKey=key
    this.messages.push(testOrder.fetch)
    return this.fetchValues
  }
}

export enum testOrder {
  delete,
  insert,
  fetch
}