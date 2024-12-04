
import React from "react";
import Routers from "./src/Router/router";
import { ThemeProvider } from "./src/config/themecontext";
import { AuthProvider } from './src/components/UserContext'; // Se mantiene el AuthProvider pero sin necesidad de pasar userId

export default function App() {
  return (
    <AuthProvider> 
      <ThemeProvider>
        <Routers > 
        </Routers>
      </ThemeProvider>
    </AuthProvider>
  );
}
