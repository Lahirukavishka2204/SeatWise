import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../context/ContextProvider";


export default function Reservations() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [tableData, setTableData] = useState([]);

  const [errors, setErrors] = useState(null);
  const {user, setUser } = useStateContext();
  
  function handleItemClick(itemNumber) {
    setIsModalOpen(true);
    setSelectedItem(itemNumber);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }


  useEffect(() => {
    axiosClient.get('/user')
    .then(({data}) => {
        setUser(data)
        // getViews(data.id);
        fetchTableData(data.id);
    })
    }, [])

    // const getViews = (restaurant_id) => {
    //     if (!restaurant_id) {
    //     console.error("Restaurant ID not available.");
    //     return;
    //     }
  
    //     const payload = {
    //     restaurant_id: restaurant_id,
    //     };
        
    //     axiosClient
    //     .get('/views', { params: payload })
    //     .then(({ data }) => {
    //         setViews(data);
    //     })
    //     .catch((error) => {
    //         console.error("Error fetching views:", error);
    //     });
    // };

    const fetchTableData = (restaurant_id) => {
        axiosClient
        .get("/gettable", { params: { restaurant_id } })
        .then(({ data }) => {
            // console.log("Fetched table data:", data);
            setTableData(data);
        })
        .catch((error) => {
            console.error("Error fetching tables:", error);
        });
    };

    

    const isTableInStructure = (tableNumber) => {
        // const parsedTableNumber = parseInt(tableNumber, 10);
        return tableData.some((table) => (table.table_id) === String(tableNumber));
      };

  return (
    <>
      <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reservations</h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
    
            <h1 className="text-1xl font-bold">Arrange your table Structure</h1>

              <p>Select according to your restaurant table staructure</p>

              <p>Add table count with necessary details</p>

                <div className="grid-container">
                    {Array.from({ length: 44 }, (_, index) => {
                        const tableNumber = index + 1;
                        const isTablePresent = isTableInStructure(tableNumber);
                        console.log(isTablePresent);
                        return (
                            <div
                            key={tableNumber}
                            className={`grid-item-reserve ${isTablePresent ? "bg-green-500" : ""}`}
                            onClick={() => handleItemClick(tableNumber)}
                            >
                            {isTablePresent ? tableData.find((table) => table.table_id === String(tableNumber)).table_no : ""}
                            </div>
                        );
                    })}
                </div>    
          </div>
        </main>
    </>
  )
}