import axios from 'axios'
export const reqLogin=(user)=>{
    console.log(user);
    return axios.post('/register',user)
}
export  const reqRegister=(user)=>{
    console.log(user);
    return axios.post('/register',user)
}
export  const reqUpdate=(user)=>{
    console.log(user);
    return axios.post('/update',user)
}
export  const reqUser=()=>{
    return axios.get('/user')
}
export  const reqMsglist=()=>{
    return axios.get('/msglist')
}
export  const reqReadmsg=(from)=>{
    return axios.post('/readmsg',from)
}

