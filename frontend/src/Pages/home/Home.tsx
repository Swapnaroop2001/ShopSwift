import Feed from "./Feed";
import Filters from "./Filters";
import ProfileCard from "./ProfileCard";
import StartAPost from "./StartAPost";

export default function Home() {
  return (
    <div className="mt-12 flex justify-center min-h-screen">
      <div className="w-full max-w-[1350px] grid sm:p-4 p-0 grid-cols-1 md:grid-cols-9 lg:grid-cols-9 gap-3">
        {/* Section 1: User Profile - Hidden on mobile, sticky on tablet+ */}
        <section className="hidden md:block rounded-lg p-3 md:col-span-3 lg:col-span-2 max-w-[300px] sticky top-12 h-fit">
          <ProfileCard />
        </section>

        {/* Section 2: Start a Post & Feed - Always visible, scrollable */}
        <section className="rounded-lg p-3 col-span-1 md:col-span-6 lg:col-span-4 h-full max-w-[600px] md:max-w-full lg:max-w-[600px]">
          <StartAPost />
          <Feed />
        </section>

        {/* Section 3: Filter Tab - Shows on large screens, sticky */}
        <section className="hidden lg:block rounded-lg p-3 lg:col-span-3 max-w-[400px]">
          <Filters />
        </section>
      </div>
    </div>
  );
}