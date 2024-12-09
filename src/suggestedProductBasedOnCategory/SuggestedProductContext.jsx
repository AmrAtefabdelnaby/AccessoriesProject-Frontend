import { createContext, useState } from "react";


const CategoryContext = createContext();

function CategoryProvider({ children }) {
        let [categories, setCategories] = useState("");
        return (
            
        <CategoryContext.Provider value={{categories , setCategories}}>
            {children}
        </CategoryContext.Provider>
        )
}
export { CategoryContext, CategoryProvider }