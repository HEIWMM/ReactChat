import { combineReducers } from 'redux'

const initialState = [{
    id: 0,
    value: 15
}]
const initUser = {
    _id:'',
    username:'',
    type:'',
    msg:''
}
function user(state = initUser,action){
    switch(action.type){
        case 'AuthSuccess':
            return {...action.data.data,msg:action.data.msg};
        case 'AuthFailed':
            return {...action.data.data,msg:action.data.msg};
            // return state.filter((item)=>{
            //     if(item.username)
            // })
        default:
            return state
    }
}
function handle(state = initialState, action) {
    let initialState = state;
    switch (action.type) {
        case 'handleC':
            console.log(state,typeof(state));
            return initialState.map((item,index)=>{
                if(item.id == 0){
                    item.value+=1;
                }
                return item
            });
        default:
            return state
    }
}
const rootReducer = combineReducers({
    handle,
    user
})

export default rootReducer