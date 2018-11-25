import {List} from 'immutable';

const initialState = { items:List([])}


const reducer = (state=initialState, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
        return {
            ...state,
            items:state.items.push({id:action.itemId,item:action.item})
        } 	
    default:
      return state
  }
}


export default reducer;