"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Input } from "../../../../../components/ui/input";
import { db } from "../../../../../../utils/db";
import { CoFounder } from "../../../../../../utils/schema"; // Adjust the schema import as necessary
import { eq } from "drizzle-orm";
import { Button } from "../../../../../components/ui/button";
import { MapPin, LifeBuoy, UserPlus, BarChart2 } from "lucide-react";

function Content() {
  const { user } = useUser();
  const [cofounderDetails, setCofounderDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    picture: "",
    location: "",
    yoe: 0,
    bio: "",
    connects: 0,
    analytics: {},
    sentence: "",
    room: {},
  });

  useEffect(() => {
    const fetchCofounderDetails = async () => {
      if (user) {
        try {
          const cofounderDetails = await db
            .select()
            .from(CoFounder)
            .where(eq(CoFounder.id, user.id));
          setCofounderDetails(cofounderDetails[0]);
          setFormValues({
            name: cofounderDetails[0]?.name || "",
            picture: cofounderDetails[0]?.picture || "",
            location: cofounderDetails[0]?.location || "",
            yoe: cofounderDetails[0]?.yoe || 0,
            bio: cofounderDetails[0]?.bio || "",
            connects: cofounderDetails[0]?.connects || 0,
            analytics: cofounderDetails[0]?.analytics || {},
            sentence: cofounderDetails[0]?.sentence || "",
            room: cofounderDetails[0]?.room || {},
          });
        } catch (error) {
          console.error("Error fetching co-founder details:", error);
        }
      }
    };

    fetchCofounderDetails();
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
      await db.update(CoFounder).set(formValues).where(eq(CoFounder.id, user.id));
      setCofounderDetails((prevDetails) => ({
        ...prevDetails,
        ...formValues,
      }));
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating co-founder details:", error);
    }
  };

  if (!cofounderDetails) {
    return <div className="h-screen w-full flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="h-screen w-full flex justify-center dark:bg-gray-900">
      <div className="relative w-full max-w-4xl my-8 flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 px-4 py-8 border-2 border-dashed border-gray-400 dark:border-gray-400 shadow-lg rounded-lg">
        <span className="absolute text-xs font-medium top-0 left-0 rounded-br-lg rounded-tl-lg px-2 py-1 bg-primary-100 dark:bg-gray-900 dark:text-gray-300 border-gray-400 dark:border-gray-400 border-b-2 border-r-2 border-dashed ">
          Co-Founder
        </span>

        <div className="w-full flex justify-center sm:justify-start sm:w-auto">
          <img className="rounded-full w-32" src={formValues.picture} alt="Co-founder profile" />
        </div>

        <div className="w-full sm:w-auto flex flex-col sm:items-start">
          <p className="font-display mb-2 text-2xl font-semibold dark:text-gray-200">
            {formValues.name}
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

              <div className="flex gap-4">
                <div className="flex gap-4">
                  <UserPlus className="my-1 text-blue-400" />
                  <Input
                    name="connects"
                    type="number"
                    placeholder="Connections"
                    value={formValues.connects}
                    onChange={handleInputChange}
                  />
                </div>
                <h1 className="w-[30rem] py-1 flex gap-3">
                  <BarChart2 className="text-yellow-500" />
                  <Input
                    name="analytics"
                    type="text"
                    placeholder="Analytics"
                    value={JSON.stringify(formValues.analytics)}
                    onChange={handleInputChange}
                  />
                </h1>
              </div>

              <Button className='mt-12' type="submit">Save</Button>
            </form>
          ) : (
            <>
              <div className="mb-4 md:text-lg text-gray-400">
                <p>{formValues.bio || "No bio available."}</p>
              </div>

              <div>
                <div className="flex gap-4">
                  <div className="flex gap-4">
                    <MapPin className="my-1 text-green-400" />
                    <Input placeholder="Location" value={formValues.location} readOnly />
                  </div>
                  <h1 className="w-[30rem] py-1 flex gap-3">
                    <LifeBuoy className="text-green-500" />
                    {formValues.yoe} years of Experience
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
  );
}

export default Content;
