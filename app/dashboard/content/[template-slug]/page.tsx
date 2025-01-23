"use client";
import React, { useContext, useState } from "react";
import { use } from "react";
import FormSection from "../components_2/FormSection";
import OutputSection from "../components_2/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/dashboard/(data)/Templates";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { chatSession } from "@/utils/AiModel";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema"
import { useRouter } from "next/navigation";
import { createContext} from "react";
import { UserSubsContex } from "@/app/contex/UserSubsContex";




// Define the context
export const UserSubsContext = createContext({
  userSubscription: null, // Define the default value
  setUserSubscription: (value: any) => {},
});

// Context



import { TotalUsageContex } from "@/app/contex/TotalUsageContex";
import { UpdateCreditUsageContex } from "@/app/contex/UpdateCreaditUsage";





export default function TemplatePage({ params }: { params: Promise<{ "template-slug": string }> }) {
  const resolvedParams = use(params); // Correct usage of use()
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug === resolvedParams["template-slug"]
  );

const {userSubscription, setUserSubscription}=useContext(UserSubsContex);
const {updateCreaditUsage,setUpdateCreditUsage}=useContext(UpdateCreditUsageContex);
  
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();

 

 //------
 const {totalUsage,setTotalUsage}=useContext(TotalUsageContex)

  if (!selectedTemplate) {
    return <div>Template not found. Please check the URL or try again.</div>;
  }


  /**
   * Used to generate content from AI
   * @param FormData 
   * @returns 
   */

  const GenerateAiContent = async (FormData: Record<string, any>) => {
   
    try {
      if(totalUsage>=10000 &&! userSubscription)
        {
        console.log("Please Upgrade")
        router.push('/dashboard/billing')
        return;
      }
      setLoading(true);

      const selectedPrompt = selectedTemplate?.aiPrompt || "";
      const FinalAiPrompt = JSON.stringify(FormData) + ", " + selectedPrompt;
      const result = await chatSession.sendMessage(FinalAiPrompt);


      const responseText = await result.response.text();
      console.log(responseText);
      setAiOutput(responseText); // Correctly set the response text
      await SaveInDb( JSON.stringify(FormData), selectedTemplate?.slug, responseText); // Pass the response text


    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
      setLoading(false);
    }

    setUpdateCreditUsage(Date.now())
    
  };

  const SaveInDb = async (FormData: any, slug: string | undefined, aiResponse: string) => {
    try {
      const result = await db.insert(AIOutput).values({
        FormData: FormData ,
        templateSlug: slug || "unknown",
        aiResponse: aiResponse, // Use the correct variable
        createdBy: user?.primaryEmailAddress?.emailAddress || "unknown",
        createdAt: moment().format("DD/MM/YYYY"),
      });
      console.log(result);
    } catch (error) {
      console.error("Error saving to database:", error);
    }
  };

  return (
    <div className="p-10">
      <Link href="/dashboard">
        <button
          className={`flex items-center justify-between px-2 py-1 text-sm font-medium text-white rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-primary hover:scale-110"
          }`}
          disabled={loading}
        >
          <ArrowLeft />
          {loading ? "Loading..." : "Back"}
        </button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 py-5">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAiContent(v)}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}
