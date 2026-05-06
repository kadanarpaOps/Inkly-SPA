import { BrowserRouter, Routes, Route } from 'react-router';
import LandingPage from './ui/pages/LandingPage';
import ErrorPage from './ui/pages/ErrorPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<ErrorPage statusCode={404} messageError="Página no encontrada" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;