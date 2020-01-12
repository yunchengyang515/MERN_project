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
    const{ type, data } = action;

    switch(type){
        //get the profile
        case GET_PROFILE:
            return{
                //current state
                ...state,
                profile:data,
                loading:false
            };
        case PROFILE_ERROR:
            return{
                ...state,
                error:data,
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
                profile:data,
                loading:false
            }
        default:
            return state;
    }
}