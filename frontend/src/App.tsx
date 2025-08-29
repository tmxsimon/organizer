import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./features/home/pages/Homepage";
import MainLayout from "./layouts/MainLayout";
import ToolsBrowser from "./features/tools/pages/ToolsBrowser";
import ToolMenu from "./features/tools/pages/ToolMenu";
import "./lib/i18n";
import Tool from "./features/tools/pages/Tool";
import Profile from "./features/profile/pages/Profile";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="/tools">
            <Route index element={<ToolsBrowser />} />
            <Route path=":toolsType">
              <Route index element={<ToolMenu />} />
              <Route path=":toolId" element={<Tool />} />
            </Route>
          </Route>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
