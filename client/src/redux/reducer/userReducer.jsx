


export function userReducer (state=null,action){
    const {type,}=action
    switch(type){
        case "LOGIN":return action.payload
        case "REGISTER":return action.payload
        default:return state
    }
}