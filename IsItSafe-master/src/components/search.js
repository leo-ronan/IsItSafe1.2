import React, { Fragment, useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import moment from "moment";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
//import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import paginationFactory from "react-bootstrap-table2-paginator";
const Search = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const columns = [
    { dataField: "disasterNumber", text: "disasterNumber" },
    { dataField: "ihProgramDeclared", text: "ihProgramDeclared" },
    { dataField: "iaProgramDeclared", text: "iaProgramDeclared" },
    // { dataField: "paProgramDeclared", text: "paProgramDeclared" },
    // { dataField: "hmProgramDeclared", text: "hmProgramDeclared" },
    { dataField: "state", text: "state" },
    // { dataField: "declarationDate", text: "declarationDate" },
    // { dataField: "fyDeclared", text: "fyDeclared" },
    // { dataField: "disasterType", text: "disasterType" },
    { dataField: "incidentType", text: "incidentType" },
    //{ dataField: "title", text: "title" },
    { dataField: "incidentBeginDate", text: "incidentBeginDate" },
    { dataField: "incidentEndDate", text: "incidentEndDate" }
    // { dataField: "disasterCloseOutDate", text: "disasterCloseOutDate" },
    // { dataField: "declaredCountyArea", text: "declaredCountyArea" },
    // { dataField: "placeCode", text: "placeCode" },
    // { dataField: "hash", text: "hash" },
    // { dataField: "lastRefresh", text: "lastRefresh" }
    // { dataField: "id", text: "id" }
  ];

  const [val, setVal] = useState({
    incidentEndDate: "",
    incidentBeginDate: "",
    state: "",
    title: ""
  });

  //const notify = (message, options) => toast.warn(message, options);

  //   useEffect(() => {
  //     //   //gt = greater than, lt = less than, eq = equal to, ne = not equal to (exclude)
  //     //   var linkStart = "https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?$filter=";
  //     console.log(filteredData);
  //     console.log(
  //       "https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?$filter=" +
  //         filteredData
  //     );
  //     //   $.ajax({
  //     //       datatype: "json",
  //     //       url: queryURL,
  //     //       method: "GET"
  //     //   })
  //     //       .then(function(response) {
  //     //           console.log(response);

  //     fetch(
  //       "https://www.fema.gov/api/open/v2/DisasterDeclarationsSummaries?$filter=" +
  //         filteredData
  //     )
  //       .then(res => res.json())
  //       .then(res => setData(res.DisasterDeclarationsSummaries))
  //       .catch(err => console.log(err));
  //   }, []);

  useEffect(() => {
    console.log("UseEffect");

    let res = products.filter(item => {
      return selectedValues.includes(item.incidentType.toLocaleLowerCase());
    });
    setProducts(res);
  }, [selectedValues]);

  var url;
  const apiCall = filters => {
    console.log("filters", filters);
    let state = filters.state;
    console.log(filters.incidentEndDate ? true : false);
    let incidentBeginDate = filters.incidentBeginDate
      ? filters.incidentBeginDate
      : "2010-01-01T04:00:00.000z";
    let incidentEndDate = filters.incidentEndDate
      ? filters.incidentEndDate
      : moment().format("YYYY-MM-DD");
    let stateFilter = state ? `state eq '${state}' and` : "";
    let incident = filters.incidentType;

    let endFilter = " and incidentEndDate eq null";
    if (filters.incidentEndDate = true) {
      let endFilter = incidentEndDate ? `and incidentEndDate le '${incidentEndDate}'`: "";
    }
    let typeFilter = incident ? `and incidentType eq '${incident}'` : "";

    url = `https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$filter=${stateFilter} incidentBeginDate ge '${incidentBeginDate}' ${endFilter} ${typeFilter}`;

    console.log(url);
    for (let key in filters) {
    }
    fetch(url)
      .then(res => res.json())
      .then(res => {
        let result = res.DisasterDeclarationsSummaries;
        if (result.length > 999) alert("Results limited to 1000!", {});
        let sizeLimit = 1000;
        var items = result.slice(0, sizeLimit);
        console.log(result);
        setData(items);
        tableSetup(items);
      })
      .catch(err => console.log(err));
  };

  const tableSetup = items => {
    console.log("columns", columns);
    console.log("data", items[0]);

    // setColumns(columns);
    setProducts(items);
  };
  const handleChange = e => {
    console.log(e.target);
    setVal({ ...val, [e.target.name]: e.target.value });
  };

  const handleMultiSelect = e => {
    setProducts(data);
    // console.log(e.target);
    // setVal({ ...val, [e.target.name]: e.target.value });

    // console.log(setVal);
    let values = Array.from(e.target.selectedOptions, option =>
      option.value.toLocaleLowerCase()
    );

    setSelectedValues(values);
  };

  let clearFilter = () => {
    setProducts(data);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(e);
    const filterr = data.filter(
      item =>
        item.state == val.state &&
        item.incidentType == val.incidentType &&
        item.incidentBeginDate == val.incidentBeginDate &&
        item.incidentEndDate == val.incidentEndDate
    );
    setFilteredData(filterr);
    console.log("ping");
    console.log(val, filterr);
    apiCall(val);
  };
  let container;
  console.log(data);
  return (
    <Fragment>
      {/* <ToastContainer /> */}
      <div className="homeParent">
        <div className="row w-100">
          <div className="col-2 p-1 ">
            <form className="homeForm  w-100" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="enter state"
                name="state"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="enter year incident begin date"
                name="incidentBeginDate"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="enter year incident end date"
                name="incidentEndDate"
                onChange={handleChange}
              />
              <input
                type="submit"
                value="Submit"
                className="btn btn-secondary"
              />
              <select onChange={handleMultiSelect} multiple name="incidentType">
              <option value="Title"></option>
                <option value="Biological">Biological</option>
                <option value="Chemical">Chemical</option>
                <option value="Coastal Storm">Coastal Storm</option>
                <option value="Dam/Levee Break">Dam/Levee Break</option>
                <option value="Drought">Drought</option>
                <option value="Earthquake">Earthquake</option>
                <option value="Explosion">Explosion</option>
                <option value="Fire">Fire</option>
                <option value="Fishing Losses">Fishing Losses</option>
                <option value="Flood">Flood</option>
                <option value="Freezing">Freezing</option>
                <option value="Human Cause">Human Cause</option>
                <option value="Hurricane">Hurricane</option>
                <option value="Mud/Landslide">Mud/Landslide</option>
                <option value="Other">Other</option>
                <option value="Severe Ice Storm">Severe Ice Storm</option>
                <option value="Severe Storm(s)">Severe Storm(s)</option>
                <option value="Snow">Snow</option>
                <option value="Terrorist">Terrorist</option>
                <option value="Tornado">Tornado</option>
                <option value="Toxic Substances">Toxic Substances</option>
                <option value="Tsunami">Tsunami</option>
                <option value="Typhoon">Typhoon</option>
                <option value="Volcano">Volcano</option>
              </select>

              <input
                type="button"
                value="Clear Filter"
                className="btn btn-secondary"
                onClick={clearFilter}
              />
            </form>
          </div>

          <div className="col-10">
            <div className="filteredDisasters">
              <h3>Filtered Disasters</h3>

              <div className="row">
                {data.length ? (
                  <Fragment>
                    <BootstrapTable
                      keyField="id"
                      data={products}
                      columns={columns}
                      striped
                      pagination={paginationFactory()}
                      hover
                      condensed
                    />
                  </Fragment>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Search;
