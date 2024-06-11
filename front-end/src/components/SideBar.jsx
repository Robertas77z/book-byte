import React, { useState, useEffect } from 'react';
import { getCategoriesAPICall } from '../services/CategoryService';

const SideBar = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategoriesAPICall()
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error("Klaida gaunant kategorijas:", error);
      });
  }, []);

  const handleCategoryClick = (categoryId) => {
    console.log("Pasirinkta kategorija:", categoryId); // Patikrinimas
    setSelectedCategory(categoryId);
  };

  return (
    <div className="flex-shrink-0 p-3 ms-4" style={{ width: "280px", height: "300px", paddingLeft: "16px", textAlign: "left" }}>
      <div className="d-flex align-items-center pb-3 mb-3 link-body-emphasis text-decoration-none">
        <span
          className="fw-semibold"
          style={{
            fontSize: "20px",
            color: "white",
            backgroundColor: "rgb(133, 201, 200)",
            width: "217px",
            height: "56px",
            paddingLeft: "16px",
            paddingTop: "13px",
          }}
        >
          Kategorijos
        </span>
      </div>
      <ul className="list-unstyled ps-0">
        <li key="all-books" className="mb-1" style={{ color: "#7749F8" }}>
          <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
            onClick={() => handleCategoryClick(null)} // Nustatome selectedCategory į null
            style={{ color: "rgb(106, 213, 212)" }}
          >
            Visos knygos
          </button>
        </li>
        {categories.map(category => (
          <li key={category.id} className="mb-1" style={{ color: "#7749F8" }}>
            <button className="btn btn-toggle d-inline-flex align-items-center rounded border-0 collapsed"
              onClick={() => handleCategoryClick(category.id)}
              style={{ color: "rgb(106, 213, 212)" }}
            >
              {category.name}
            </button>
          </li>
        ))}
        <li className="border-top my-3" style={{ borderColor: "rgb(106, 213, 212)" }}></li>
      </ul>
    </div>
  );
};

export default SideBar;
