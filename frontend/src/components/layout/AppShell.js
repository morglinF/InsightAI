import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppShell({ children }) {

  return (
    <div className="flex h-screen bg-background">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">

        <Topbar />

        <main className="flex-1 overflow-hidden">
          {children}
        </main>

      </div>

    </div>
  );
}