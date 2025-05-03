'use clients'

import Image from "next/image";
import Button from "./components-local/ui/button/button";
import Link from "next/link";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function LandingPage() {

  const imagesSrc = [
    '/landing-page/salon1.jpg',
    '/landing-page/salon2.jpg'
  ]

  return (
    <main className="flex flex-col items-center justify-center gap-y-7 h-screen bg-gold-100 md:flex-row md:gap-x-28 [clip-path:polygon(0_40%,100%_0,100%_100%,0_100%)">
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white [clip-path:polygon(0_40%,100%_0,100%_100%,0_100%)] z-0"></div>

      <div className="flex justify-center items-center w-[250px] md:w-[450px]">
        <Carousel className="w-full">
          <CarouselContent>
            {imagesSrc.map((image, index) => (
              <CarouselItem key={index} className="flex justify-center basis-full">
                <Image
                  src={image}
                  width={450}
                  height={450}
                  alt="Landing Page Image"
                  className="rounded-lg"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform" />
          <CarouselNext className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform" />
        </Carousel>
      </div>
      <div className="flex flex-col justify-center items-center z-10">
        <h1 className="text-3xl wrap-break-word text-center font-lora">
          Ubah Rambutmu Menjadi Karya Seni
          <span className="block text-center">– Hanya di Addo Salon</span>
        </h1>
        <p className="font-federo mt-4 text-lg">Pesan janji temu dan nikmati pelayanannya!</p>
        <Link href="/home" className="w-[50%]">
          <Button className="text-white bg-gold-500 p-3 rounded-xl w-full mt-7 hover:bg-gold-600 focus-visible:outline-gold-700 font-medium transition-colors text-lg cursor-pointer active:translate-y-2 active:text-gray-300">
            Pesan di sini!
          </Button>
        </Link>
      </div>
    </main >
  );
}
