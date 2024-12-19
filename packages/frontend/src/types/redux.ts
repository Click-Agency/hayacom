import store from "../store";
import { AxiosResponse } from "axios";

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

interface IDeleteState {
  show: boolean;
  target: {
    uniqueId: string;
    uniqueIdentifier: string;
    type: string;
    deleteFunction?: (unique: string) => Promise<AxiosResponse<any, any>>;
  };
}

interface ISlice {
  delete: IDeleteState;
}

export type { RootState, AppDispatch, ISlice };
