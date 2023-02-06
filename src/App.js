
import { BrowserRouter,Routes, Route } from "react-router-dom";

import Feed from "./components/Feed";
import ProfilePage from "./components/ProfilePage";

function App() {
  return (
    <>

    <Routes>
      
      <Route exact path="/profilePage/:id" element={<ProfilePage />}/>
      <Route exact path="/" element={<Feed/>}/>
    </Routes>
    </>

  );
}

export default App;
