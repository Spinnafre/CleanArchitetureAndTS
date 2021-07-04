import { ChacheStoreSpy,testOrder } from '../../tests/mock-cache';
import { mockPurchase } from '../../tests/mock-purchase';
import { LocalLoadSavePurchase} from "@/data/usercases";


type sutType = {
  sut: LocalLoadSavePurchase;
  cacheStore: ChacheStoreSpy;
};

const makeSut = (timestamp=new Date()): sutType => {
  const cacheStore = new ChacheStoreSpy();
  const sut = new LocalLoadSavePurchase(cacheStore,timestamp);
  return {
    sut,
    cacheStore,
  };
};

const makeOlderTimestamp=(time:Date):Date=>{
  const timestamp=new Date(time)
  timestamp.setDate(timestamp.getDate()-3)
  timestamp.setSeconds(timestamp.getSeconds()-1)
  return timestamp
}
const makeNewTimestamp=(time:Date):Date=>{
  const timestamp=new Date(time)
  timestamp.setDate(timestamp.getDate()-2)
  timestamp.setSeconds(timestamp.getSeconds()-1)
  return timestamp
}

describe("LocalLoadPurchase", () => {
  test("Should not delete or insert cache on sut.in", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.messages).toEqual([]);
  });
  test("Should call correct key on load", async () => {
    const { sut, cacheStore } = makeSut();
    
    jest.spyOn(cacheStore,'fetch').mockImplementationOnce(()=>{
      cacheStore.messages.push(testOrder.fetch)
      throw new Error()
    })
    const promise=await sut.loadAll()
    expect(cacheStore.deletekey).toBe('purchase')
    expect(promise).toEqual([])
  });
  test("Should not return a list of purchases if cache is greater than expiration", async () => {
    const currentDate=new Date()
    const timestamp=makeOlderTimestamp(currentDate)
    const { sut, cacheStore } = makeSut(currentDate);
    cacheStore.fetchValues={
      timestamp,
      value:mockPurchase()
    }
    const promise=await sut.loadAll()
    expect(cacheStore.messages).toEqual([testOrder.fetch,testOrder.delete])
    expect(cacheStore.fetchKey).toBe('purchase')
    expect(cacheStore.deletekey).toBe('purchase')
    expect(promise).toEqual([])
  });
  test("Should return a list of purchases if cache is less than expiration",async ()=>{
    const currentDate=new Date()
    //2 days old
    const timestamp=makeNewTimestamp(currentDate)
    const { sut, cacheStore } = makeSut(currentDate);
    cacheStore.fetchValues={
      timestamp,
      value:mockPurchase()
    }
    const promise=await sut.loadAll()
    expect(cacheStore.messages).toEqual([testOrder.fetch])
    expect(cacheStore.fetchKey).toBe('purchase')
    expect(promise).toEqual(cacheStore.fetchValues.value)


  })
});
