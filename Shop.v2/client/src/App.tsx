import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/home/Home';
import Main from './views/main/Main';
import Products from './views/products/Products';
import ProductCard from './components/productCard/ProductCard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} >
            <Route index element={<Home />} />
            <Route path="/store/:storeType" element={<Products />}/>
            <Route path="/store/:storeType/:product" element={<div>hello</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
