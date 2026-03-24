"use client";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type CarouselItem = {
    id: number;
    title: string;
    image: string;
};

type SimpleCarouselProps = {
    items: CarouselItem[];
}


export default function Carousel({items}:SimpleCarouselProps) {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) => prev === 0 ? items.length - 1 : prev - 1)
    }
    const nextSlide = () => {
        setCurrent((prev) => prev === items.length - 1 ? 0 : prev + 1)
    }


    
  return (
    <div className="relative mx-auto max-w-3xl">
        {/* Viewport */}
        <div className="overflow-hidden">
            <div className="flex transition-all duration-300 ease-in" style={{transform:`translateX(-${current * 100}%)`}}>
                {items.map((item) =>(
                    <div key={item.id} className="w-full shrink-0">
                            <div className="relative aspect-5/3 w-full h-full">
                                <Image
                                src={item.image}
                                alt={item.title}
                                width={1200}
                                height={800}
                                className="object-contain"
                                />
                            </div>
                    </div>
                ))}
            </div>
        </div>
                <div className="flex items-center justify-between w-100 mx-auto">
                    <button onClick={prevSlide} className="bg-linear-to-br from-(--blue-900) to-(--blue-600) hover:bg-(--gray-100) rounded-full p-2 cursor-pointer text-primary-text"><ChevronLeft/></button>
                    {items.map((_, index) =>(
                        <button
                        key={index}
                        onClick={()=> setCurrent(index)}
                        type="button"
                        className={`h-4 w-4 rounded-full cursor-pointer ${current === index ? "bg-(--blue-600)" : "bg-(--blue-100)"}`}
                        />
                    ))}
                    <button onClick={nextSlide} className="bg-linear-to-br from-(--blue-900) to-(--blue-600) hover:bg-(--gray-100) rounded-full p-2 cursor-pointer text-primary-text"><ChevronRight/></button>
                </div>
      
    </div>
  )
}
