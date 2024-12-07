import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importing CSS for toast notifications

const Notification = () => {
  return (
    <div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}

export default Notification;
