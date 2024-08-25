"use client";
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../utils/db";
import { UsersTable } from "../../../../utils/schema";
import {useRouter} from "next/navigation";
const path = [
  {
    name: "Founder",
    desc: "Turn your vision into reality by connecting with the perfect co-founder to build and grow your startup.",
    link: "/founder.gif",
    still: "/stillfounder.png",
    direct: "/Founder/Profile",
  },
  {
    name: "Co-Founder",
    desc: "Join forces with a visionary founder, bringing your expertise to help create and scale innovative ideas.",
    link: "/cofounder.gif",
    still: "/stillcofounder.png",
    direct: "/Cofounder/Profile",
  },
];

const Page = () => {
  const { user } = useUser();
  const router=useRouter();

  const sendDataFo = async () => {
    try {
      const resp = await db.insert(UsersTable).values({
        id: user?.id,
        id_type: "founder",
      });

      console.log("Inserted ID: ", resp);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const sendDataCofo = async () => {
    try {
      const resp = await db.insert(UsersTable).values({
        id: user?.id,
        id_type: "cofounder",
      });

      console.log("Inserted ID: ", resp);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <div className="bg-black pt-6 sm:pt-4 lg:pt-4">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
        <div className="mb-2 md:mb-2">
          <h2 className="mb-4 mt-2 text-center text-2xl font-bold text-lime-500 md:mb-2 lg:text-3xl">
            Are You Here to <span className="text-white">Lead</span> or{" "}
            <span className="text-white">Collaborate</span>?
          </h2>

          <p className="mx-auto max-w-screen-md text-center text-neutral-400 md:text-lg">
            Discover your role in the journey of innovation. Whether you're here
            to lead with your vision or collaborate with your expertise, let's
            create something extraordinary together.
          </p>
        </div>

        <div className="flex px-16 gap-20 py-16">
          {path.map((item, index) => (
            <ImageCard
              key={index}
              item={item}
              sendData={item.name === "Founder" ? sendDataFo : sendDataCofo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const ImageCard = ({ item, sendData }) => {
  const [src, setSrc] = useState(item.still);
  const router = useRouter();

  const handleClick = async (event) => {
    event.preventDefault();
    await sendData();
    router.push(item.direct);
  };

  return (
    <a
      onClick={handleClick}
      href={item.direct}
      className="group relative block bg-black"
      onMouseEnter={() => setSrc(item.link)}
      onMouseLeave={() => setSrc(item.still)}
    >
      <img
        alt={item.name}
        src={src}
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-sm font-medium uppercase tracking-widest text-white">
          Join as
        </p>

        <p className="text-xl font-bold text-lime-400 sm:text-2xl">
          {item.name}
        </p>

        <div className="mt-32 sm:mt-48 lg:mt-64">
          <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm text-white md:text-2xl">{item.desc}</p>
          </div>
        </div>
      </div>
    </a>
  );
};

export default Page;
