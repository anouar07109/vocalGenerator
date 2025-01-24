import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";


import { Button } from "@/components/ui/button";

export default function CreateVocal() {
  const [showGenerateOptions, setShowGenerateOptions] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    language: "",
    text: "",
    vocal_source: "upload",
  });
  const [vocalFile, setVocalFile] = useState(null);

  const submitForm = () => {
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("language", form.language);
    formData.append("text", form.text);
    formData.append("vocal_source", form.vocal_source);
    formData.append("vocal", vocalFile);
    axios
      .post("http://localhost:3001/vocals", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  return (
    <div className="w-screen h-screen  flex-col flex-auto place-self-auto py-5 ">
      <div className="flex flex-col space-y-2 w-full">
        <Label htmlFor="text" className="text-base font-medium text-gray-800">
          Votre message
        </Label>
        <Textarea
          placeholder="Bonjour, je vous contacte car..."
          className="w-full p-4 border border-gray-300 rounded-lg bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, text: e.target.value })}
        />
      </div>
  

      <div className="flex flex-col space-y-2 w-full">
        <Label htmlFor="language" className="text-base font-medium text-gray-800">
          Language
        </Label>
        <Select
          onValueChange={(value) => setForm({ ...form, language: value })}
          className="w-full"
        >
          <SelectTrigger className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-black">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-md">
            <SelectGroup>
              <SelectLabel className="text-sm font-semibold text-gray-500">
                Select language
              </SelectLabel>
              <SelectItem value="english">English</SelectItem>
              <SelectItem value="arabic">Arabic</SelectItem>
              <SelectItem value="french">French</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
  
 
      <div className="flex flex-col space-y-2 w-full">
        <label htmlFor="name" className="text-base font-medium text-gray-800">
          Name
        </label>
        <input
          id="name"
          type="text"
          value={form.name}
          placeholder="Enter your name"
          className="w-full border-b-2 border-black bg-gray-50 focus:outline-none focus:ring-0 text-gray-800 placeholder-gray-500"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
  
 
      <div className="flex flex-col space-y-4 w-full">
        <Label className="text-base font-medium text-gray-800">Vocal Source</Label>
        <RadioGroup
          defaultValue="upload"
          onValueChange={(value) => setForm({ ...form, vocal_source: value })}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="generated" className="border-gray-300" />
            <Label htmlFor="generated" className="text-gray-700">
              Generated
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="upload" id="upload" className="border-gray-300" />
            <Label htmlFor="upload" className="text-gray-700">
              Upload
            </Label>
          </div>
        </RadioGroup>
      </div>
  
     
      {form.vocal_source === "upload" && (
        <div className="flex flex-col space-y-2 w-full">
          <Label
            htmlFor="fileUpload"
            className="text-base font-medium text-gray-800"
          >
            Upload a File
          </Label>
          <input
            type="file"
            id="fileUpload"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:bg-gray-200 file:text-blue-600 hover:file:bg-blue-300"
            onChange={(e) => setVocalFile(e.target.files[0])}
          />
        </div>
      )}
  
      {form.vocal_source === "generated" && (
        <div className="flex flex-col space-y-4 w-full">
       
          <div className="space-y-2">
            <Label
              htmlFor="style"
              className="text-base font-medium text-gray-800"
            >
              Style
            </Label>
            <Input
              id="style"
              type="text"
              value={form.style}
              placeholder="Enter style"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-black "
              onChange={(e) => setForm({ ...form, style: e.target.value })}
            />
          </div>
  
        
          <div>
            <Label
              htmlFor="volume"
              className="text-base font-medium text-gray-800 mb-2"
            >
              Adjust Volume
            </Label>
            <input
              type="range"
              id="volume"
              className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-black"
              min="0"
              max="100"
              step="1"
              onChange={(e) => setForm({ ...form, volume: e.target.value })}
            />
          </div>
        </div>
      )}
  
 
      <Button
        onClick={submitForm}
        className="w-full py-3 px-6 text-white bg-blue-600 hover:bg-blue-700 rounded-lg text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Submit
      </Button>
    
  </div>
  

  )
}
