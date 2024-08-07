import { useRef } from "react";

/* eslint-disable react/prop-types */
function  Features({setFeatures, setSort,sort}) {
  const fromRef = useRef()
  const toRef = useRef();

  const submitForm = (e) => {
  const from = fromRef.current.value;
  const to = toRef.current.value;
    e.preventDefault();
    setFeatures(`${from && `&price[gte]=${from}`}${to && `&price[lte]=${to}`}`) ;
  };
  const handleCancel = () => {
    setFeatures('');
    setSort('')
  }
  return (
    <form onSubmit={submitForm} className="flex flex-col ml-2 sticky top-16 ">
      <div className="mb-2">
        <h2 className="text-main text-lg">Sort</h2>
        <div className="flex gap-2 ml-2">
          <input onChange={()=>setSort('')} checked={sort == ""} className="w-fit" type="radio" id="name" value=""/>
          <label htmlFor="name" className="m-0 text-sm">None</label>
        </div>
        <div className="flex gap-2 ml-2">
          <input onChange={(e)=>setSort(e.target.value)} checked={sort == "name"} className="w-fit" type="radio" name="sort" id="name" value="name"/>
          <label htmlFor="name" className="m-0 text-sm">Name</label>
        </div>
        <div className="flex gap-2 ml-2"> 
          <input onChange={(e)=>setSort(e.target.value)} checked={sort == "price"} className="w-fit" type="radio" name="sort" id="price" value="price"/>
          <label htmlFor="price" className="m-0 text-sm">Price</label>
        </div>
        <div className="flex gap-2 ml-2">
          <input onChange={(e)=>setSort(e.target.value)} checked={sort == "-rating"} className="w-fit" type="radio" name="sort" id="rating" value="-rating"/>
          <label htmlFor="rating" className="m-0 text-sm">Rating</label>
        </div>
      </div>
      <div className="w-[70%] bg-gray-700 h-[1px] mx-auto my-2"></div>
      <div className="mb-2">
        <h2 className="text-main text-lg">Filter</h2>
        <div className="text-center">
          <label >Price</label>
          <div className="flex gap-2">
            <input ref={fromRef} type="number" placeholder="from"/>
            <input ref={toRef} type="number" placeholder="to"/>
          </div>
        </div>
      </div>
      <div className="w-[70%] bg-gray-700 h-[1px] mx-auto my-2"></div>
      <div className="flex justify-between gap-2">
        <button className="btn" type="submit">Apply</button>
        <button type="button" className="btn !bg-red-400 hover:!bg-red-500" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  )
}

export default Features