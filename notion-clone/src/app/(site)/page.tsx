import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import TitleSection from "@/components/landing-page/title-section";
import Banner from "../../../public/appBanner.png";
import Cal from "../../../public/cal.png";
import { CLIENTS, PRICING_CARDS, PRICING_PLANS, USERS } from "@/lib/constants";
import { randomUUID } from "crypto";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import CustomCard from "@/components/landing-page/custom-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import Diamond from "../../../public/icons/diamond.svg";
import CheckIcon from "../../../public/icons/check.svg";

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
      {/* Brands section */}
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
          before:left-0
          before:bottom-0
          before:top-0
          before:w-20
          before:z-10
          before:absolute
        "
        >
          {[...Array(2)].map((arr) => (
            <div className="flex flex-nowrap animate-slide">
              {CLIENTS.map((client) => (
                <div
                  key={client.alt}
                  className="relative w-[200px] m-20 shrink-0 flex items-center"
                >
                  <Image
                    src={client.logo}
                    alt={client.alt}
                    width={200}
                    quality={100}
                    className="object-cover max-w-none"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      {/* Features Section */}
      <section className="px-4 sm:px-6 flex justify-center items-center flex-col relative">
        <div className="w-[30%] h-32 absolute rounded-full bg-brand-primaryPurple blur-[120px] -z-10 top-22" />
        <TitleSection
          title="Keep track of your meetings all in one place"
          subheading="Capture your ideas, thoughts, and meeting notes in a structured and organized manner."
          pill="Features"
        />
        <div
          className="mt-10
          max-w-[450px]
          flex
          justify-center
          items-center
          relative
          sm:ml-0
          rounded-2xl
          border-8
          border-washed-purple-300 
          border-opacity-10
        "
        >
          <Image src={Cal} alt="Banner" className="rounded-2xl" />
        </div>
      </section>
      {/* Testimonials section */}
      <section className="relative">
        <div
          className="w-full
          blur-[120px]
          rounded-full
          h-32
          absolute
          bg-brand-primaryPurple/50
          -z-100
          top-56
        "
        />
        <div
          className="mt-20
          px-4
          sm:px-6 
          flex
          flex-col
          overflow-x-hidden
          overflow-visible
        "
        >
          <TitleSection
            title="Trusted by all"
            subheading="Join thousands of satisfied users who rely on our platform for their 
            personal and professional productivity needs."
            pill="Testimonials"
          />
          {[...Array(2)].map((arr, index) => {
            return (
              <div
                key={randomUUID()}
                className={twMerge(
                  clsx("mt-10 flex flex-nowrap gap-6 self-start", {
                    "flex-row-reverse": index === 1,
                    "animate-[slide_250s_linear_infinite]": true,
                    "animate-[slide_250s_linear_infinite_reverse]": index === 1,
                    "ml-[100vw]": index === 1,
                  }),
                  "hover:paused"
                )}
              >
                {USERS.map((testimonial, index) => {
                  return (
                    <CustomCard
                      key={testimonial.name}
                      className="w-[500px] shrink-0 rounded-xl dark:bg-gradient-to-t dark:from-border dark:to-background"
                      cardHeader={
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={`/avatars/${index + 1}.png`} />
                            <AvatarFallback>AV</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-foregrond">
                              {testimonial.name}
                            </CardTitle>
                            <CardDescription className="dark:text-washed-purple-800">
                              {testimonial.name.toLowerCase()}
                            </CardDescription>
                          </div>
                        </div>
                      }
                      cardContent={
                        <p className="dark:text-washed-purple-800">
                          {testimonial.message}
                        </p>
                      }
                    ></CustomCard>
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>
      {/* Pricing section */}
      <section className="mt-20 pb-10 px-4 sm:px-6 ">
        <TitleSection
          title="The Perfect Plan For You"
          subheading="Experience all the benefits of our platform. Select a plan that suits your needs and take your productivity to new heights."
          pill="Pricing"
        />
        <div className="flex flex-col-reverse sm:flex-row gap-4 justify-center items-center mt-10 sm:items-stretch">
          {PRICING_CARDS.map((card) => (
            <CustomCard
              key={card.planType}
              className={clsx(
                "w-[300px] rounded-2xl dark:bg-black/95 backdrop-blur-3xl relative",
                {
                  "border-brand-primaryPurple/70":
                    card.planType === PRICING_PLANS.proplan,
                }
              )}
              cardHeader={
                <CardTitle className="text-2xl font-semibold">
                  {card.planType === PRICING_PLANS.proplan && (
                    <>
                      <div className="hidden dark:block w-full blur-[120px] rounded-full h-32 absolute bg-brand-primaryPurple/80 -z-10 top-0" />
                      <Image
                        src={Diamond}
                        alt="PRO Plan Icon"
                        className="absolute top-6 right-6"
                      />
                    </>
                  )}
                  {card.planType}
                </CardTitle>
              }
              cardContent={
                <CardContent className="p-0">
                  <span
                    className="font-normal 
                    text-2xl
                "
                  >
                    ${card.price}
                  </span>
                  {+card.price > 0 ? (
                    <span className="dark:text-washed-purple-800 ml-1">
                      /mo
                    </span>
                  ) : (
                    ""
                  )}
                  <p className="dark:text-washed-purple-800">
                    {card.description}
                  </p>
                  <Button
                    variant={"secondary"}
                    className="whitespace-nowrap w-full mt-4"
                  >
                    {card.planType === PRICING_PLANS.proplan
                      ? "Go Pro"
                      : "Get Started"}
                  </Button>
                </CardContent>
              }
              cardFooter={
                <ul
                  className="font-normal
                  flex
                  mb-2
                  flex-col
                  gap-4
                "
                >
                  <small>{card.highlightFeature}</small>
                  {card.freatures.map((feature) => (
                    <li
                      key={feature}
                      className="flex
                      items-center
                      gap-2
                    "
                    >
                      <Image src={CheckIcon} alt="Check Icon" />
                      {feature}
                    </li>
                  ))}
                </ul>
              }
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomePage;
