"use client";
import React, { useState, useEffect } from "react";
import { Button } from "./../../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./../../../../../../@/components/ui/dialog";
import { Input } from "./../../../../../components/ui/input";
import { Label } from "./../../../../../components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../../../../../../@/components/ui/select"
import { CardWithForm } from "./_component/List";
import { useUser } from "@clerk/nextjs";
import { db } from "../../../../../../utils/db";
import { Ideas } from "../../../../../../utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';

export default function Page() {  
  const { user } = useUser();
  const [ideas, setIdeas] = useState([]);
  const [formValues, setFormValues] = useState({
    idea_title: "",
    desc: "",
    pref_loc: "",
    pref_yoe: "",
    industry: "",
  });

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const ideas = await db.select().from(Ideas).where(eq(Ideas.founder_id, user?.id));
        setIdeas(ideas);
        console.log(ideas);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      }
    };

    if (user?.id) {
      fetchIdeas();
    }
  }, [user?.id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await db.insert(Ideas).values({
        id: uuidv4(),
        idea_id: uuidv4(),
        founder_id: user.id, 
        idea_title: formValues.idea_title,
        idea_desc: formValues.desc,
        pref_loc: formValues.pref_loc,
        pref_yoe: formValues.pref_yoe,
        industry: formValues.industry,
      });
      alert("Idea saved successfully!");
    } catch (error) {
      console.error("Error saving idea:", error);
    }
  };

  return (
    <>
      <div className="mx-auto ml-5 mt-8">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="py-12 px-8 shadow-md" variant="outline">
              + Add Idea
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] ml-[40rem] -mt-[30rem]">
            <DialogHeader>
              <DialogTitle>Add Idea</DialogTitle>
              <DialogDescription>
                Provide details about your new idea. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleFormSubmit}>
              <div className="grid gap-4 py-4">
                {/* Form Fields */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="idea_title" className="text-right">
                    Idea Title
                  </Label>
                  <Input
                    id="idea_title"
                    name="idea_title"
                    placeholder="Idea Title"
                    value={formValues.idea_title}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="desc" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="desc"
                    name="desc"
                    placeholder="Short description"
                    value={formValues.desc}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pref_loc" className="text-right">
                    Preferred Location
                  </Label>
                  <Input
                    id="pref_loc"
                    name="pref_loc"
                    placeholder="Preferred Location"
                    value={formValues.pref_loc}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pref_yoe" className="text-right">
                    Years of Experience
                  </Label>
                  <Input
                    id="pref_yoe"
                    name="pref_yoe"
                    type="number"
                    placeholder="Years of Experience"
                    value={formValues.pref_yoe}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="industry" className="text-right">
                    Industry Category
                  </Label>
                  <Select
                    id="industry"
                    name="industry"
                    value={formValues.industry}
                    onValueChange={(value) =>
                      setFormValues((prev) => ({ ...prev, industry: value }))
                    }
                    className="col-span-3"
                  >
                    <SelectTrigger className="col-span-3">
                      <Input placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tech">Tech</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Health">Health</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mt-[10vh]">
        <p className="text-xl font-bold mb-5">Previous Ideas</p>
        <div className="flex gap-5">
          {ideas.map((idea, index) => (
            <CardWithForm className="" key={index} params={idea} />
          ))}
        </div>
      </div>
    </>
  );
}
