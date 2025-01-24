import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";

export default function VocalList() {
  const [vocals, setVocals] = React.useState([]);

  const navigate = useNavigate();

  const navigateTo = (path: string) => {
    navigate(path);
  };

  React.useEffect(() => {
    axios.get("http://localhost:3001/vocals").then((response) => {
      setVocals(response.data);
    });
  }, []);
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 underline">Vocal List</h2>
        <button
          className="flex items-center justify-center border-px-4  bg-gray-800 text-white font-semibold py-2 px-4 rounded-full shadow-md hover:bg-neutral-900 focus:outline-none focus:ring-2  transition duration-300 ease-in-out"
          type="submit"
          onClick={() => navigateTo("/vocals/create")}
        >
          Create Vocal
        </button>

        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] underline">#Id</TableHead>
              <TableHead className="uppercase underline">Text</TableHead>
              <TableHead className="uppercase underline">Name</TableHead>
              <TableHead className="uppercase underline">Language</TableHead>
              <TableHead className="uppercase underline">Play</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vocals.map((vocal, index) => (
              <TableRow key={vocal.id || index}>
                <TableCell className="w-[100px]">{vocal.id}</TableCell>
                <TableCell className="font-medium">{vocal.text}</TableCell>
                <TableCell>{vocal.name}</TableCell>
                <TableCell>{vocal.language}</TableCell>
                <TableCell>
                  <audio controls>
                    <source
                      src={`http://localhost:3001/audios/${vocal.path}`}
                      type="audio/mp3"
                    />
                    Votre navigateur ne supporte pas l'élément audio.
                  </audio>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="aspect-video rounded-xl bg-muted/50" />
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
}
