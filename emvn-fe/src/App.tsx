import { QueryClientProvider } from "react-query";
import { queryClient } from "./config";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Playlist } from "./pages";
import { MainLayout } from "./Layout";
import { TrackProvider } from "./context";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TrackProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<MainLayout />}>
              <Route index element={<Home />}></Route>
              <Route path={"/playlist"} element={<Playlist />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </TrackProvider>
    </QueryClientProvider>
  );
}

export default App;
