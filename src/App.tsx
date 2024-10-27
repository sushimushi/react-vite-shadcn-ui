import Layout from "./app/layout";
import { ThemeProvider } from "@/components/theme-provider"
import Dashboard from "./pages/Dashboard";


function App() {
  return (
    <>
     <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Layout>
        <Dashboard/>
      </Layout>
    </ThemeProvider>
    </>
  );
}

export default App;
