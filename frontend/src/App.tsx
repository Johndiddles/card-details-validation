import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import PaymentForm from "./components/paymentForm";

function App() {
  return (
    <div className="min-h-[100vh] min-w-[100vw] flex items-center justify-center bg-gray-100 px-4">
      <ToastContainer position="top-right" autoClose={5000} theme="light" />
      <PaymentForm />
    </div>
  );
}

export default App;
