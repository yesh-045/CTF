import {  Route, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LeaderboardPage from './pages/LeaderboardPage';
import QuestionPage from './pages/QuestionPage';
import MainLayout from './pages/MainLayout';
import {QueryClient,QueryClientProvider} from 'react-query'
import './index.css';


const queryClient = new QueryClient();




const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<MainLayout/>}>
      <Route path="/" element={<HomePage />}/>
      <Route path="/admin/*" element={<AdminPage/>}/>
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/challenges" element={<QuestionPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
  </Route>
))


const App = () => {
   return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
      </QueryClientProvider>
   )
};

export default App;
