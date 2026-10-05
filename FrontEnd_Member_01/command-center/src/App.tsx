import { AuthProvider } from './context/AuthContext';
import { CommandCenterProvider } from './context/CommandCenterContext';
import { AppShell } from './components/AppShell';

export function App() {
  return (
    <AuthProvider>
      <CommandCenterProvider>
        <AppShell />
      </CommandCenterProvider>
    </AuthProvider>
  );
}

export default App;
