import { Toaster } from "react-hot-toast";

import ChatPage from "./pages/ChatPage";
import { DatasetProvider } from "./context/DatasetContext";

function App() {

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#172033",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.08)",
          },
        }}
      />

      <DatasetProvider>
  <ChatPage />
</DatasetProvider>
    </>
  );
}

export default App;