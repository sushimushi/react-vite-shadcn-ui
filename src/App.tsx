import Layout from "./app/layout";
import { ThemeProvider } from "@/components/theme-provider"


function App() {
  return (
    <>
     <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Layout>
        <></>
      </Layout>
    </ThemeProvider>
    </>
  );
}

export default App;
