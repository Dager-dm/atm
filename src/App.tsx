import { useState } from "react";
import Navbar from "./components/ui/Navbar";
import NequiATM from "./components/pages/NequiATM";
import AhorroATM from "./components/pages/AhorroATM";
import AhorroManoATM from "./components/pages/AhorroManoATM";
import NequiMobile from "./components/mobile/NequiMobile";
import AhorroManoMobile from "./components/mobile/AhorroManoMobile";
import "./App.css";

function App() {
  const [activeSection, setActiveSection] = useState<string>("nequi");

  const renderContent = () => {
    switch (activeSection) {
      case "nequi":
        return <NequiATM />;
      case "ahorromano":
        return <AhorroManoATM />;
      case "ahorro":
        return <AhorroATM />;
      case "nequi-mobile":
        return <NequiMobile />;
      case "ahorromano-mobile":
        return <AhorroManoMobile />;
      default:
        return <NequiATM />;
    }
  };

  return (
    <div className="App">
      <Navbar onSectionChange={setActiveSection} />
      <main className="main-content">
        <div className="main-container">
          <div className="content-wrapper">{renderContent()}</div>
        </div>
      </main>
    </div>
  );
}

export default App;
