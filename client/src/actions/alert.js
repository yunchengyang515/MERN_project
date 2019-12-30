import { SET_ALERT, REMOVE_ALERT} from "./types"
import uuid from 'uuid'; 

//Then the data in the dispatch method will be taken as action parameter in the reducer
export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      data: { msg, alertType, id }
    });
    setTimeout(() => dispatch({ type: REMOVE_ALERT, data: id }), timeout);
  };