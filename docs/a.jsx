import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, FileEdit, Trash2, Folder, FilePlus } from "lucide-react";

const files = [
  { name: "Colab Notebooks", type: "folder" },
  { name: "input", type: "folder" },
  { name: "Word2Vec Implementation in Python", type: "file" },
  { name: "notebook", type: "folder" },
  { name: "junk1", type: "folder" },
  { name: "Notes", type: "folder" },
  { name: "URL's", type: "file" },
  { name: "books", type: "folder" },
  { name: "2020", type: "folder" },
  { name: "junk", type: "folder" },
  { name: "Untitled folder", type: "folder" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-lg font-medium">User: Roti Rome</span>
          <Button variant="default">
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <Button>
          <FilePlus className="mr-2 h-4 w-4" /> Create New File
        </Button>
        <Input placeholder="Search files..." className="w-64" />
      </div>

      <h2 className="text-2xl font-semibold mb-4">My Drive</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {files.map((file, index) => (
          <Card key={index} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              {file.type === "folder" ? (
                <Folder className="text-blue-500" />
              ) : (
                <FilePlus className="text-gray-500" />
              )}
              <span className="font-medium truncate max-w-[180px]">
                {file.name} ({file.type})
              </span>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline">
                <FileEdit className="w-4 h-4" />
              </Button>
              <Button size="icon" variant="destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
