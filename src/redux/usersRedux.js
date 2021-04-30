/* selectors */
export const getStatus = (user) => user.active;

/* action name creator */
const reducerName = 'statusUser';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const LOAD_STATUS = createActionName('LOAD_STATUS_USER');

/* action creators */
export const loadStatusUser = payload => ({ payload, type: LOAD_STATUS });

/* thunk creators */

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case LOAD_STATUS: {
      return {
        ...statePart,
        active: action.payload.active,
      };
    }
    default:
      return statePart;
  }
};
