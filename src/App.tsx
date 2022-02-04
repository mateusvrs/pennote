import { RedirectPages } from "./components/RedirectPages";

import { AuthContextProvider } from "./contexts/AuthContext";
import { DarkContextProvider } from "./contexts/DarkContext";
import { LoadingContextProvider } from "./contexts/LoadingContext";
import { ModalLinkAccountsContextProvider } from "./contexts/ModalLInkContext";

function App() {
  return (
    <LoadingContextProvider>
      <ModalLinkAccountsContextProvider>
        <AuthContextProvider>
          <DarkContextProvider>
            <RedirectPages />
          </DarkContextProvider>
        </AuthContextProvider>
      </ModalLinkAccountsContextProvider>
    </LoadingContextProvider>
  )
}

export default App;
