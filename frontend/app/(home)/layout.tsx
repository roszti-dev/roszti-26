import type React from "react";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";

export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="pb-20 flex flex-col grow md:pl-76 pt-20 px-4 md:pb-4">
        {children}
      </div>
      <Sidebar />
      <Footer />
      <Navbar />
    </>
  );
}
