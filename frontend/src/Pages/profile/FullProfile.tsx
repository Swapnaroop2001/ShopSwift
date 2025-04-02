import ProductList from './ProductList';
import ProfileCardDetailed from './ProfileCardDetailed';


export default function FullProfile() {
  return (
    <div className="flex">
      <div className="w-1/4 mt-16">
        <ProfileCardDetailed />
      </div>
      <div className="w-3/4 mt-16">
        <ProductList/>
      </div>
    </div>
  );
}