import { Params } from "./../../Domain/usercases/save-purchases";
import {random,datatype,time} from "faker";


export const mockPurchase = (): Params[] => [
  {
    id: datatype.uuid(),
    date: time.recent(),
    value: datatype.number(),
  },
  {
    id: datatype.uuid(),
    date: time.recent(),
    value: datatype.number(),
  },
];
