'use client';
import React, { useState } from 'react';
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { TotalUsageContex } from '../contex/TotalUsageContex';
import { UserSubsContex } from '../contex/UserSubsContex';
import { UpdateCreditUsageContex } from '../contex/UpdateCreaditUsage';
import { Footer } from './_components/Footer'


function Layout({ children }: { children: React.ReactNode }) {
  const [totalUsage, setTotalUsage] = useState<any>(0);
  const [userSubscription, setUserSubscription]= useState<any>(false);
  const [updateCreaditUsage,setUpdateCreditUsage]=useState<any>();

  return (
    <TotalUsageContex.Provider value={{totalUsage, setTotalUsage}}>
      <UserSubsContex.Provider value={{userSubscription, setUserSubscription}}>
        <UpdateCreditUsageContex.Provider value={{updateCreaditUsage,setUpdateCreditUsage}}>
      <div className="bg-slate-100 h-screen">
        <div className="md:w-64 hidden md:block fixed">
          <SideNav />
        </div>
        <div className="ml-64">
          <Header />
          {children}
          <Footer/>
        </div>
      </div>
      </UpdateCreditUsageContex.Provider>
      </UserSubsContex.Provider>
      </TotalUsageContex.Provider>
  );
}

export default Layout;
