import React, { useState } from "react";
import Login from "./login";
import Register from "./register";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      {page === "login" && <Login switchPage={setPage} />}
      {page === "register" && <Register switchPage={setPage} />}
    </div>
    
  );
}

export default App;
