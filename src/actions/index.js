export const setData = (data) => {
    return{
        type:'DATA',
        data:data
    }
}

export const setLoggedin = ()=>{
    return{
        type:"SIGNED"
    }
}