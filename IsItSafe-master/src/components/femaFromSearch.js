import React, { useEffect, useState } from "react";

import moment from "moment";

const Search = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [val, setVal] = useState({
    incidentEndDate: "",
    incidentBeginDate: "",
    state: "",
    title: ""
  });

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

  const apiCall = filters => {
    console.log("filters", filters);
    let state = filters.state;

    let incidentBeginDate = filters.incidentBeginDate;
    let incidentEndDate = filters.incidentEndDate;

    let url = `https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$filter=state eq '${state}' and incidentBeginDate ge '${incidentBeginDate}' and incidentEndDate lt '${incidentEndDate}'`;

    console.log(url);
    // for (let key in filters) {
    // }
    fetch(url)
      .then(res => res.json())
      .then(res => {
        let result = res.DisasterDeclarationsSummaries;
        let sizeLimit = 1000;
        var items = result.slice(0, sizeLimit);
        console.log(result);
        setData(items);
      })
      .catch(err => console.log(err));
  };

  const handleChange = e => {
    console.log(e.target);
    setVal({ ...val, [e.target.name]: e.target.value });
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
    console.log(val, filterr);
    apiCall(val);
  };

  // console.log(data);
  return (
    <div className="homeParent" multiple>
      {/* <div className="row"></div> */}
      <form className="homeForm" onSubmit={handleSubmit}>
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
        <input type="submit" value="Submit" className="btn btn-secondary" />
      </form>

      {/* <select onChange={handleChange} multiple name="incidentType">
        <option value="title">Title</option>
        <option value="FLOOD">Flood</option>
        <option value="TORNADO">Tornado</option>
        <option value="HURRICANE">Hurricane</option>
        <option value="Dam/Levee Break"> Dam/Levee Break</option>
        <option value="Drought">Drought</option>
        <option value="Earthquake">Earthquake</option>
        <option value="Fire">Tornado</option>
        <option value="Other">Other</option>
        <option value="Severe Storm(s)">Severe Storm(s)</option>
        <option value="Snow">Snow</option>
        <option value="FLOOD">Flood</option>
        <option value="Toxic Substances">Toxic Substances</option>
        <option value="Typhoon">Typhoon</option>
      </select> */}
      <div className="filteredDisasters">
        <h3>Filtered Disasters</h3>
        <br />
        <div className="row">
          <div className="col-1">
            <p> Number</p>
          </div>
          <div className="col-1">
            <p>iaProgram </p>
          </div>

          <div className="col-1">
            <p>paProgram </p>
          </div>

          <div className="col-1">
            <p>paProgram </p>
          </div>

          <div className="col-2">
            <p>Time</p>
          </div>

          <div className="col-1">
            <p>IncidentType</p>
          </div>
        </div>

        {data
          ? data.map(data => (
              <div className="row">
                <div className="col-1">
                  <p>{data.disasterNumber}</p>
                </div>
                <div className="col-1">
                  <p>{data.iaProgramDeclared ? 1 : 0}</p>
                </div>

                <div className="col-1">
                  <p>{data.paProgramDeclared ? 1 : 0}</p>
                </div>

                <div className="col-1">
                  <p>{data.state}</p>
                </div>

                <div className="col-2">
                  <p>
                    {moment(data.declarationDate).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </p>
                </div>

                <div className="col-1">
                  <p>{data.incidentType}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Search;
