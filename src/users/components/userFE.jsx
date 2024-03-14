import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUsers, selectUsersError, getAllUserAsync } from "../userSlice";
import { Box, Button, FormControl, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const error = useSelector(selectUsersError);
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null); // State to hold the selected user
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    dispatch(getAllUserAsync())
      .then(() => setLoading(false)) // Set loading to false when data is loaded
      .catch(() => setLoading(false)); // Set loading to false in case of error
  }, [dispatch]);

  const handleUserClick = (user) => {
    setSelectedUser({ ...user });
    setSearch(""); // Clear the search query when a user is selected
  };

  useEffect(() => {
    if (users) {
      const filtered = users.filter(
        (user) =>
          user?.profile.firstName
            ?.toLowerCase()
            .includes(search.toLowerCase()) ||
          user?.profile.lastName?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [users, search]);
  const formatDateTime = (dateTimeString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleDateString(undefined, options);
  };

  return (
    <Box>
      {error && <Box>Error: {error}</Box>}
      {loading ? (
        <Box className="h-screen w-full flex items-center justify-center">
          <Box class="p-3 animate-spin drop-shadow-2xl bg-gradient-to-bl from-pink-400 via-purple-400 to-indigo-600 md:w-48 md:h-48 h-32 w-32 aspect-square rounded-full">
            <Box class="rounded-full h-full w-full bg-slate-100  background-blur-md"></Box>
          </Box>
        </Box>
      ) : users ? (
        <Box className="h-screen bg-gray-100 pt-20">
          <Box className="mb-10 text-center text-2xl font-bold">User-List</Box>
          <Box className=" max-w-full justify-around px-6 md:flex md:space-x-6 xl:px-0">
            <Box className="rounded-lg md:w-2/3">
              <Box className=" relative border w-full border-gray-300 hidden lg:flex rounded-xl mb-10 overflow-hidden">
                <FormControl className="w-full">
                  <Search className="h-10 w-10 text-[#4D44B5] absolute top-5 left-5" />
                  <input
                    className=" px-14 h-[60px] outline-none w-full"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box className="">
                <Box className="overflow-y-auto h-[650px]">
                  {filteredUsers?.map((user) => (
                    <Box
                      key={user.id}
                      className="justify-between flex mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
                      onClick={() => handleUserClick(user)} // Call handler on box click
                    >
                      <img
                        src={user.avatar}
                        alt="user-image"
                        className="w-full rounded-lg sm:w-40"
                      />
                      <Box className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                        <Box className="mt-5 sm:mt-0">
                          <Typography
                            variant="h5"
                            className="text-lg font-bold text-gray-900"
                          >
                            {user.profile.firstName} {user.profile.lastName}
                          </Typography>
                          <p className="mt-1 text-sm text-gray-700">
                            @{user.profile.username}
                          </p>
                        </Box>
                        <Box className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                          {/* Add your additional content here */}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
            <Box className="my-5">
              <Box className="w-full text-center mb-5 font-semibold text-xl">
                User-Card
              </Box>
              {selectedUser ? (
                <Box className="flex w-[500px] bg-white flex-col h-fit rounded-xl text-gray-700 shadow-lg">
                  <Box className="p-6">
                    <Box className="mb-3 flex items-center justify-between">
                      <Box>
                        <Box className="block font-sans text-xl font-medium leading-snug tracking-normal text-blue-gray-900 antialiased">
                          {selectedUser.profile?.firstName}{" "}
                          {selectedUser.profile.lastName}
                        </Box>
                        <Box className="font-light text-sm">
                          @{selectedUser.profile.username}
                        </Box>
                        <Box className="my-5">
                          Email :{" "}
                          <Box className="font-light">
                            {selectedUser.profile.email}
                          </Box>
                        </Box>
                      </Box>
                      <Box className="w-fit mx-4 mt-4 overflow-hidden rounded-xl bg-blue-gray-500  shadow-lg shadow-blue-gray-500/40">
                        <img
                          src={selectedUser.avatar}
                          alt="No-Image"
                          className=""
                        />
                      </Box>
                    </Box>
                    <Box className="my-5">
                      Profession :{" "}
                      <Box className="font-light">{selectedUser.jobTitle}</Box>
                    </Box>
                    <Box className="my-3 ">
                      Bio :
                      <Box className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
                        {selectedUser.Bio}
                      </Box>
                    </Box>
                    <Box className="">
                      Date :
                      <Box className="block font-sans text-base font-light leading-relaxed text-gray-700 antialiased">
                        {formatDateTime(selectedUser.createdAt)}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ) : (
                <Box>You haven't selected a user</Box>
              )}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
};

export default UserList;
