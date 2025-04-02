import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export default function StartAPost() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="bg-muted p-4 rounded-lg cursor-pointer">
          <Card>
            <CardHeader>
              <CardTitle>Start a Post</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Input placeholder="What's on your mind?" className="flex-1" readOnly />
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Start a Post</DialogTitle>
        </DialogHeader>
        <Card>
          <CardHeader>
            <CardTitle>Share Your product</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col text-left items-center gap-2">
              <Label className="self-start">Title</Label>
              <Textarea placeholder="Add Title.." className="flex-1" />
              <Label className="self-start">Description</Label>
              <Textarea placeholder="Add Description.." className="flex-1" />
            </div>
            <div className="grid w-full items-center gap-1.5 border-dashed border-2 border-black-900 p-4 rounded-md">            
              <Label htmlFor="picture">Add Picture</Label>
              <Input multiple id="picture" type="file" />
            </div>

            <Button>Post</Button>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}