import { DataSetService } from "../services/dataSet/dataSet.service.remote";

function createStore(initialState) {
  let currentState = initialState;
  const listeners = new Set();

  return {
    getState: () => currentState,
    setState: (newState) => {
      currentState = newState;
      listeners.forEach((listener) => listener(currentState));
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

export const store = createStore({
  dataSet: [],
  dataForQuastions: [],
  currentQustion: '',
  currentQustionCopy: null,
  answer: '',
  currentScore:''
});
