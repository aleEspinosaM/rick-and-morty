import React, { createContext, useContext, useReducer } from 'react';
import rootReducer, { initialState } from '../reducer';

const StateContext = createContext();
const DispatchContext = createContext();

/** Provider */
function Provider({ children }) {
    const [state, dispatch] = useReducer(rootReducer, initialState)
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

function useContextState() {
    const context = useContext(StateContext)
    if (context === undefined) {
        throw new Error('useContextState must be used within a Provider')
    }
    return context
}

function useContextDispatch() {
    const context = useContext(DispatchContext)
    if (context === undefined) {
        throw new Error('usexDispatch must be used within a Provider')
    }
    return context
}

/**
Usage
  const dispatch = useContextDispatch();
  const state = useContextState();
 */

export { Provider, useContextState, useContextDispatch }
