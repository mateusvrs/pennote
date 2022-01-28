import { useState } from "react";

import { useAuth } from "./hooks/useAuth";

import { Home } from "./pages/Home";
import { Register } from './pages/Register';
import { LoadingCircle } from "./components/LoadingCircle";

type User = {
  id: string
  avatar: string | null
}

function App() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  function loadPageByUserState(user: User | undefined) {
    if (user) {
      return <Home />
    } else {
      if(isLoading) {
        setTimeout(() => {setIsLoading(false)}, 2000)
        return <LoadingCircle />
      } else {
        return <Register />
      }
    }
  }

  return loadPageByUserState(user)
}

export default App;
