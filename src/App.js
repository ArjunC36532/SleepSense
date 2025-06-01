// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homepage';
import LoginPage from './pages/login';
import SignupPage from './pages/signup';
import SelfAssess from './pages/selfassess';
import Questionare from './components/questionare/questionare';
import SleepInfo from './pages/sleepinfo';
import LogSleep from './pages/logsleep';
import Diagnose from './pages/diagnose';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/loginpage" element={<LoginPage />} />
        <Route path="/signuppage" element={<SignupPage />} />
        <Route path="/self-assess-page" element={<SelfAssess />} />
        <Route path="/questionare-page" element={<Questionare />} />
        <Route path="/sleep-info-page" element={<SleepInfo />} />
        <Route path="/log-sleep-page" element={<LogSleep/>} />
        <Route path="/diagnose-page" element={<Diagnose/>} />
      </Routes>
    </Router>
  );
}

export default App;
