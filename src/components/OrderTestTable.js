import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import ApiService from "../api/services/api.services";


const OrderTestTable = () => {
  const [orderTests, setOrderTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const fetchOrderTests = async () => {
      setLoading(true);
      const response = await ApiService.getOrderTests(
        startDate?.toISOString(),
        endDate?.toISOString()
      );
      setOrderTests(response);
      setLoading(false);
    };

    fetchOrderTests();
  }, [startDate, endDate]);

  const debouncedFetchOrderTests = debounce(async () => {
    setLoading(true);
    const response = await ApiService.getOrderTests(
      startDate?.toISOString(),
      endDate?.toISOString()
    );
    setOrderTests(response);
    setLoading(false);
  }, 500);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate) {
      debouncedFetchOrderTests();
    }
  };
  
  const handleEndDateChange = (date) => {
    setEndDate(date);
    if (startDate && date) {
      debouncedFetchOrderTests();
    }
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div>
      <DatePicker
  selected={startDate}
  maxDate={new Date()}
  onChange={handleStartDateChange}
  placeholderText="Sample Collected Start Date"
/>
<DatePicker
  selected={endDate}
  maxDate={new Date()}
  onChange={handleEndDateChange}
  placeholderText="Sample Collected End Date"
/>

      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <table>
            <thead>
              <tr>
                <th>Order Test ID</th>
                <th>Patient ID</th>
                <th>Patient Age Range</th>
                <th>Patient Region</th>
                <th>Order Test Category</th>
                <th>Order Test Type</th>
                <th>Sample Collected Date</th>
                <th>Result Report Date</th>
                <th>Order Test Result</th>
                <th>Order Test Created At</th>
              </tr>
            </thead>
            <tbody>
              {orderTests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((orderTest) => (
                  <tr key={orderTest.orderTestId}>
                    <td>{orderTest.orderTestId}</td>
                    <td>{orderTest.patientId}</td>
                    <td>{orderTest.patientAgeRange}</td>
                    <td>{orderTest.patientRegion}</td>
                    <td>{orderTest.orderTestCategory}</td>
                    <td>{orderTest.orderTestType}</td>
                    <td>{orderTest.sampleCollectedDate}</td>
                    <td>{orderTest.resultReportDate}</td>
                    <td>{orderTest.orderTestResult}</td>
                    <td>{orderTest.orderTestCreatedAt}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <div>
            <span>Rows per page:</span>
            <select value={rowsPerPage} onChange={handleChangeRowsPerPage}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>
              {page * rowsPerPage + 1}-
              {Math.min((page + 1) * rowsPerPage, orderTests.length)} of{" "}
              {orderTests.length}
            </span>
            <button
              onClick={() => {
                setPage(0);
              }}
              disabled={page === 0}
            >
              {"<<"}
            </button>
            <button
              onClick={() => {
                setPage(page - 1);
              }}
              disabled={page === 0}
            >
              {"<"}
            </button>
            <button
              onClick={() => {
                setPage(page + 1);
              }}
              disabled={page >= Math.ceil(orderTests.length / rowsPerPage) - 1}
            >
              {">"}
            </button>
            <button
              onClick={() => {
                setPage(Math.ceil(orderTests.length / rowsPerPage) - 1);
              }}
              disabled={page >= Math.ceil(orderTests.length / rowsPerPage) - 1}
            >
              {">>"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

function debounce(func, delay) {
let timer;
return function () {
const context = this;
const args = arguments;
clearTimeout(timer);
timer = setTimeout(() => {
func.apply(context, args);
}, delay);
};
}

export default OrderTestTable;
