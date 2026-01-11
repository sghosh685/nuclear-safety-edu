import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ReactorsPage, ReactorDetail } from './pages/ReactorsPage';
import { AccidentsPage, AccidentDetail } from './pages/AccidentsPage';
import { SafetyPage } from './pages/SafetyPage';
import { QuizPage } from './pages/QuizPage';
import { AboutPage } from './pages/AboutPage';
import { ProsAndChallengesPage } from './pages/ProsAndChallengesPage';
import { FAQPage } from './pages/FAQPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { NuclearBasicsPage } from './pages/NuclearBasicsPage';
import { NuclearCanadaPage } from './pages/NuclearCanadaPage';
import { NuclearWastePage } from './pages/NuclearWastePage';
import { CompareEnergyPage } from './pages/CompareEnergyPage';
import { ClimatePage } from './pages/ClimatePage';
import { GlossaryPage } from './pages/GlossaryPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { CareersPage } from './pages/CareersPage';
import { GlobalMapPage } from './pages/GlobalMapPage';
import { SafetyCulturePage } from './pages/SafetyCulturePage';
import { DoseCalculatorPage } from './pages/DoseCalculatorPage';
import { CareerQuizPage } from './pages/CareerQuizPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="reactors" element={<ReactorsPage />} />
            <Route path="reactors/:id" element={<ReactorDetail />} />
            <Route path="accidents" element={<AccidentsPage />} />
            <Route path="accidents/:id" element={<AccidentDetail />} />
            <Route path="safety" element={<SafetyPage />} />
            <Route path="quiz" element={<QuizPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="pros-and-challenges" element={<ProsAndChallengesPage />} />
            <Route path="faq" element={<FAQPage />} />
            <Route path="emergency" element={<EmergencyPage />} />
            <Route path="basics" element={<NuclearBasicsPage />} />
            <Route path="canada" element={<NuclearCanadaPage />} />
            <Route path="waste" element={<NuclearWastePage />} />
            <Route path="compare-energy" element={<CompareEnergyPage />} />
            <Route path="climate" element={<ClimatePage />} />
            <Route path="glossary" element={<GlossaryPage />} />
            <Route path="resources" element={<ResourcesPage />} />
            <Route path="careers" element={<CareersPage />} />
            <Route path="career-quiz" element={<CareerQuizPage />} />
            <Route path="global-map" element={<GlobalMapPage />} />
            <Route path="safety-culture" element={<SafetyCulturePage />} />
            <Route path="dose-calculator" element={<DoseCalculatorPage />} />
            {/* 404 catch-all route */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

