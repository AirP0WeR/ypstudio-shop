import Footer from "./Footer";
import Navbar from "./navbar/Navbar";
import "./globals.css";
import SessionProvider from "./SessionProvider";

export const metadata = {
  title: "YPStudio",
  description: "Дизайн студия Юлии Пережогиной.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col h-screen">
        <SessionProvider>
          <Navbar />
          <main className="p-4 w-full max-w-7xl m-auto min-w-[300px] flex-grow">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
