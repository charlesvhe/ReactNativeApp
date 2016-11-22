export const MODULE_NAME = 'Counter'

export const INCREMENT = `${MODULE_NAME}/INCREMENT`
export const DECREMENT = `${MODULE_NAME}/DECREMENT`
export const ADD_NEW_COUNTER = `${MODULE_NAME}/NEW`

export function increment() {
  return {
    type: INCREMENT
  };
}

export function decrement() {
  return {
    type: DECREMENT
  };
}