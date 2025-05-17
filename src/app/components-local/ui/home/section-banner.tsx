'use client'

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { EmblaCarouselType } from 'embla-carousel'

const SectionBanner = ({ imagesSrc }: { imagesSrc: { src: string; alt: string }[] }) => {
    const emblaApiRef = useRef<EmblaCarouselType | undefined>(null);
    const autoplay = useRef(Autoplay({ delay: 4500, stopOnInteraction: false }))

    useEffect(() => {
        if (emblaApiRef.current) {
            const autoplayInstance = autoplay.current;

            return () => {
                if (autoplayInstance) {
                    autoplayInstance.stop();
                }
            }
        }
    }, [])
    return (
        <section aria-label="Hero Banner" className="flex-shrink-0 px-3 w-[20em] sm:w-[30em] md:w-[33em] lg:w-[36em] flex items-center justify-center">
            <Carousel className="w-full"
                plugins={[autoplay.current]}
                setApi={(api) => emblaApiRef.current = api}
            >
                <CarouselContent>
                    {imagesSrc.map((image, index) => (
                        <CarouselItem key={index} className="w-full h-[14em] sm:h-[20em] md:h-[22em]">
                            <Image
                                src={image.src}
                                width={586}
                                height={352}
                                alt={image.alt}
                                className="rounded-lg object-cover object-top"
                                priority
                            />
                        </CarouselItem>

                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-0 top-1/2 z-10 -translate-y-1/2 transform px-3 sm:px-4 md:px-6" />
                <CarouselNext className="absolute right-0 top-1/2 z-10 -translate-y-1/2 transform px-3 sm:px-4 md:px-6" />
            </Carousel>
        </section>
    )
}

export default SectionBanner;
