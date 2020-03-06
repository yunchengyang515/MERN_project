import { CREATE_POST, GET_ALL_POSTS, POST_COMMENT } from "../actions/types";
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
    case POST_COMMENT:
      return {
        ...state,
        post: payload,
        loading: false
      };
      case GET_ALL_POSTS:
        return {
          ...state,
          posts: payload,
          loading: false
        };
    default:
      return state;
  }
}
