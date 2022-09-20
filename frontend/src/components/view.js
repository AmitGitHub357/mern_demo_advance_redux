import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProject, filterList } from "../redux/project/projectAction";
import { Link, useNavigate } from "react-router-dom";
const View = () => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");
  const dispatch = useDispatch();
  const project = useSelector((state) => state.listProject.projectList);
  const filterData = useSelector((state) => state);
  useEffect(() => {
    dispatch(fetchProject());
  }, []);

  useEffect(() => {
    dispatch(filterList(filterStatus));
  }, [filterStatus]);

  useEffect(() => {
    setList(filterData);
  }, [filterData]);
  return (
    <>
      {/* { typeof list.filterList !== 'undefined' ? ( list.filterList.projectList && list.filterList.projectList.projectList.map((item) => {
      }) ) : 'loading'} */}
      <div className="container mt-3">
        <h2>Projects</h2>
        <p>Filter</p>
        <div className="col-md-2">
          <select
            className="form-control text-center"
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Upcoming">Upcoming</option>
          </select>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Images</th>
              <th>Description</th>
              <th>Status</th>
              <th colSpan={2} className="text-center">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {typeof list.filterList.projectList.projectList !== "undefined" ? (
                list.filterList.projectList.projectList.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>
                        <img src={"#"} />
                      </td>
                      <td>{item.description}</td>
                      <td>{item.projectStatus}</td>
                      <td>
                        <button
                          className="btn text-danger bg-white"
                          // onClick={(e) => deleteHandler(e, item._id)}
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <Link to="/edit">
                          <button
                            className="btn bg-secondary text-white"
                            // onClick={(e) => setData(e, item._id)}
                          >
                            Update
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td>loading</td>{" "}
                </tr>
              )} */}
            { list.filterList.projectList && 
            list.filterList.projectList.projectList.length > 0 ? (
              list.filterList.projectList.projectList.map((item) => {
                // console.log(item.name)
                return (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>
                      <img src={"#"} />
                    </td>
                    <td>{item.description}</td>
                    <td>{item.projectStatus}</td>
                    <td>
                      <button
                        className="btn text-danger bg-white"
                        // onClick={(e) => deleteHandler(e, item._id)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <Link to="/edit">
                        <button
                          className="btn bg-secondary text-white"
                          // onClick={(e) => setData(e, item._id)}
                        >
                          Update
                        </button>
                      </Link>
                    </td>
                  </tr>
                );
                //   );
                // })
              })
            ) : (
              <tr>
                <td colSpan="12"> No Records</td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
          <Link to="/">
            <button className="btn btn-dark">Add Project</button>
          </Link>
          <Link to="/projectView">
            <button className="btn btn-success">Project View</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default View;
