"use client"
import React, { useContext, useState } from 'react';
import axio from 'axios'
import { Loader2Icon } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { UserSub } from '@/utils/schema';
import moment from 'moment';
import { UserSubsContex } from '@/app/contex/UserSubsContex';

function Billing() {

  const [loading,setLoading]=useState(false);
  const { user }=useUser();
  const {userSubscription,setUserSubscription}=useContext(UserSubsContex);

const CreateSubscription=()=>{
  setLoading(true)
    axio.post('/api',{})
    .then(resp=>{
      console.log(resp.data);
      OnPayment(resp.data.id)
    },(error)=>{
      setLoading(false);
    })
}

const OnPayment=(subId : string)=>{
  const options={
    "key" : process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    "subscription_id" : subId,
    "name" : 'Ai-content-generator',
    description : 'Monthly Subscription',
    handler : async(resp:any)=>{
      console.log(resp);
      if(resp){
        SaveSubscription(resp.razorpay_payment_id)
      }
      setLoading(false);
    }
  }

    {/* @ts-ignore*/}
  const rzp=new window.Razorpay(options);
  rzp.open();
}

const SaveSubscription=async(paymentId:string)=>{
  const result=await db.insert(UserSub)
  .values({
    email:user?.primaryEmailAddress?.emailAddress,
    userName:user?.fullName,
    active:true,
    paymentId:paymentId,
    joinData:moment().format('DD/MM/YYYY')
  });
  console.log(result);
  if(result){

    window.location.reload();

  }
}

  return (
    <div>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <div className="mx-auto max-w-3xl px-4 py-4 sm:px-6 sm:py-12 lg:px-8">
        <h2 className="text-center font-bold text-3xl my-3">Upgrade With Monthly Plan</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center">
          {/* Free Plan */}
          <div className="rounded-2xl bg-white border border-gray-200 p-6">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Free
                <span className="sr-only"> Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-2xl">0.00₹</strong>
                <span className="text-sm font-medium text-gray-700"> /monthly</span>
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l5 5L20 7"
                  />
                </svg>
                <span className="text-gray-700">10,000 Words/Month</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l5 5L20 7"
                  />
                </svg>
                <span className="text-gray-700">50+ Content Templates</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l5 5L20 7"
                  />
                </svg>
                <span className="text-gray-700">Unlimited Download & Copy</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l5 5L20 7"
                  />
                </svg>
                <span className="text-gray-700">1 Month of History</span>
              </li>
            </ul>


            
            <a
              href="#"
              className="mt-8 rounded-full border border-indigo-600 px-28 py-3 flex gap-2 text-center text-xs 
              font-bold  text-indigo-600 hover:bg-gray-500 hover:text-white hover:ring-2
               hover:ring-indigo-600 focus:outline-none"
            >
              
               Free Plan
            </a>
           


          </div>

          {/* Monthly Plan */}
          <div className="rounded-2xl bg-white border border-gray-200 p-6">
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Monthly
                <span className="sr-only"> Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-2xl">19.00₹</strong>
                <span className="text-sm font-medium text-gray-700"> /monthly</span>
              </p>
            </div>

            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l5 5L20 7"
                  />
                </svg>
                <span className="text-gray-700">1,00,000 Words/Month</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l5 5L20 7"
                  />
                </svg>
                <span className="text-gray-700">50+ Content Templates</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l5 5L20 7"
                  />
                </svg>
                <span className="text-gray-700">Unlimited Download & Copy</span>
              </li>
              <li className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 12l5 5L20 7"
                  />
                </svg>
                <span className="text-gray-700">1 Year of History</span>
              </li>
            </ul>

            <button
            disabled={loading}
              onClick={()=>CreateSubscription()}
              className="mt-8 rounded-full border border-indigo-600 px-28 py-3 flex gap-2 text-center text-xs 
              font-bold  text-indigo-600 hover:bg-gray-500 hover:text-white hover:ring-2
               hover:ring-indigo-600 focus:outline-none"
               >
                {loading && <Loader2Icon className='animate-spin'/>}
                {userSubscription ?
                'Active plan':
                'Get Started'}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
