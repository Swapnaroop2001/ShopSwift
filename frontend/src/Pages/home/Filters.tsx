import * as React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider"; // Ensure you have a proper Slider component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Filters() {
  const [sortBy, setSortBy] = React.useState<string>("oldest");
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0, 500,
  ]);
  const [selectedCategory, setSelectedCategory] =
    React.useState<string>("ALL_PRODUCTS");

  const categories = [
    { id: "ALL_PRODUCTS", label: "All Products" },
    { id: "TECH_GADGETS", label: "Tech Gadgets" },
    { id: "HOME_LIVING", label: "Home & Living" },
    { id: "FASHION_STYLE", label: "Fashion & Style" },
    { id: "CARS_BIKES", label: "Cars & Bikes" },
    { id: "TOYS_KIDS", label: "Toys & Kids" },
    { id: "SPORTS_OUTDOORS", label: "Sports & Outdoors" },
    { id: "BOOKS_STATIONERY", label: "Books & Stationery" },
    { id: "COLLECTIBLES_ANTIQUES", label: "Collectibles & Antiques" },
    { id: "HEALTH_BEAUTY", label: "Health & Beauty" },
    { id: "OFFICE_SUPPLIES", label: "Office Supplies" },
    { id: "MISCELLANEOUS", label: "Miscellaneous" },
  ];

  return (
    <div className="bg-muted p-4 rounded-lg flex flex-col gap-4 ">
      {/* Categories Filter Card */}
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2 justify-start">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="px-2 py-0.5 text-[11px] leading-tight"
            >
              {category.label}
            </Button>
          ))}
        </CardContent>
      </Card>
      
      {/* Price Range Card */}
      <Card>
        <CardHeader>
          <CardTitle>Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <Slider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={(value: [number, number]) => setPriceRange(value)}
          />
          <div className="flex justify-between text-sm mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </CardContent>
      </Card>

      {/* Sorting Options Card */}
      <Card>
        <CardHeader>
          <CardTitle>Sort By</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Button
            variant={sortBy === "oldest" ? "default" : "outline"}
            onClick={() => setSortBy("oldest")}
          >
            Newest to Oldest
          </Button>
          <Button
            variant={sortBy === "highToLow" ? "default" : "outline"}
            onClick={() => setSortBy("highToLow")}
          >
            Price: High to Low
          </Button>
          <Button
            variant={sortBy === "lowToHigh" ? "default" : "outline"}
            onClick={() => setSortBy("lowToHigh")}
          >
            Price: Low to High
          </Button>
        </CardContent>
      </Card>

    </div>
  );
}
