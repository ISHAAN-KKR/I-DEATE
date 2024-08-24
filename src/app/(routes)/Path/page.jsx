"use client";
import React, { useState } from "react";

const path = [
  {
    name: "Founder",
    desc: "Turn your vision into reality by connecting with the perfect co-founder to build and grow your startup.",
    link: "/founder.gif",
    still: "/stillfounder.png"
  },
  {
    name: "Co-Founder",
    desc: "Join forces with a visionary founder, bringing your expertise to help create and scale innovative ideas.",
    link: "/cofounder.gif",
    still: "/stillcofounder.png"
  },
];

const Page = () => {
  return (
    // <div className="bg-black h-screen">
      
      <div class="bg-black pt-6 sm:pt-4 lg:pt-4">
  <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
    {/* <!-- text - start --> */}
    <div class="mb-2 md:mb-2">
      <h2 class="mb-4 mt-2 text-center text-2xl font-bold text-lime-500 md:mb-2 lg:text-3xl">Are You Here to <span className="text-white">Lead</span> or <span className="text-white">Collaborate</span>?</h2>

      <p class="mx-auto max-w-screen-md text-center text-neutral-400 md:text-lg">Discover your role in the journey of innovation. Whether you're here to lead with your vision or collaborate with your expertise, let's create something extraordinary together.</p>
    </div>
    {/* <!-- text - end --> */}

    <div className="flex px-16 gap-20 py-16 ">
        {path.map((item, index) => (
          <ImageCard key={index} item={item} />
        ))}
      </div>


    </div>
  </div>
    // </div>
  );
};

const ImageCard = ({ item }) => {
  const [src, setSrc] = useState(item.still); // Initialize with still image

  return (
    <a
      href="/"
      className="group relative block bg-black"
      onMouseEnter={() => setSrc(item.link)} // Switch to GIF on hover
      onMouseLeave={() => setSrc(item.still)} // Switch back to still on hover out
    >
      <img
        alt={item.name}
        src={src} // Dynamically set source
        className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
      />

      <div className="relative p-4 sm:p-6 lg:p-8">
        <p className="text-sm font-medium uppercase tracking-widest text-white">
          Join as
        </p>

        <p className="text-xl font-bold text-lime-400 sm:text-2xl">{item.name}</p>

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
