export const AddItem = (data) => ({
	type: "ADD_ITEM",
	item: data.message,
	itemId:data.id,
})

/* Used only by actions for sockets */
export const initialItems = (res) => ({
	type: "INITIAL_ITEMS",
	items: res
})
// Async socket
export const addNewItemSocket = (socket,id,message) => {
	return (dispatch) => {
		let postData = {
				id:id+1,
				message:message,
		     }
	    socket.emit('addItem',postData)		
	}	
}

