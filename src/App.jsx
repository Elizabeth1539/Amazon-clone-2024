import React, { useContext, useEffect } from "react";
import Routing from "./pages/Router.jsx";
import { Type } from "./utility/action.type.js";
import { DataContext } from "./component/dataProvider/DataProvider.jsx";
import { auth } from "./utility/firebase.js";
function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({ type: Type.SET_USER, user: null });
      }
    });
  }, []);
  return <Routing />;
}
export default App;
