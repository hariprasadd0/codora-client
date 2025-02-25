import { Login } from "./modules/auth/login"
import { SignUp } from "./modules/auth/signin"
import { ThemeProvider } from "./components/theme-provider"
function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      
      <SignUp />
      <Login />
    </ThemeProvider>
    )
}

export default App
