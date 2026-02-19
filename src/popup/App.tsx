import Header from "./Header.js";
import MenuScreen from "./menu/MenuScreen.js";

function App() {
  return (
    <main className="flex h-[460px] w-[360px] flex-col bg-[#eef2f8]">
      <Header />
      <MenuScreen />
    </main>
  );
}

export default App;
