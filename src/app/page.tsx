import Header from "@/components/Header";
import Main from "@/components/Main";
import Sidebar from "@/components/Sidebar";
import Image from "next/image";
import { AppProvider } from "@/contexts";

function Home() {
  return (
    <div className="flex flex-row h-screen bg-red-800">
      <Sidebar />
      <section className="flex-[9] flex flex-col bg-background  pl-[32px] ">
        <Header />
        <Main />
      </section>
    </div>
  );
}

const HomeWithState: React.FC = () => {
  return (
    <AppProvider>
      <Home />
    </AppProvider>
  );
};

export default HomeWithState;
