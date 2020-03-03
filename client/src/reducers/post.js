import { CREATE_POST } from "../actions/types"
const initialState = {
    //hold all the profile data
    posts: [],
    post:null,
    loading: true,
    errors:{}
    
}

export default function(state = initialState, action){
    const{ type, payload } = action;

    case CREATE_PROFILE:
            return{
                //current state
                ...state,
                profile:payload,
                loading:false
            };
}