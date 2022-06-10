import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Auth from "./pages/Auth";
import AddArticls from "./pages/AddArticles";
import Articles from "./pages/Articles";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader/index";
import { useContext, useEffect } from "react";
import { contexts } from "./contexts/index";
import Article from "./pages/Article/index";

function App() {
  const { loader, setArticles } = useContext(contexts);
  useEffect(() => {
    const locatedArticles = JSON.parse(localStorage.getItem("articles"));
    if (locatedArticles) {
      setArticles(locatedArticles);
    }
  }, []);
  
  return (
    <>
      <Header />
      <ToastContainer />
      {loader && <Loader />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/add-articles" element={<AddArticls />} />
        <Route path="/articles-file" element={<Articles />} />
        <Route path="/article/:id" element={<Article />} />
      </Routes>
    </>
  );
}

export default App;
