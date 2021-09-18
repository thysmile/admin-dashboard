const ItemReducer = (state, action) => {
    switch(action.type) {
        case "ITEM_POST_REQ": 
            return {...state,isLoading: true}
        case "ITEM_POST_SUCCESS":
            return {...state,isLoading:false,message:"You post Item succes"}
        case "ITEM_POST_FAIL": 
            return {...state,isLoading:false,error: action.payload}
        }
};

export default ItemReducer;
