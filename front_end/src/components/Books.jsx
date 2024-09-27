import { useLoaderData } from "react-router-dom";

const Books = () => {
  const loadedData = useLoaderData();
  return (
    <div>
      <h1>Books Found : {loadedData.length}</h1>
    </div>
  );
};

export default Books;
