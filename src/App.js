import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./components/ui/Navbar/Navbar";
import Footer from "./components/ui/Footer/Footer";
import Spinner from "./components/ui/Spinner/Spinner";
import UserProvider from "./components/context/UserContext";
import ProductsProvider from "./components/context/ProductsContext";
import CartProvider from "./components/context/CartContext";
import WishlistProvider from "./components/context/WishlistContext";
import { Toaster } from "react-hot-toast";
import CategoriesProvider from "./components/context/CategoriesContext";
import ScrollToTop from "./components/helpers/ScrollToTop";
import BrandsProvider from "./components/context/BrandsContext";

function App() {
  const { state } = useNavigation();

  return (
    <>
      <UserProvider>
        <ProductsProvider>
          <CartProvider>
            <WishlistProvider>
              <CategoriesProvider>
                <BrandsProvider>
                  <Navbar />
                  <main style={{ marginBlock: "60px", flexGrow: 1, position: "relative" }}>
                    {state === "loading" && <Spinner />}
                    <Outlet />
                  </main>
                </BrandsProvider>
              </CategoriesProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductsProvider>
      </UserProvider>
      <Toaster />
      <ScrollToTop />
      <Footer />
    </>
  );
}

export default App;
