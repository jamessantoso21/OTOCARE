import React, { useEffect, useState } from "react";
import "./SearchFilter.css";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

function SearchFilter({ setResult }) {
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("");

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(db, "RepairShops");
        const snapshot = await getDocs(collectionRef);
        let items = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          items.push({
            id: doc.id,
            title: data.title,
            subtitle: data.subtitle,
            rating: data.rating,
            img: data.img,
            services: [data.services1, data.services2, data.services3],
          });
        });

        const lowerCaseInput = input.toLowerCase();
        const filteredItems = items.filter((item) => {
          const matchesTitle = item.title.toLowerCase().startsWith(lowerCaseInput);
          const matchesService =
            filter === "" ||
            item.services.some((service) => service.toLowerCase() === filter.toLowerCase());
          return matchesTitle && matchesService;
        });
        filteredItems.sort((a, b) => a.title.localeCompare(b.title));

        setResult(filteredItems);
        console.log(filteredItems);
      } catch (error) {
        console.error("Error fetching data:", error);
        setResult([]);
      }
    };

    fetchData();
  }, [input, filter, setResult]);

  return (
    <>
      <div className="searchBar-container">
        <input
          className="searchBar"
          type="text"
          placeholder="Search..."
          value={input}
          onChange={handleChange}
        />
      </div>
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          SERVICES
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleFilterChange("OIL & FLUIDS")}
            >
              OIL & FLUIDS
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleFilterChange("WHEELS")}
            >
              WHEELS
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleFilterChange("ELECTRICALS")}
            >
              ELECTRICALS
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={() => handleFilterChange("")}
            >
              RESET
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default SearchFilter;
