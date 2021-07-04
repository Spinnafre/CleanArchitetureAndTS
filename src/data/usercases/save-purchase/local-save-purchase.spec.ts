import { ChacheStoreSpy,testOrder } from '../../tests/mock-cache';
import { mockPurchase } from '../../tests/mock-purchase';
import { LocalSavePurchase } from "@/data/usercases";


type sutType = {
  sut: LocalSavePurchase;
  cacheStore: ChacheStoreSpy;
};

const makeSut = (timestamp=new Date()): sutType => {
  const cacheStore = new ChacheStoreSpy();
  const sut = new LocalSavePurchase(cacheStore,timestamp);
  return {
    sut,
    cacheStore,
  };
};

describe("LocalSavePurchase", () => {
  test("Should not delete or insert cache on sut.in", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.messages).toEqual([]);
  });
  test("Should delete old cache on sut.save", async () => {
    const { sut, cacheStore } = makeSut();
    await sut.save(mockPurchase());
    expect(cacheStore.messages).toEqual([testOrder.delete,testOrder.insert]);
    expect(cacheStore.deletekey).toBe("purchase");
  });
  test("Should not insert new Cache if delete fails", async () => {
    const { sut, cacheStore } = makeSut();
    jest.spyOn(cacheStore, "delete").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.save(mockPurchase());
    expect(cacheStore.messages).toEqual([]);
    expect(promise).rejects.toThrow();
  });
  test("Should insert new Cache if delete succeeds", async () => {
    const timestamp=new Date()
    const { sut, cacheStore } = makeSut(timestamp);
    const purchase = mockPurchase();
    const promise= sut.save(purchase);
    expect(cacheStore.messages).toEqual([testOrder.delete,testOrder.insert]);
    expect(cacheStore.insertValues).toEqual({
      timestamp:timestamp,
      value:purchase
    });
    await expect(promise).resolves.toBeUndefined()
  });
  test("Should throw if insert throws", async () => {
    const { sut, cacheStore } = makeSut();
    jest.spyOn(cacheStore, "insert").mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.save(mockPurchase());
    //Espero que a promisse seja rejeitada lançando um erro
    expect(promise).rejects.toThrow();
  });
});
