import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CeoDashboard from './pages/CEO/CeoDashboard'
import KoHeadDashboard from './pages/KO-Head/KoHeadDashboard'
import KoLeadDashboard from './pages/KO-Lead/KoLeadDashboard'
import OuHeadDashboard from './pages/OU-Head/OuHeadDashboard'
import TrainerDashboard from './pages/Trainer/TrainerDashboard'
import UserManagement from './pages/Admin/User'
import TrainerDatabase from './pages/Admin/TrainerDatabase'
import OuTrainingRequests from  "./pages/OU-Head/OuTrainingRequests"
import OuTrainers from "./pages/OU-Head/OuTrainers"
import KoTrainingRequests from './pages/KO-Head/KoTrainingRequests'
import KoTrainerAllocation from "./pages/KO-Head/KoTrainerAllocation"
import KoTrainers from "./pages/KO-Head/KoTrainers";
import TrainerSchedule from './pages/Trainer/TrainerSchedulePage'


function App() {
  return (
    <>
      <BrowserRouter>
         <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path='/admin/users' element={<UserManagement/>}/>
             <Route path='/admin/trainers' element={<TrainerDatabase/>}/>
            <Route path="/ceo-dashboard" element={<CeoDashboard />} />
            <Route path="/kohead-dashboard" element={<KoHeadDashboard/>} />
            <Route path="/kolead-dashboard" element={<KoLeadDashboard />} />
            <Route path="/ouhead-dashboard" element={<OuHeadDashboard />} />
            <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
            <Route path="/ouhead/requests" element={<OuTrainingRequests/>}/>
            <Route path="/ouhead/trainer" element={<OuTrainers/>}/>
             <Route path="/kohead/requests" element={<KoTrainingRequests/>}/>
              <Route path="/kohead/trainers" element={<KoTrainers/>}/>
              <Route path="/kohead/allocation" element={<KoTrainerAllocation/>}/>
               <Route path="/trainer/schedule" element={<TrainerSchedule/>}/>
              
         </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
