import { useEffect, useSyncExternalStore } from "react";
import { store } from "../store/dataSet.store";
import { DataSetService } from "../services/dataSet/dataSet.service.remote";
import { useState } from "react";
import { useNavigate } from "react-router";

export function DataSet() {
  const { dataSet } = useSyncExternalStore(store.subscribe, store.getState);
  const currentState = store.getState();
  const [filterBy, setFilterBy] = useState({
    location: "",
    gt: "",
    lt: "",
  });
  const [isReaload, setIsReload] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    DataSetService.query().then((dataSet) => {
      store.setState({ ...currentState, dataSet, dataForQuastions: dataSet });
    });
  }, [isReaload]);

  function handleChange(ev) {
    const { name, value } = ev.target;
    setFilterBy((prev) => {
      return { ...prev, [name]: value };
    });
  }

  function onFilter() {
    const filteredData = dataSet.filter((object) => {
      return (
        (object.city.toLowerCase().includes(filterBy.location) ||
          object.country_txt.toLowerCase().includes(filterBy.location)) &&
        +object.iyear > +filterBy.gt &&
        +object.iyear < +filterBy.lt
      );
    });
    store.setState({ ...currentState, dataSet: filteredData });
  }

  function onClearFilter() {
    setIsReload(!isReaload);
  }

  function handleClick() {
    navigate("/questions");
  }

  return (
    <div className="data-set-container">
      <button onClick={handleClick}>To Questions Page</button>
      <div className="filters">
        <h3>filters</h3>
        <label htmlFor="txt">Search: </label>
        <input
          value={filterBy.location}
          id="txt"
          name="location"
          type="text"
          placeholder="City/Country"
          onChange={handleChange}
        />

        <label htmlFor="gt-year">Year {`>`} : </label>
        <input
          value={filterBy.gt}
          id="gt-year"
          type="text"
          name="gt"
          onChange={handleChange}
        />

        <label htmlFor="lt-year">Year {`<`} </label>
        <input
          value={filterBy.lt}
          id="lt-year"
          type="text"
          name="lt"
          onChange={handleChange}
        />

        <button onClick={onFilter}>Filter</button>

        <button onClick={onClearFilter}>Clear</button>
      </div>
      <div className="dataSet-list">
        <h3>dataSet</h3>
        {!dataSet.length && <div className="loader">loading</div>}
        {dataSet.length > 0 && (
          <table>
            <tbody>
              <tr key={self.crypto.randomUUID()}>
                {Object.keys(dataSet[1]).map((h) => {
                  return <th>{h}</th>;
                })}
              </tr>
              {dataSet.map((object) => {
                return (
                  <tr key={self.crypto.randomUUID()}>
                    <td>{object.eventid}</td>
                    <td>{object.iyear}</td>
                    <td>{object.country_txt}</td>
                    <td>{object.region_txt}</td>
                    <td>{object.city}</td>
                    <td>{object.summary}</td>
                    <td>{object.attacktype1_txt}</td>
                    <td>{object.targtype1_txt}</td>
                    <td>{object.targsubtype1_txt}</td>
                    <td>{object.corp1}</td>
                    <td>{object.target1}</td>
                    <td>{object.motive}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
