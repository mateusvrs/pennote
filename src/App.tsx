import { RedirectPages } from "./components/RedirectPages";

import { AuthContextProvider } from "./contexts/AuthContext";
import { LoadingContextProvider } from "./contexts/LoadingContext";
import { ModalLinkAccountsContextProvider } from "./contexts/ModalLInkContext";

function App() {
  return (
    <LoadingContextProvider>
      <ModalLinkAccountsContextProvider>
        <AuthContextProvider>
          <RedirectPages />
        </AuthContextProvider>
      </ModalLinkAccountsContextProvider>
    </LoadingContextProvider>
  )
}

export default App;
