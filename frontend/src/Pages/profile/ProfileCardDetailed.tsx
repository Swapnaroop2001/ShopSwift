import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState, ChangeEvent } from "react";

interface User {
  name: string;
  email: string;
  address?: string;
  profilePic: string;
}

type EditableField = keyof User;

export default function ProfileCardDetailed() {
  const [user, setUser] = useState<User>({
    name: "John Doe",
    email: "john.doe@example.com",
    address: "123 Main St, San Francisco, CA 94105",
    profilePic: "https://github.com/shadcn.png",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedUser, setEditedUser] = useState<User>({ ...user });

  const handleEditToggle = () => {
    if (isEditing) {
      setUser({ ...editedUser });
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (field: EditableField, value: string) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditedUser((prev) => ({ ...prev, profilePic: imageUrl }));
      setUser((prev) => ({ ...prev, profilePic: imageUrl }));
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="bg-muted p-2 sm:p-4 rounded-lg w-full max-w-md mx-auto">
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-0">
          <div className="relative">
            <div className="h-24 sm:h-32 w-full bg-gradient-to-r from-yellow-600 to-yellow-300 rounded-t-lg" />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="relative group">
                <Avatar className="w-20 h-20 sm:w-24 md:w-32 sm:h-24 md:h-32 border-4 border-white">
                  <AvatarImage src={user.profilePic} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-4/5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90vw] max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-left">
                        Upload Profile Picture
                      </DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        className="w-full"
                      />
                      <Button
                        variant="outline"
                        onClick={() => setIsDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-16 sm:pt-20 px-4 sm:px-6 space-y-6">
          <div className="flex flex-col gap-2">
            {isEditing ? (
              <Input
                value={editedUser.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="text-lg sm:text-xl font-semibold w-full text-left"
              />
            ) : (
              <h2 className="text-lg sm:text-xl font-semibold text-left">
                {user.name}
              </h2>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col w-full">
              <Label className="text-sm text-muted-foreground text-left">
                Email
              </Label>
              {isEditing ? (
                <Input
                  value={editedUser.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full text-left mt-1"
                />
              ) : (
                <p className="text-sm break-words text-left">{user.email}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex flex-col w-full">
              <Label className="text-sm text-muted-foreground text-left">
                Address
              </Label>
              {isEditing ? (
                <Input
                  value={editedUser.address || ""}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full text-left mt-1"
                />
              ) : (
                <p className="text-sm break-words text-left">
                  {user.address || "Not provided"}
                </p>
              )}
            </div>
          </div>

          <div>
            <Button
              variant="outline"
              onClick={handleEditToggle}
              className="w-full sm:w-auto"
            >
              {isEditing ? "Save" : "Edit Profile"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}