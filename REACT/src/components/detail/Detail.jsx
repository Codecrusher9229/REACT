import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { auth, db } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";
import "./detail.css"

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } =
  useChatStore();
  const {currentUser} = useUserStore();

  const handleBlock = async () => {
   if(!user) return;
   const userDocRef = doc(db, "users", currentUser.id)
   try {
    await updateDoc(userDocRef,{
      blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
    })
    changeBlock()
   } catch (err) {
    console.log(err)
   }
  };
  return (
    <div className='detail'>
      <div className="user">
        <img src={user?.avatar || "./avatar.png"}alt=""/>
        <h2>{user?.username}</h2>
        <p>Junior Developer</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt=""/>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt=""/>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Photos</span>
            <img src="./arrowDown.png" alt=""/>
          </div>
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
              <img src="https://th.bing.com/th/id/OIP.5Eg63rOGlyrLOX3-3ApowwHaE8?pid=ImgDet&w=474&h=316&rs=1" alt=""/>
              <span>photo_dogesh.jpeg</span>
              </div>
              <img src="./download.png" className="icon" alt=""/>
            </div>
            <div className="photoItem">
              <div className="photoDetail">
              <img src="https://th.bing.com/th/id/OIP.5Eg63rOGlyrLOX3-3ApowwHaE8?pid=ImgDet&w=474&h=316&rs=1" alt=""/>
              <span>photo_dogesh.jpeg</span>
              </div>
              <img src="./download.png" className="icon" alt=""/>
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt=""/>
          </div>
        </div> 
        <button onClick={handleBlock} >{
          isCurrentUserBlocked 
          ? "You are Blocked!" 
          : isReceiverBlocked 
          ? "User blocked" 
          : "Block User"}
          </button>
        <button className="logout" onClick={()=>auth.signOut()}>Logout</button>
      </div>
    </div>
  );
};

export default Detail