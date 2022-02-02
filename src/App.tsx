import { RedirectPages } from "./components/RedirectPages";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ModalLinkAccountsContextProvider } from "./contexts/ModalLInkContext";

function App() {
  return (
    <ModalLinkAccountsContextProvider>
      <AuthContextProvider>
        <RedirectPages />
      </AuthContextProvider>
    </ModalLinkAccountsContextProvider>
  )
}

export default App;
