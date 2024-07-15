import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import TitleSection from "@/components/landing-page/title-section";
import Banner from "../../../public/appBanner.png";

const HomePage = () => {
  return (
    <>
      <section className="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
        <TitleSection
          pill="Your Workspace, Perfected"
          title="All-In-One Collaboration and Productivity Platform"
        />
        <div className="bg-white p-[2px] mt-6 rounded-xl bg-gradient-to-r from-primary to-brand-washedBlue sm:w-[300px]">
          <Button
            variant="secondary"
            className="rounded-[10px] p-6 text-2xl bg-background w-full"
          >
            Get Syncspace Free
          </Button>
        </div>
        <div className="w-[750px] sm:w-full flex justify-center items-center mt-[-40px] md:mt-[-90px] relative ml-[-50px] sm:ml-0">
          <Image src={Banner} alt="Application Banner" />
          <div className="absolute left-0 right-0 bottom-0 top-[60%] bg-gradient-to-t dark:from-background z-10"></div>
        </div>
      </section>
      <section className="relative">
        <div
          className="overflow-hidden 
          flex
          after:content['']
          after:dark:from-brand-dark
          after:to-transparent
          after:from-background
          after:bg-gradient-to-l
          after:right-0
          after:bottom-0
          after:top-0
          after:w-20
          after:absolute
          after:z-10

          before:content['']
          before:dark:from-brand-dark
          before:to-transparent
          before:from-background
          before:bg-gradient-to-r
          before:right-0
          before:bottom-0
          before:top-0
          before:w-20
          before:z-10
          before:absolute
        "
        ></div>
      </section>
    </>
  );
};

export default HomePage;
