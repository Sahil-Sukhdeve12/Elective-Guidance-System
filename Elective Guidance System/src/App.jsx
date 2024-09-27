import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Body from './components/body';
import { AuthProvider } from './contexts/authContexts';

function App() {
  return(
    <AuthProvider>
      <Body/>
    </AuthProvider>
  
  );
}

export default App;
