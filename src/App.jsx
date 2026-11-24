import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormPage from './pages/FormPage';
import StudioPage from './pages/StudioPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FormPage />} />
        <Route path="/studio" element={<StudioPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
//slide
// 1. nama mempelai dan tanggal dan foto
// 2. nama mempelai, orang tua dan kata-kata untuk sambutan yang ingin mengundang
// 3. teks: akad nikah, tanggal, dan lokasi pernikahan
// 4. teks: resepsi, tanggal dan lokasi pernikahan
// 5. QS. Ar - rum ayat 21 tentang pernikahan
// 6. nama mempelai dan tanggal pernikahan teks:  make with love
