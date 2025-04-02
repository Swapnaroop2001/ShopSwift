import { useState } from "react";
import image1 from "../../../public/Alkmaar-Netherlands.jpg";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define the interface for props
interface ProductPostProps {
  title: string;
  images: string[];
  description: string;
  owner: {
    name: string;
    avatar?: string;
  };
}

// ProductPost Component
export function ProductPost({ title, images, description, owner }: ProductPostProps) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const renderImages = () => {
    if (images.length === 0) return null;

    return (
      <div className="grid w-full grid-cols-2 gap-2">
        {/* First large image - 16:9 ratio for reduced height */}
        <div className="col-span-2 aspect-[16/9] relative">
          <img
            src={images[0]}
            alt={`${title} - Image 1`}
            className="absolute inset-0 w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Two smaller images */}
        {images.length >= 2 && (
          <div className="aspect-[16/9] relative">
            <img
              src={images[1]}
              alt={`${title} - Image 2`}
              className="absolute inset-0 w-full h-full object-cover rounded-md"
            />
          </div>
        )}
        <div className="aspect-[16/9] relative">
          {images.length >= 3 && (
            <img
              src={images[2]}
              alt={`${title} - Image 3`}
              className="absolute inset-0 w-full h-full object-cover rounded-md"
            />
          )}
          {images.length >= 3 && (
            <button
              onClick={() => setIsPopupOpen(true)}
              className="absolute inset-0 w-full h-full flex justify-center items-center bg-black/50 text-white text-lg rounded-md"
            >
              + See All
            </button>
          )}
          {images.length === 2 && (
            <div className="absolute inset-0 w-full h-full bg-gray-200 rounded-md" />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <Card className="w-full max-w-lg mx-auto gap-2">
        <CardHeader>
          <div className="flex gap-4">
            <Avatar className="w-12 h-12">
              <AvatarImage src={owner?.avatar} alt={owner?.name} />
              <AvatarFallback>{owner?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <CardTitle className="text-xl">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{owner?.name}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="text-start">
            <p className="text-gray-700">{description}</p>
          </div>
          <div className="mb-2 mt-2">{renderImages()}</div>
        </CardContent>

        <CardFooter>
          <Button className="w-full">Chat with {owner?.name} to Negotiate</Button>
        </CardFooter>
      </Card>

      {images.length >= 3 && (
        <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <DialogContent className="gap-3" style={{ maxWidth: "50rem", width: "100%", maxHeight: "80vh" }}>
            <DialogHeader>
              <DialogTitle>{title} - All Photos</DialogTitle>
            </DialogHeader>
            <Carousel className="w-full">
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 aspect-[16/9] relative">
                      <img
                        src={image}
                        alt={`${title} - Image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <div>
              <Button className="w-full">Chat with {owner?.name}</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

// App Component
export default function App() {
  const product: ProductPostProps = {
    title: "Vintage Camera Collection",
    images: [ image1,image1,image1,image1],
    description:
      "Selling my vintage camera collection in excellent condition. Perfect for photography enthusiasts or collectors. Price negotiable.",
    owner: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
    },
  };

  return (
    <div className="p-4">
      <ProductPost {...product} />
    </div>
  );
}