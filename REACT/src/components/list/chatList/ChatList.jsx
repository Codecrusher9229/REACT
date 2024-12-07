import { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMODE, setAddMODE] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();
  

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data().chats || [];
      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);
        const user = userDocSnap.data();
        return { ...item, user };
      });

      try {
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      } catch (error) {
        console.error("Error fetching chat data:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      unSub();
    };
  }, [currentUser.id]);

    const handleSelect =async (chat)=>{
    const userChats = chats.map((item)=>{
      const {user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item)=>item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen=true;
    
    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats:userChats,
      });
      changeChat(chat.chatId,chat.user)
    } catch (err) {
      console.log(err)
    }
  };
   
   const filteredChats = chats.filter((c) =>
    c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className='chatList'>
      <div className='search'>
        <div className='searchBar'>
          <img src="/search.png" alt="Search" />
          <input type="text" placeholder="Search" onChange={(e) => setInput(e.target.value)}/>
        </div>
        <img 
          src={addMODE ? "./minus.png" : "./plus.png"} 
          alt="Toggle Add User" 
          className="add" 
          onClick={() => setAddMODE(prev => !prev)} 
        />
      </div>
      {loading ? (
        <div>Loading chats...</div>
      ) : (
        filteredChats.map(chat => (
          <div className="item" 
          key={chat.chatId} 
          onClick={()=>handleSelect (chat)}
          style={{
            backgroundColor: chat?.isSeen ? "transparent" : "#5183fe",
          }}
          >
            <img src={chat.user.blocked.includes(currentUser.id) ? "./avatar.png" : chat.user.avatar  || "./avatar.png"} alt="" />
            <div className="texts">
              <span>{chat.user.blocked.includes(currentUser.id)
                ?"User"
              :chat.user.username
              }</span>
              <p>{chat.lastMessage}</p>
            </div>
          </div>
        ))
      )}
      {addMODE && <AddUser />}
    </div>
  );
};

export default ChatList;
