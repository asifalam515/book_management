import { useLoaderData } from "react-router-dom";

const Update = () => {
  const loadedData = useLoaderData();
  console.log(loadedData);
  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const author = form.author.value;
    const updatedBook = { name, author };
    fetch(`http://localhost:3000/books/${loadedData._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };
  return (
    <div>
      <h1>Update Data</h1>
      <form onSubmit={handleUpdate}>
        <input type="text" name="name" defaultValue={loadedData.name} />
        <br /> <br />
        <input type="text" name="author" defaultValue={loadedData.author} />
        <br /> <br />
        <button>Update Now</button>
      </form>
    </div>
  );
};

export default Update;
