import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";


const ManageFoods = () => {
    const { user } = useAuth();
  const [myFood, setMyFood] = useState([]);
  useEffect(() => {
    axios(`${import.meta.env.VITE_API_URL}/manage-food/${user?.email}`)
      .then((res) => setMyFood(res.data))
      .catch((error) => {
        console.log(error);
      });
  }, [user]);
    console.log(myFood);
    return (
        <div>
            ManageFoods
        </div>
    );
};

export default ManageFoods;