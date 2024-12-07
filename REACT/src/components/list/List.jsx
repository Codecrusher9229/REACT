import "./list.css"
import ChatList from "./chatList/chatList"
import Userinfo from "./userInfo/Userinfo"
const List = () => {
  return (
    <div className='list'>
      <Userinfo/>
      <ChatList/>
    </div>
  )
}

export default List