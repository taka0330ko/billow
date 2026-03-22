import { Button } from "@/components/ui/globalUI/button";
import Image from "next/image";
import Link from "next/link";



export default function LpPage() {
  return (

    <div className="min-h-screen">
      <header className="px-8 py-4">
        <Image
          src={"/images/Billow.svg"}
          alt="Billow logo"
          width={150}
          height={100}
        />
      </header>
      <main className="m-16">
        <div className="flex flex-col items-center gap-8">
          <div className="mx-auto w-full max-w-360 px-6">
            <h1 className="text-billow-primary-text text-5xl">
              Lorem ipsum malesuada id tincidunt ut aliquam enim elementum.
            </h1>
            <p className="text-2xl text-gray-500 mt-4">Manage your team subscriptions in one place. Track spending, organize plans, and make smarter business decisions with AI-powered insights.</p>
          </div>
          <Link href="/app">
            <Button className="py-8 px-4 text-md cursor-pointer">Open Dashboard</Button>
          </Link>
          <div>
            <Image
              src={"/images/dashboard.webp"}
              alt="Billow dashboard"
              width={1440}
              height={880}
            /></div>
        </div>
      </main >
    </div >

  );
}