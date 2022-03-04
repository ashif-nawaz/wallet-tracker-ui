import Layout from "./layout";
import Routes from "./routes";
import { useEffect } from "react";
import { persistUser } from "./store/auth";
import { useDispatch } from "react-redux";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    const userName = window.localStorage.getItem("userName");
    const userId = window.localStorage.getItem("userId");
    dispatch(persistUser({ token, userName, userId }));
  }, [dispatch]);

  return (
    <Layout>
      <Routes />
    </Layout>
  );
};

export default App;
