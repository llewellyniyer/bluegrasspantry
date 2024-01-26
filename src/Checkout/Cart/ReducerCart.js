export function ReducerCart(state = {}, action) {
  const { payload, type } = action;
  const actionMap = {
    ADD_TO_CART: () => ({
      ...state,
      [payload]: (state[payload] ?? 0) + 1
    }),
    SUBTRACT_FROM_CART: () => {
      const value = (state[payload] ?? 0) - 1;
      if (value < 1) {
        delete state[payload]
        return { ...state }
      }
      return {
        ...state,
        [payload]: value
      }
    },
    REMOVE_FROM_CART: () => {
      delete state[payload]
      return { ...state }
    },
  }
  return actionMap[type] ? actionMap[type]() : state;
};

export function addToCart(payload) {
  return {
    type: 'ADD_TO_CART',
    payload,
  }
};

export function subtractFromCart(payload) {
  return {
    type: 'SUBTRACT_FROM_CART',
    payload,
  }
};

export function removeFromCart(payload) {
  return {
    type: 'REMOVE_FROM_CART',
    payload,
  }
};