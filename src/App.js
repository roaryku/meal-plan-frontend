import { useEffect, useState } from 'react';
import { getAllMeals, addMeal, editMeal, deleteMeal } from './FetchMeals';
import './App.css';
import { MyMeals } from './MyMeals';


function App() {

  const [myMeal, setMeal] = useState([]);
  const [title, setTitle] = useState("");
  const [editing, setEditing] = useState(false);
  const [mealId, setMealId] = useState("");
  const [wordSubmitted, setWordSubmitted] = useState("")
  
  useEffect(() => {
    getAllMeals(setMeal)
  }, [wordSubmitted])

  const updatingInInput = (_id, title) => {
    setEditing(true)
    setTitle(title)
    setMealId(_id)
  }

   const finalSearch = (e) => {
    e.preventDefault()
    setWordSubmitted(title)
  }



return (
    <div>
      <form onSubmit={finalSearch}>
      <h1>Meal Plan</h1>
      <input 
        type="text" 
        placeholder="Add a meal" 
        value={title}
        onChange = {(e) => setTitle(e.target.value)}
        />
      <button
        disabled={!title}
        onClick=
        {editing ? () => editMeal(mealId, title, setMeal, setTitle, setEditing) : () => addMeal(title, setTitle, setMeal)}>
        {editing ? "Edit" : "Add"}
      </button>

    {myMeal.map((meal) => <MyMeals text={meal.title} key={meal._id}
      updatingInInput = {() => updatingInInput(meal._id, meal.title)}
      deleteMeal = {() => deleteMeal(meal._id, setMeal)}
      />
      )}
      </form>
    </div>
  );
}

export default App;
