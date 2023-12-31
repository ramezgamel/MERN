// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useGetProductsFeaturesMutation } from '../store/productsApiSlice';
import { Link } from 'react-router-dom';
import Loader from './Loader';

function SearchBox() {
  const [keyword, setKeyword] = useState('');
  const [searchProducts, { data, isLoading, isFetching }] = useGetProductsFeaturesMutation();
  const onSearch = (e) => {
    setKeyword(e.target.value);
  };
  useEffect(()=>{
    searchProducts({ keyword });
  },[keyword, searchProducts])
  document.addEventListener('click', () => {
    setKeyword('');
  });
  return (
    <>
      <form >
        <input
          type="text"
          name="q"
          placeholder="Search..."
          onChange={onSearch}
          className="mr-sm-2 ml-sm-5"
        ></input>
      </form>
      {keyword != '' && (
          <div className='mt-2 '>
            {isLoading || isFetching?
              <Loader/>: data?.result.length > 0 &&
              data?.result?.map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  onClick={() => setKeyword('')}
                >
                  <div className="grid grid-cols-12 p-2 gap-2 hover:cursor-pointer hover:bg-gray-500">
                    <div className="col-span-3">
                      <img
                        className="rounded-md"
                        src={item.image}
                        alt={item.name}
                      />
                    </div>
                    <div className="col-span-9">
                      <p className='text-main mb-1'>{item.name}</p>
                      <p className='text-main mb-1 text-sm'>{item.price}</p>
                      <p className='text-main mb-1 text-sm'>{item.category}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}
    </>
  );
}

export default SearchBox;
