import { Route, Routes } from "react-router-dom";
import Home from '../components/Home/home';
import SerieCreate from "../components/Create/creation";
import Edit from "../components/Edit/edit"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
      <div>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route exact path="/createSerie" element={<SerieCreate/>}/>
        <Route exact path="/serie/:id" element={<Edit/>}/>
        </Routes>
      </div>
  );
}

export default App;
