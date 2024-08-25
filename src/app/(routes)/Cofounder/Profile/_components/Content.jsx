"use client";
import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { MapPin, LifeBuoy } from "lucide-react";
import { Input } from "../../../../../components/ui/input";
import { db } from "../../../../../../utils/db";
import { CoFounder } from "../../../../../../utils/schema";
import { eq } from "drizzle-orm";
import { Button } from "../../../../../components/ui/button";

function CoFounderPage() {
  const { user } = useUser();
  const [coFounderDetails, setCoFounderDetails] = useState(null);
  const [isEditing, setIsEditing] = useState(true); // Start in editing mode if no details
  const [formValues, setFormValues] = useState({
    bio: "",
    location: "",
    yoe: 0,
  });

  useEffect(() => {
    const fetchCoFounderDetails = async () => {
      if (user) {
        try {
          const coFounderDetails = await db.select().from(CoFounder).where(eq(CoFounder.id, user.id));
          if (coFounderDetails.length > 0) {
            setCoFounderDetails(coFounderDetails[0]);
            setFormValues({
              bio: coFounderDetails[0]?.bio || "",
              location: coFounderDetails[0]?.location || " your location",
              yoe: coFounderDetails[0]?.yoe || 0,
            });
            setIsEditing(false); // If details exist, start in non-editing mode
          } else {
            setIsEditing(true); // Start in editing mode if no details
          }
        } catch (error) {
          console.error("Error fetching co-founder details:", error);
        }
      }
    };

    fetchCoFounderDetails();
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
      // Upsert logic: Insert new record if none exists, or update existing
      if (coFounderDetails) {
        await db.update(CoFounder).set(formValues).where(eq(CoFounder.id, user.id));
      } else {
        await db.insert(CoFounder).values({ id: user.id, ...formValues });
      }
      setCoFounderDetails(formValues);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating co-founder details:", error);
    }
  };

  const renderSkeleton = () => (
    <div className="animate-pulse flex flex-col items-center">
      <div className="w-32 h-32 rounded-full bg-gray-300"></div>
      <div className="w-48 h-6 mt-4 bg-gray-300 rounded"></div>
      <div className="w-64 h-4 mt-2 bg-gray-300 rounded"></div>
      <div className="w-64 h-4 mt-2 bg-gray-300 rounded"></div>
      <div className="w-48 h-4 mt-2 bg-gray-300 rounded"></div>
    </div>
  );

  if (!coFounderDetails && !isEditing) {
    return (
      <div className="h-screen w-full flex justify-center items-center">
        {renderSkeleton()}
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center dark:bg-gray-900">
      <div className="relative w-full max-w-4xl my-8 md:my-4 flex flex-col items-start space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6 px-4 py-8 border-2 border-dashed border-gray-400 dark:border-gray-400 shadow-lg rounded-lg">
        <span className="absolute text-xs font-medium top-0 left-0 rounded-br-lg rounded-tl-lg px-2 py-1 bg-primary-100 dark:bg-gray-900 dark:text-gray-300 border-gray-400 dark:border-gray-400 border-b-2 border-r-2 border-dashed">
          Co-Founder
        </span>

        <div className="w-full flex justify-center sm:justify-start sm:w-auto">
          <img className="rounded-full w-32" src={user?.imageUrl} alt="Co-Founder profile" />
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

              <Button className="mt-12" type="submit">
                Save
              </Button>
            </form>
          ) : (
            <>
              <div className="mb-4 md:text-lg text-gray-400">
                <p>{coFounderDetails?.bio || "No bio available."}</p>
              </div>

              <div>
                <div className="flex gap-4">
                  <div className="flex gap-4">
                    <MapPin className="my-1 text-green-400" />
                    <Input placeholder="Location" value={formValues.location} readOnly />
                  </div>
                  <h1 className="w-[30rem] py-1 flex gap-3">
                    <LifeBuoy className="text-green-500" />
                    {coFounderDetails?.yoe} years of Experience
                  </h1>
                </div>
              </div>
            </>
          )}
          <Button className="mt-12" variant="outline" onClick={handleEditToggle}>
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
          <div className="h-[20vh] my-7 w-[40vw] flex gap-4 ml-32">
            <div className="bg-white py-6 sm:py-8 lg:py-12">
              <div className="mx-auto max-w-screen-lg px-4 md:px-8">
                <div className="grid-cols-2 gap-6 rounded-lg bg-black flex justify-between p-6 md:grid-cols-4 md:gap-8 md:p-8">
                  <div className="flex flex-col items-center">
                    <div className="text-xl font-bold text-lime-400 sm:text-2xl md:text-3xl">
                      {coFounderDetails?.connects || 0}+
                    </div>
                    <div className="text-sm text-indigo-50 sm:text-base">Connects</div>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="text-xl font-bold text-lime-400 sm:text-2xl md:text-3xl">
                      {coFounderDetails?.analytics?.contracts || 0}+
                    </div>
                    <div className="text-sm text-indigo-50 sm:text-base">Contracts</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoFounderPage;
