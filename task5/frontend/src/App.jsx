import GlobalStyles from "./GlobalStyles";
import TablePage from "./pages/TablePage";
import TableStore from "./context/TablePageContext/TableStore";
import {Route, Routes } from 'react-router-dom'
import Manager from "./pages/Manager";
import SuperManager from "./pages/SuperManager"



// Global styles
// The Context for Sharing reactive state beteween components
// The actual Table page
// ! Quick Tip: In case you didn't know if you're using VS Code you can just "ctrl + click" on any component to navigate to it's source code
function App() {
  return (
    <div>
      <GlobalStyles />
      <TableStore>
      <Routes>
        <Route exact path="/" element={<TablePage />} />
        <Route exact path="/manager"  element={<Manager/>}/>
        <Route exact path="/super_manager"  element={<SuperManager/>}/>
      </Routes>
      </TableStore>
      
    </div>
  );
}

export default App;
