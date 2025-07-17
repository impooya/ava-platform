import { Route, Routes } from "react-router"
import SpeechConversionPage from "./pages/speech-conversion-page"
import ArchivePage from "./pages/archive-page"
import MainPageLayout from "./pages/main-page-layout"


function App() {
  return (
    <>
      <Routes>
        <Route element={<MainPageLayout />}>
          <Route path="/" element={<SpeechConversionPage />} />
          <Route path="/archive" element={<ArchivePage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
