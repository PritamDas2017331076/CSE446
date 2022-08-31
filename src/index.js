import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from "./App";
import SignIn from "./components/SignIn";
import SignUp from './components/SignUp'
import Home from "./components/Home";
import ProductInfo from "./components/ProductInfo";
import Cart from "./components/Cart"
import BankInfo from './components/BankInfo'
import Supply from "./components/supply";
const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/home" element={<Home/>} />
      <Route path="/product" element={<ProductInfo/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/bank-info" element={<BankInfo/>} />
      <Route path="/supply" element={<Supply/>} />
    </Routes>
  </BrowserRouter>
);
