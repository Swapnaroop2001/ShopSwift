import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WelcomeCard() {
  return (
    <Card className="max-w-md mx-auto mt-12 shadow-lg rounded-2xl bg-white dark:bg-gray-900">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800 dark:text-white">Welcome!</CardTitle>
      </CardHeader>
      <CardContent className="text-gray-600 dark:text-gray-300">
        We're glad to have you here. Explore and enjoy your experience!
      </CardContent>
    </Card>
  );
}
