import { CREATE_POST } from "../actions/types";
const initialState = {
  //hold all the profile data
  posts: [],
  post: null,
  loading: true,
  errors: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_POST:
      return {
        ...state,
        post: payload,
        loading: false
      };
    default:
      return state;
  }
}
