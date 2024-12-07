import React from "react";
import LandingPageNavbar from "./_components/navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col py-5 px-5 xl:px-0 container">
      <LandingPageNavbar />
      {children}
    </div>
  );
}
