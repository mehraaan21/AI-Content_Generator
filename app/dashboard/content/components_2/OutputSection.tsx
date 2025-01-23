"use client";
import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";





// Dynamically import the Toast UI Editor with SSR disabled
const Editor = dynamic(() => import("@toast-ui/react-editor").then((mod) => mod.Editor), {
 
});

interface Props {
  aiOutput: string;
}

// Function to convert RTF to plain text
const convertRtfToPlainText = (rtf: string): string => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = rtf
    .replace(/\\par[d]?/g, "\n") // Replace paragraph breaks with newlines
    .replace(/\\[a-z]+\d*/g, "") // Remove RTF control words
    .replace(/{|}/g, ""); // Remove braces
  return tempDiv.textContent || "";
};

function OutputSection({ aiOutput }: Props) {
  const editorRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = editorRef.current.getInstance();
      const plainText = convertRtfToPlainText(aiOutput);
      editorInstance.setMarkdown(plainText);
    } else {
      console.warn("editorRef is not ready yet.");
    }
  }, [aiOutput]);

  return (
    <div className="bg-white shadow-lg border rounded-lg">
      <div className="flex justify-between items-center p-5">
        <h2 className="font-medium text-lg">Your Result</h2>
        <Button className="flex gap-2"
       onClick={() => navigator.clipboard.writeText(aiOutput)}
        ><Copy className="w-4 h-4" /> Copy
        </Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your result will appear here"
        initialEditType="wysiwyg"
        height="500px"
        useCommandShortcut={true}
        onChange={() => console.log(editorRef.current.getInstance().getMarkdown())}
      />
    </div>
  );
}

export default OutputSection;
