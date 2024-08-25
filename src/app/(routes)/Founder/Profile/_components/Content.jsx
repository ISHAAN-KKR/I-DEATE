"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { MapPin, LifeBuoy } from "lucide-react";
import { Input } from "../../../../../components/ui/input";
import { db } from "../../../../../../utils/db";
import { Founder } from "../../../../../../utils/schema"; // Adjust the schema import as necessary
import { eq } from "drizzle-orm";
import { Button } from "../../../../../components/ui/button"; // Assuming you have a Button component
import { MoveUp } from "lucide-react";
function Page() {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    bio: "",
    location: "Kolkata, India", // Set this value as a default or fetch from the user details
    yoe: 0,
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const userDetails = await db.select().from(Founder).where(eq(Founder.id, user.id));
          setUserDetails(userDetails[0]); // Assuming you get an array of results, take the first one
          setFormValues({
            bio: userDetails[0]?.bio || "",
            location: userDetails[0]?.location || "Kolkata, India",
            yoe: userDetails[0]?.yoe || 0,
          });
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing((prevState) => !prevState);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the user details in the database
      await db.update(Founder).set(formValues).where(eq(Founder.id, user.id));
      // Refresh the user details
      setUserDetails((prevDetails) => ({
        ...prevDetails,
        ...formValues,
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  if (!userDetails) {
    return <div className="h-screen w-full flex justify-center items-center">
 
<div
  class="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full"
>
  <div
    class="rounded-full h-full w-full bg-slate-100 dark:bg-zinc-900 background-blur-md"
  ></div>
</div>


    </div>;
  }

  return (
    <>
      <div className="h- w-full flex justify-center dark:bg-gray-900">
        <div className="relative w-full max-w-4xl my-8 md:my-4 flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 px-4 py-8 border-2 border-dashed border-gray-400 dark:border-gray-400 shadow-lg rounded-lg">
          <span className="absolute text-xs font-medium top-0 left-0 rounded-br-lg rounded-tl-lg px-2 py-1 bg-primary-100 dark:bg-gray-900 dark:text-gray-300 border-gray-400 dark:border-gray-400 border-b-2 border-r-2 border-dashed ">
            Founder
          </span>

          <div className="w-full flex justify-center sm:justify-start sm:w-auto">
            <img className="rounded-full w-32" src={user?.imageUrl} alt="User profile" />
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:items-start">
            <p className="font-display mb-2 text-2xl font-semibold dark:text-gray-200">
              {user?.fullName}
            </p>

            {isEditing ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="mb-4 md:text-lg text-gray-400">
                  <Input
                    name="bio"
                    placeholder="Enter your bio"
                    value={formValues.bio}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex gap-4">
                    <MapPin className="my-1 text-green-400" />
                    <Input
                      name="location"
                      placeholder="Location"
                      value={formValues.location}
                      onChange={handleInputChange}
                    />
                  </div>
                  <h1 className="w-[30rem] py-1 flex gap-3">
                    <LifeBuoy className="text-green-500" />
                    <Input
                      name="yoe"
                      type="number"
                      placeholder="Years of Experience"
                      value={formValues.yoe}
                      onChange={handleInputChange}
                    />
                  </h1>
                </div>

                <Button className='mt-12' type="submit">Save</Button>
              </form>
            ) : (
              <>
                <div className="mb-4 md:text-lg text-gray-400">
                  <p>{userDetails?.bio || "No bio available."}</p>
                </div>

                <div>
                  <div className="flex gap-4">
                    <div className="flex gap-4">
                      <MapPin className="my-1 text-green-400" />
                      <Input placeholder="Location" value={formValues.location} readOnly />
                    </div>
                    <h1 className="w-[30rem] py-1 flex gap-3">
                      <LifeBuoy className="text-green-500" />
                      {userDetails?.yoe} years of Experience
                    </h1>
                  </div>
                </div>
              </>
            )}

            <Button className='mt-12' onClick={handleEditToggle}>
              {isEditing ? "Cancel" : "Edit Profile"}
            </Button>
          </div>
        </div>
      </div>

    </>
  );
}

export default Page;
