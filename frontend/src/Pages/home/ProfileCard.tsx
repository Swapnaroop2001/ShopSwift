import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
export default function ProfileCard() {
  return (
    <div className="bg-muted p-4 rounded-lg">
        <Card>
          <CardHeader className="flex justify-center items-center">
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Avatar className="w-16 h-16 mb-2">
              <AvatarImage src="https://github.com/shadcn.png" alt="User" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">John Doe</h2>
            <p className="text-sm text-muted-foreground">
              Passionate shopper and Swift enthusiast.
            </p>
          </CardContent>
        </Card>
    </div>
  )
}
