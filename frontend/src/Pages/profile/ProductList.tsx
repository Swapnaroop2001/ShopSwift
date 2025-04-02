import { UserListedProduct } from './UserListedProduct';
import image1 from "../../../public/Alkmaar-Netherlands.jpg"; // Make sure this path is correct

export default function ProductList() {
  // Example product data
  const product = {
    title: "Vintage Camera Collection",
    images: [image1, image1, image1], 
    description:
      "Selling my vintage camera collection in excellent condition. Perfect for photography enthusiasts or collectors. Price negotiable.",
    owner: {
      name: "John Doe",
      avatar: "https://github.com/shadcn.png",
    },
    status: "Available" as "Available" | "In Talks" | "Sold" // Move status here
  };

  return (
    <div className='flex gap-4 flex-wrap rounded-lg ml-2 mr-6 gap-3 '>
      <UserListedProduct  
        title={product.title}
        images={product.images}
        description={product.description}
        owner={product.owner}
        status={product.status}
      />
      <UserListedProduct 
        title={product.title}
        images={product.images}
        description={product.description}
        owner={product.owner}
        status={product.status}
      />
      <UserListedProduct 
        title={product.title}
        images={product.images}
        description={product.description}
        owner={product.owner}
        status={product.status}
      />
      <UserListedProduct 
        title={product.title}
        images={product.images}
        description={product.description}
        owner={product.owner}
        status={product.status}
      />
      <UserListedProduct 
        title={product.title}
        images={product.images}
        description={product.description}
        owner={product.owner}
        status={product.status}
      />
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