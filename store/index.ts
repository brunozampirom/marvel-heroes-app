import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createStore } from "redux";
import reducers from "./ducks";

const store = createStore(reducers);

export default store;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
