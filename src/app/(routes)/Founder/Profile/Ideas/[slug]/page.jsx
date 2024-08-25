"use client";
import React, { useEffect, useState } from 'react';
import Example from './_components/MatchList';
import { useUser } from '@clerk/nextjs';
import { Ideas } from '../../../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import { db } from '../../../../../../../utils/db';
import { Lightbulb, MapPin, Timer } from 'lucide-react';

const SkeletonLoader = () => (
  <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8 animate-pulse">
    <div className="flex items-start sm:gap-8">
      <div
        className="hidden text-lime-800 sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-lime-600"
        aria-hidden="true"
      >
        <div className="flex items-center gap-1">
          <div className="w-12 h-12 bg-gray-300 rounded-full" />
        </div>
      </div>

      <div className="flex-1">
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>

        <div className="mt-4 sm:flex sm:items-center sm:gap-2">
          <div className="flex items-center gap-1 text-gray-500">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>

          <span className="hidden sm:block" aria-hidden="true">&middot;</span>

          <div className="mt-2 text-xs font-medium text-gray-500 sm:mt-0 flex gap-1">
            <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>
  </article>
);

const Page = ({ params }) => {
  const { user } = useUser();
  const [ideas, setIdeas] = useState(null); // Initial state as null to differentiate between no data and not fetched

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const ideamatch = params.slug; // Assuming params.slug contains the correct value
        console.log(ideamatch);

        // Ensure the column being compared with the slug is correct
        const idea = await db
          .select()
          .from(Ideas)
          .where(eq(Ideas.idea_id, ideamatch)); // Make sure 'idea_id' is a valid column in your table

        if (idea.length > 0) {
          setIdeas(idea[0]); // Assuming you're expecting a single match
        } else {
          setIdeas(null); // No matching idea found
        }
        console.log(idea);
      } catch (error) {
        console.error("Error fetching ideas:", error);
        setIdeas(null);
      }
    };

    if (user?.id) {
      fetchIdeas();
    }
  }, [user?.id]);

  return (
    <>
      {ideas ? (
        <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
          <div className="flex items-start sm:gap-8">
            <div
              className="hidden text-lime-800 sm:grid sm:size-20 sm:shrink-0 sm:place-content-center sm:rounded-full sm:border-2 sm:border-lime-600"
              aria-hidden="true"
            >
              <div className="flex items-center gap-1">
                <Lightbulb className='w-12 h-12'/>
              </div>
            </div>

            <div>
              <strong className="rounded border border-neutral-500 bg-lime-500 px-3 py-1.5 text-[10px] font-medium text-white">
                {ideas.idea_id}
              </strong>

              <h3 className="mt-4 text-lg font-medium sm:text-xl">
                <a href="#" className="hover:underline">{ideas.idea_title}</a>
              </h3>

              <p className="mt-1 text-sm text-gray-700">
                {ideas.idea_desc}
              </p>

              <div className="mt-4 sm:flex sm:items-center sm:gap-2">
                <div className="flex items-center gap-1 text-gray-500">
                  <MapPin className='w-4 h-4'/>
                  <p className="text-xs font-medium">{ideas.pref_loc}</p>
                </div>

                <span className="hidden sm:block" aria-hidden="true">&middot;</span>

                <p className="mt-2 text-xs font-medium text-gray-500 sm:mt-0 flex gap-1">
                  <Timer className='h-4 w-4'/>
                  {ideas.pref_yoe} years of Experience 
                </p>
              </div>
            </div>
          </div>
        </article>
      ) : (
        <SkeletonLoader />
      )}

      {ideas?.matched_ids ? (
        <Example />
      ) : (
        <p>No such People Found</p>
      )}
    </>
  );
};

export default Page;
