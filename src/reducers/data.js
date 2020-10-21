
const initialstate=[{firstname:"",
secondname:"",
email:""}]

const dataReducer = (state=initialstate, action)=>{
    switch(action.type){
        case 'DATA':
            return state=action.data
        default:
            return state

    }
}
export default dataReducer;