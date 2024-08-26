import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducers/store";
import { AppDispatch } from "../reducers/store";

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
