import Layout from '../layout';
import { Toaster } from "sonner";
// --- ENSURE THIS PATH IS CORRECT ---
import '../styles/globals.css'; 

// This is the component that Next.js uses to initialize your pages
export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Toaster />
    </Layout>
  );
}