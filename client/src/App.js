import React from "react";
import ReactDOM from "react-dom"
import {connect} from 'react-redux'
import {addNewItemSocket,AddItem} from './actions'
import io from "socket.io-client"
let socket
const mapStateToProps = (state = {}) => {
    return {...state};
};

export  class Layout extends React.Component{
   constructor(props)
   {
	   super(props)
	   const {dispatch} = this.props
	   socket = io.connect("http://localhost:8080")
	   
	   socket.on('itemAdded',(res)=>{
		   dispatch(AddItem(res))
	   })
     this.state= {
       isConnected:true,
       message:''
     }

     this.handleInputChange = this.handleInputChange.bind(this);
     this.sendMessage =this.sendMessage.bind(this);
   }
   componentWillUnmount() {
       socket.disconnect()
   }

   handleInputChange(event){
     this.setState({
       message:event.target.value
     })
   }

   sendMessage(){
     let { dispatch, items } = this.props;     
     dispatch(addNewItemSocket(socket,items.size,this.state.message))
   }
   handleSocketConnection = () =>{
     
    if(this.state.isConnected){
      socket.disconnect();
    }else{
      socket.connect();
    }
    this.setState({
      isConnected:!this.state.isConnected
    })
   }

   render(){	
       const { items } = this.props
       
		   return (
            <div>
              <button onClick={this.handleSocketConnection}>{this.state.isConnected?'Disconnect':'Connect'}</button>
              <input type="text" value={this.state.message} name="message" onChange={this.handleInputChange}></input>
              <button onClick={this.sendMessage}>Send Message</button>
               {items.map((item)=>{
                 return (<span key={item.id}>{item.item}</span>)
               })}
            </div>
       );
	}
}

export default  connect(mapStateToProps)(Layout)
