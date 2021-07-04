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

describe("LocalLoadPurchase", () => {
  test("Should not delete or insert cache on sut.in", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.messages).toEqual([]);
  });

});
