import { GalleryVerticalEnd } from "lucide-react";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";
import { useState } from "react";

export default function Authentication() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 fixed inset-0">
      <div className="w-full max-w-sm flex flex-col gap-6">
        <a
          href="#"
          className="flex items-center gap-2 self-center font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          ShopSwift inc.
        </a>
        {showSignup ? (
          <SignupForm onSwitch={() => setShowSignup(false)} />
        ) : (
          <LoginForm onSwitch={() => setShowSignup(true)} />
        )}
      </div>
    </div>
  );
}