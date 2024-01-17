import Pages from "./pages/Pages";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";

function App() {
  return (
    <h1>
      <BrowserRouter>
        <Search />
        <Pages />
      </BrowserRouter>
    </h1>
  );
}

export default App;
