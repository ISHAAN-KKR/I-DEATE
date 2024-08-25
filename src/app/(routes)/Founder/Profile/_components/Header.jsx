"use client";
import { useEffect, useState } from 'react';
import React from 'react';
import { db } from '../../../../../../utils/db';
import { Founder } from '../../../../../../utils/schema';
import { eq } from 'drizzle-orm';
import { UserButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import ConnectBuuton from './ConnectButton/ConnectBuuton';

function Header() {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState(null); // Initialize state for userDetails

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user) {
        try {
          const userDetails = await db.select().from(Founder).where(eq(Founder.id, user.id));
          setUserDetails(userDetails[0]); // Store the fetched user details in state
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [user]);

  return (
    <>
      <div className='flex justify-end w-full gap-2 items-center p-4'>
        <div className='flex gap-2 items-center'>
          <ConnectBuuton title={`${userDetails?.connects || 20}`} />
          {/* If userDetails is null, default to 20 */}
        </div>
        <div>
          {/* UserIcon */}
          <UserButton />
        </div>
      </div>
    </>
  );
}

export default Header;
