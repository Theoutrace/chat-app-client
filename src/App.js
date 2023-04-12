import "./App.css";
import ResponsiveAppBar from "./components/navbar/Navbar";
import LoginSignup from "./pages/auth/LoginSignup";
import Chat from "./pages/chat/Chat";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AuthActions } from "./Store/reducers/auth-reducer";
import { useEffect } from "react";

function App(props) {
  const dispatch = useDispatch();
  const userEmail = localStorage.getItem("email");
  const authToken = localStorage.getItem("token");
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if ((userEmail, authToken)) {
      dispatch(AuthActions.login({ email: userEmail, token: authToken }));
    }
  }, [authToken, userEmail, dispatch]);

  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        {!auth.login && <Route path="/login" element={<LoginSignup />} />}
        <Route
          path="/chat/*"
          element={auth.login ? <Chat modal={props.modal} /> : <LoginSignup />}
        />
      </Routes>
    </div>
  );
}

export default App;
