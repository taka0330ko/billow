import Image from "next/image";
import Link from "next/link";
import Carousel from "@/components/ui/lpPage/Carousel";
import CTAButton from "@/components/ui/lpPage/CTAButton";

const CarouselItem = [
  {
    id: 1,
    title:"Chat Page",
    image:"/images/chat-page.png"
  },
  {
    id: 2,
    title:"Chat Room Page",
    image:"/images/chat-room-page.png"
  },
  {
    id: 3,
    title:"Subscription Page",
    image:"/images/subscription-page.png"
  },
  {
    id: 4,
    title:"Members Page",
    image:"/images/member-page.png"
  }

]


export default function LpPage() {
  return (

    <div>
      <header className="px-8 py-4 absolute top-0">
        <Image
          src={"/images/Billow.svg"}
          alt="Billow logo"
          width={90}
          height={100}
        />
      </header>
      <main className="mx-4">
        <div className="flex flex-col gap-8 lg:grid grid-cols-12 place-items-center">
          <div className="col-start-1 col-span-4 text-center">
            <h1 className="text-lp-text text-4xl font-semi-bold">
              Manage your team’s subscriptions in one place.
            </h1>
            <p className="text-lg text-gray-500 mt-4">Manage your team subscriptions in one place. Track spending, organize plans, and make smarter business decisions with AI-powered insights.</p>
          <div className="mt-4">
            <Link href="/app">
              <CTAButton>Open Dashboard</CTAButton>
            </Link>
          </div>
          </div>
          <div className="col-start-5 col-span-8">
            <Carousel items={CarouselItem}/>
          </div>
        </div>
      </main >
    </div >

  );
}