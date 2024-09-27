import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const Books = () => {
  const loadedData = useLoaderData();
  const [books, setBooks] = useState(loadedData);
  const handleDelete = (_id) => {
    console.log("btn clicked of", _id);
    fetch(`http://localhost:3000/books/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          alert("Deleted Successfully");
          const remaining = books.filter((book) => book._id !== _id);
          setBooks(remaining);
        }
      });
  };
  return (
    <div>
      <h1>Books Found : {loadedData.length}</h1>
      <div>
        {loadedData.map((book) => (
          <li key={book._id}>
            {book.name} :: {book.author} ::{" "}
            <button
              onClick={() => {
                handleDelete(book._id);
              }}
            >
              X
            </button>
            <Link to={`/update/${book._id}`}>Update</Link>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Books;
