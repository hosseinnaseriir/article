import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Auth from "./pages/Auth";
import AddArticls from "./pages/AddArticles";
import Articles from "./pages/Articles";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader/index";
import { useContext, useEffect, useMemo, useReducer } from "react";
import { contexts } from "./contexts/index";
import Article from "./pages/Article/index";
import { Button } from "@mui/material";

// function reducer(state, action) {
//   return { count: state.count + 1 };
// }

function App() {
  const { loader, setArticles } = useContext(contexts);

  // const [state, dispatch] = useReducer(reducer, { count: 100 });

  useEffect(() => {
    const locatedArticles = JSON.parse(localStorage.getItem("articles"));
    if (locatedArticles) {
      setArticles(locatedArticles);
    }
  }, []);

  return (
    <>
      <Header />
      {/* <Button onClick={() => dispatch()}>inc</Button> */}
      {/* {state.count} */}
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
