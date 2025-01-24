"use client"
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { db } from '@/utils/db';
import { AIOutput, UserSub } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { HISTORY } from "../history/page";
import { TotalUsageContex } from "@/app/contex/TotalUsageContex";
import { useRouter } from "next/navigation";
import { UserSubsContex } from "@/app/contex/UserSubsContex";
import { UpdateCreditUsageContex } from "@/app/contex/UpdateCreaditUsage";


 function UsageTrack() {

const {user}=useUser();
const {totalUsage,setTotalUsage}=useContext(TotalUsageContex)
const {userSubscription, setUserSubscription}=useContext(UserSubsContex);
const [maxWords,setMaxWords]=useState(10000);
const {updateCreaditUsage,setUpdateCreditUsage}=useContext(UpdateCreditUsageContex);


useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      user&&GetData();
      user&&IsUserSubscribe();
    } else {
      console.error("User email address is missing.");
    }
  }, [user]);


  useEffect(()=>{
    user&&GetData();
  },[updateCreaditUsage && user]);
//------------------------------

  const GetData=async()=>{
    {/* @ts-ignore */}
    const result: HISTORY[]=await db.select().from(AIOutput)
    .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress || ""))


    GetTotalUsage(result)
}

const IsUserSubscribe=async()=>{
    const result=await db.select().from(UserSub)
    .where(eq(UserSub.email,user?.primaryEmailAddress?.emailAddress || ""))

    if(result){
      setUserSubscription(true);
      setMaxWords(100000);
    }
}

    //-----------------------
      const GetTotalUsage = (result: HISTORY[]) => {
        let total : number=0;
        result.forEach(element =>{
            total=total+Number(element.aiResponse?.length)
                });
        
        setTotalUsage(total)
        console.log("Total usage:", total);
      };
    
      const router = useRouter();

    return (
        <div className="m-5">
          <div className="bg-primary text-white p-3 rounded-lg">
            <h2 className="font-medium flex justify-center items-center">Credits</h2>
            <div className="h-2 bg-[#9981f9] w-full rounded-lg m-3">
              {/* @ts-ignore */}
              <div className="h-2 bg-white rounded-full"
                style={{ 
                    width: (totalUsage/maxWords)*100+"%" 
                }}
              ></div>
            </div>
            <h2 className="text-sm my-2 flex justify-center items-center">{totalUsage}/{maxWords} credits used</h2>
          </div>
          <Button variant="secondary" className="w-full my-3 text-primary"
           onClick={() => router.push("/dashboard/billing")}>
            Upgrade
          </Button>
        </div>
      );
    }

export default UsageTrack
