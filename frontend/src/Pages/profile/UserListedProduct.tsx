import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil, Trash } from "lucide-react";

interface ProductPostProps {
  title: string;
  images: string[];
  description: string;
  owner: {
    name: string;
    avatar?: string;
  };
  status: "Available" | "In Talks" | "Sold";
}

export function UserListedProduct({
  title,
  images,
  description,
  owner,
  status,
}: ProductPostProps) {
  // State declarations at the top level
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [currentImages, setCurrentImages] = useState(images);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(status);

  // Styles for status display
  const statusStyles = {
    Available: "bg-green-500 text-white",
    "In Talks": "bg-yellow-500 text-white",
    Sold: "bg-red-500 text-white",
  };

  // Function to render product images
  const renderImages = () => {
    if (currentImages.length === 0) return null;
    return (
      <div className="grid w-full grid-cols-2 gap-1">
        <div className="col-span-2 aspect-[16/8] relative">
          <img
            src={currentImages[0]}
            alt={`${currentTitle} - Image 1`}
            className="absolute inset-0 w-full h-full object-cover rounded-sm"
          />
        </div>
        {currentImages.length >= 2 && (
          <div className="aspect-[16/8] relative">
            <img
              src={currentImages[1]}
              alt={`${currentTitle} - Image 2`}
              className="absolute inset-0 w-full h-full object-cover rounded-sm"
            />
          </div>
        )}
        <div className="aspect-[16/8] relative">
          {currentImages.length >= 3 && (
            <img
              src={currentImages[2]}
              alt={`${currentTitle} - Image 3`}
              className="absolute inset-0 w-full h-full object-cover rounded-sm"
            />
          )}
          {currentImages.length >= 3 && (
            <button
              onClick={() => setIsPopupOpen(true)}
              className="absolute inset-0 w-full h-full flex justify-center items-center bg-black/50 text-white text-xs rounded-sm"
            >
              + See All
            </button>
          )}
          {currentImages.length === 2 && (
            <div className="absolute inset-0 w-full h-full bg-gray-200 rounded-sm" />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-muted rounded-lg p-3">
      <Card className="w-full max-w-xs mx-auto gap-1 m-1 p-3 ">
        <CardHeader className="px-1 ">
          <div className="flex gap-2 items-top">
            <Avatar className="w-12 h-12">
              <AvatarImage src={owner?.avatar} alt={owner?.name} />
              <AvatarFallback>{owner?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <CardTitle className="text-base line-clamp-1">{currentTitle}</CardTitle>
              <p className="text-xs text-muted-foreground">{owner?.name}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-3">
          <div className="text-start">
            <p className="text-sm text-gray-700 line-clamp-2">{description}</p>
          </div>
          <div className="mt-2">{renderImages()}</div>
        </CardContent>

        <CardFooter className=" px-3 flex gap-2">
          {/* Status Dropdown */}
          <div className="flex-1">
            <Select
              value={currentStatus}
              onValueChange={(value) =>
                setCurrentStatus(value as "Available" | "In Talks" | "Sold")
              }
            >
              <SelectTrigger
                className={`w-full text-sm h-7 ${statusStyles[currentStatus]}`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="Available"
                  className="bg-green-500 text-white"
                >
                  Available
                </SelectItem>
                <SelectItem
                  value="In Talks"
                  className="bg-yellow-500 text-white"
                >
                  In Talks
                </SelectItem>
                <SelectItem value="Sold" className="bg-red-500 text-white">
                  Sold
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Edit Button */}
          <Button
            variant="outline"
            className="flex-1 text-sm h-7"
            aria-label="Edit"
            onClick={() => setIsEditOpen(true)}
          >
            <Pencil className="w-4 h-4" />
          </Button>

          {/* Delete Button */}
          <Button
            variant="outline"
            className="flex-1 text-sm h-7"
            aria-label="Delete"
            onClick={() => setIsDeleteConfirmOpen(true)}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </CardFooter>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent
          className="gap-2"
          style={{ maxWidth: "40rem", width: "100%", maxHeight: "90vh" }}
        >
          <DialogHeader>
            <DialogTitle className="text-base">Edit Product</DialogTitle>
          </DialogHeader>
          <div className="p-2">
            <label className="text-sm">Title</label>
            <Textarea
              value={currentTitle}
              onChange={(e) => setCurrentTitle(e.target.value)}
              className="w-full p-1 border rounded resize-none"
              rows={1}
              style={{ minHeight: "2.5rem" }} 
            />
          </div>
          <div className="p-2">
            <label className="text-sm">Title</label>
            <Textarea
              value={currentDescription}
              onChange={(e) => setCurrentDescription(e.target.value)}
              className="w-full p-1 border rounded resize-none"
              rows={1}
              style={{ minHeight: "2.5rem" }} // Optional: ensures a minimum height
            />
          </div>
          <div className="p-2">
            <label className="text-sm">Images</label>
            <div className="grid grid-cols-2 gap-2">
              {currentImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Image ${index + 1}`}
                    className="w-full h-30 object-cover rounded"
                  />
                  <button
                    onClick={() => {
                      const newImages = currentImages.filter(
                        (_, i) => i !== index
                      );
                      setCurrentImages(newImages);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                  >
                    Delete
                  </button>
                  <input
                    type="file"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const newImageUrl = URL.createObjectURL(
                          e.target.files[0]
                        );
                        const newImages = [...currentImages];
                        newImages[index] = newImageUrl;
                        setCurrentImages(newImages);
                      }
                    }}
                    className="mt-1"
                  />
                </div>
              ))}
            </div>
          </div>
          <Button onClick={() => setIsEditOpen(false)}>Save</Button>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this product?</p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteConfirmOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                console.log("Deleted"); // Placeholder for actual deletion logic
                setIsDeleteConfirmOpen(false);
              }}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Image Popup */}
      {currentImages.length >= 3 && (
        <Dialog open={isPopupOpen} onOpenChange={setIsPopupOpen}>
          <DialogContent
            className="gap-2"
            style={{ maxWidth: "32rem", width: "100%", maxHeight: "65vh" }}
          >
            <DialogHeader>
              <DialogTitle className="text-base">
                {currentTitle} - All Photos
              </DialogTitle>
            </DialogHeader>
            <Carousel className="w-full">
              <CarouselContent>
                {currentImages.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1 aspect-[16/8] relative">
                      <img
                        src={image}
                        alt={`${currentTitle} - Image ${index + 1}`}
                        className="absolute inset-0 w-full h-full object-cover rounded-sm"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </DialogContent>
        </Dialog>
      )}
              
    </div>
    </>
  );
}

export default function ProductList() {
  const image1 = "/Alkmaar-Netherlands.jpg";
  const product = {
    title: "Vintage Camera Collection",
    images: [image1, image1, image1],
    description:
      "Selling my vintage camera collection in excellent condition. Perfect for photography enthusiasts or collectors. Price negotiable.",
    owner: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
    },
    status: "Available" as const,
  };

  return (
    <div className="p-2">
      <UserListedProduct
        title={product.title}
        images={product.images}
        description={product.description}
        owner={product.owner}
        status={product.status}
      />
    </div>
  );
}
