/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { MetaData } from "../components/MetaData";
import { FiSearch } from "react-icons/fi";
import { Loader } from "../components/Loader";
import { JobCard } from "../components/JobCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs, getSingleJob } from "../actions/JobActions";
import { Slider } from "@mantine/core";
import { RxCross2 } from "react-icons/rx";
import { Pagination } from "@mantine/core";

export const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, loading } = useSelector((state) => state.job);

  const [baseJobs, setBaseJobs] = useState([]);
  const [jobs, setJobs] = useState([]);

  const [category, setCategory] = useState("");
  const [salary, setSalary] = useState(0);
  const [company, setCompany] = useState("");
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getAllJobs());
  }, []);

  useEffect(() => {
    setJobs(allJobs);
    setBaseJobs(allJobs);
  }, [allJobs]);

  useEffect(() => {
    const searchArr = baseJobs.filter((e) =>
      e.title.toLowerCase().includes(search.toLowerCase().trim())
    );

    if (search === "") {
      setJobs(baseJobs);
    } else {
      setJobs(searchArr);
    }
  }, [search, baseJobs]);

  const searchHandler = () => {
    console.log(search);

    const searchArr = baseJobs.filter((e) =>
      e.title.toLowerCase().includes(search.toLowerCase())
    );

    if (search !== "") {
      setJobs(searchArr);
    } else if (searchArr.length === 0) {
      setJobs(baseJobs);
    }
  };

  // Pagination

  const itemsPerPage = 5;

  const totalPageCount = Math.ceil(jobs.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPageCount));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedData = jobs.slice(startIndex, endIndex);

  const pageButtons = [];
  const maxButtonsToShow = 3; // Maximum number of page buttons to show

  let startButton = Math.max(1, currentPage - Math.floor(maxButtonsToShow / 2));
  let endButton = Math.min(totalPageCount, startButton + maxButtonsToShow - 1);

  for (let i = startButton; i <= endButton; i++) {
    pageButtons.push(
      <button
        key={i}
        onClick={() => handlePageChange(i)}
        className={`mx-1 px-3 py-1 border border-gray-700 rounded ${
          currentPage === i
            ? "bg-gray-800  text-white"
            : "bg-gray-900  text-white hover:bg-gray-800 hover:text-white"
        }`}
      >
        {i}
      </button>
    );
  }

  // Pagination

  return (
    <>
      <MetaData title="Jobs" />
      <div className="bg-gray-950 min-h-screen pt-14 md:px-20 px-3  text-white">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="flex-col flex justify-center items-center w-full ">
              <div className="text-center pt-8 md:text-2xl text-xl font-medium">
                <p>Find your dream job now</p>
              </div>
              <div className="py-3 pt-4 w-full flex justify-center items-center ">
                <div className="flex  justify-center w-full  items-center  ">
                  <div className="bg-gray-700 flex md:w-2/5 w-4/5 rounded-md overflow-hidden mb-2">
                    <div className="flex justify-center items-center pl-2 text-white">
                      {" "}
                      <FiSearch size={19} />{" "}
                    </div>
                    <input
                      value={search}
                      placeholder="Search Jobs "
                      onChange={(e) => setSearch(e.target.value)}
                      type="text"
                      className="outline-none bold-placeholder bg-gray-700  text-white px-2 pl-3 md:h-10 w-full h-8 py-1 text-sm"
                    />
                    <div className="items-center flex justify-center px-2 ">
                      <RxCross2
                        onClick={() => setSearch("")}
                        size={19}
                        className={`cursor-pointer
                    ${search.length !== 0 ? "flex" : "hidden"}
                     `}
                      />
                    </div>
                    <button
                      onClick={() => searchHandler()}
                      className="blueCol md:text-sm text-xs px-4 md:h-10 h-8 py-1"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className=" flex flex-col pt-1 justify-center items-center md:flex-row w-full ">
                <div className="md:w-[65%] pb-20 pt-2">
                  <div className="flex  flex-col md:overflow-y-auto  md:max-h-[30rem] gap-4">
                    {
                      // jobs && jobs
                      jobs &&
                        displayedData
                          .filter((job) => job._id)
                          .sort((a, b) => {
                            const dateA = new Date(a.createdAt);
                            const dateB = new Date(b.createdAt);
                            return dateB - dateA;
                          })
                          .map((job, i) => (
                            <JobCard
                              onClick={() => {
                                dispatch(getSingleJob(job._id));
                              }}
                              key={i}
                              job={job}
                            />
                          ))
                    }

                    <div
                      className={`${
                        jobs.length == 0 ? "flex" : "hidden"
                      }  w-full  justify-center items-center  text-center pt-16 pb-12 md:text-xl text-lg    `}
                    >
                      No Jobs available according to your preferences
                    </div>
                  </div>

                  <div className={` justify-center pt-20 items-center`}>
                    {/* Pagination */}
                    <div className="flex flex-col ">
                      <div className="flex justify-center items-center mt-1">
                        <button
                          onClick={handlePrevPage}
                          disabled={currentPage === 1}
                          className="bg-gray-900 border border-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 mr-2 cursor-pointer"
                        >
                          Previous
                        </button>

                        {pageButtons}

                        <button
                          onClick={handleNextPage}
                          disabled={currentPage === totalPageCount}
                          className="bg-gray-900 border border-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 ml-2 cursor-pointer"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
