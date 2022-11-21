import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home';
import Main from './views/main/Main';
import Products from './views/products/Products';
import ProductCard from './components/productCard/ProductCard';
import Product from './views/product/Product';
import MyAccount from './views/myAccount/MyAccount';
import Registration from './views/registration/Registration';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} >
            <Route index element={<Home />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/my-account/registration" element={<Registration />}/>
            <Route path="/store/:storeType" element={<Products />} />
            <Route path="/store/:storeType/:productName" element={<Product />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
