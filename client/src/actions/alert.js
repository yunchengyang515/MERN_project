import { SET_ALERT, REMOVE_ALERT} from "./types"
import uuid from 'uuid'; 

//Then the data in the dispatch method will be taken as action parameter in the reducer
export const setAlert = (msg, alertType, timeout = 1000) => dispatch => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, alertType, id }
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };