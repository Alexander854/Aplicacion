import Routers from "./src/Router/router";

import { AuthProvider } from './src/components/UserContext';

export default function App() {
  return (
    
    <AuthProvider>
      <Routers>

      </Routers>
    </AuthProvider>
  );
}



