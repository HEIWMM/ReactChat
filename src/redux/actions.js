import {
    reqLogin,
    reqRegister,
    reqUpdate} from '../api/axiosFun'
const authSuccess=(data)=>({type:'AuthSuccess',data:data}) 
const authFailed=(data)=>({type:'AuthFailed',data:data})
const authUpdate=(data)=>({type:'AuthUpdate',data:data})
export const register=(user)=>{
    return async dispatch=>{
        const res = await reqRegister(user);
        console.log(res);
        if(res.data.code===0){
            console.log('code--->0');
            dispatch(authSuccess(res.data));        

        }else{
            console.log('code--->1');
            dispatch(authFailed(res.data));
        }
    }
}
export const login=(user)=>{
    return async dispatch=>{
        const res = await reqLogin(user);
        if(res.code===0){
            dispatch(authSuccess(res.data));
        }else{
            dispatch(authFailed(res.data));
        }
    }
}
export const update=(user)=>{
    return async dispatch=>{
        const res = await reqUpdate(user);
        dispatch(authUpdate(res.data));
    }
}
export const handleChange = () => ({type: 'handleC'})