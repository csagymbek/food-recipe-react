import "./App.css";
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Recipe } from "./components/Recipe";
import { Alert } from "./components/Alert";

export const App = () => {
  const [query, setQuery] = useState("");
  const [recipies, setRecipies] = useState([]);
  const [alert, setAlert] = useState("");

  const APP_ID = "03599b22";
  const APP_KEY = "118e521b4ea52b6864c88a0d08de481e";
  const APP_URL = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const { data } = await axios.get(APP_URL);
      const { hits, more } = data;
      if (!more) {
        return setAlert("No food with such name!");
      }
      setRecipies(hits);
      setAlert("");
      setQuery("");
      console.log(data);
    } else {
      setAlert("Please, fill the form!");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
    setQuery("");
    console.log(recipies);
  };

  return (
    <div className="App">
      <h1 onClick={getData}>Food Searching App</h1>
      <form action="" className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input
          type="text"
          placeholder="Search"
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipies !== [] &&
          recipies.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
};
