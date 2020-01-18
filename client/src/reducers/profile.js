import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, UPDATE_PROFILE } from "../actions/types";

const initialState = {
    //hold all the profile data
    profile:null,
    //for the profile list: a list of profiles
    profiles:[],
    //github repos
    repos:[],
    loading: true,
    errors:{}
}

export default function(state = initialState, action){
    const{ type, payload } = action;

    switch(type){
        //get the profile
        case GET_PROFILE:
            return{
                //current state
                ...state,
                profile:payload,
                loading:false
            };
        case PROFILE_ERROR:
            return{
                ...state,
                error:payload,
                loading:false
            }
        case CLEAR_PROFILE:
            return{
                ...state,
                profile:null,
                repo:[],
                loading:false
            }
        case UPDATE_PROFILE:
            return{
                ...state,
                profile:payload,
                loading:false
            }
        default:
            return state;
    }
}