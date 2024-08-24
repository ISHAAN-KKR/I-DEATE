"use client"
import React from "react"
import { Button } from "./../../../../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./../../../../../../@/components/ui/dialog"
import { Input } from "./../../../../../components/ui/input"
import { Label } from "./../../../../../components/ui/label"
import {CardWithForm} from './_component/List'


const ideas=[
  {
    title:'Idea 1',
    desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, ducimus. Fugiat unde minus vel adipisci...'
  },
  {
    title:'Idea 1',
    desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, ducimus. Fugiat unde minus vel adipisci...'
  }
]
export default function page() {
  return (
    <>
  
    <div className="mx-auto ml-5 mt-8">
          <Dialog>
      <DialogTrigger asChild>
        <Button className='py-12 px-8 shadow-md' variant="outline">+ Add Idea</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] ml-[40rem] -mt-[30rem]">
        <DialogHeader>
          <DialogTitle>Add Idea</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Idea Title 
            </Label>
            <Input id="name" placeholder="Idea Title" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Input id="username" placeholder="Short description" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <a href='/Founder/Questions'>

        
          <Button type="submit">Save changes</Button>
          </a>
        </DialogFooter>
      </DialogContent>
    </Dialog>


    </div>
    <div className="mt-[10vh]">
      <p className="text-xl font-bold mb-5">Previous Ideas</p>
      <div className="flex gap-5">
      {
        ideas.map((idea,index)=>(
            <CardWithForm className='' key={index} params={idea} />
        ))
      }
            </div>
    </div>
    </>
  )
}
