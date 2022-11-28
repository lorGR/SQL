import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home';
import Main from './views/main/Main';
import Products from './views/products/Products';
import ProductCard from './components/productCard/ProductCard';
import Product from './views/product/Product';
import MyAccount from './views/myAccount/MyAccount';
import Registration from './views/registration/Registration';
import Cart from './views/cart/Cart';
import SearchProducts from './views/searchProducts/SearchProducts';

function App() {
  return (
    <div className="App" dir='rtl'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} >
            <Route index element={<Home />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/my-account/registration" element={<Registration />} />
            <Route path="/store/:storeType" element={<Products />} />
            <Route path="/store/:storeType/:productName" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search-products/:userSearch" element={<Products />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
