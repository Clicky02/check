import { produce } from "immer";

type APICreator<S, F> = (set: (set_fn: (store: S) => void) => void, get: () => S) => F;
export function combineImmer<S, F>(state: S, api: APICreator<S, F>) {
    return (set: any, get: any) => {
        const immerSet = (set_fn: (store: S) => void) => {
            set((state: S) => produce(state, set_fn))
        }
        return {
            ...state,
            ...api(immerSet, get),
        };
    };
}

// api = (set) => api object
// set = (state) => new_state