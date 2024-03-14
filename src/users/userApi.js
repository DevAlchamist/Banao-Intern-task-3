import axios from "axios";

export async function getAllUser() {
  return await axios
    .get("https://602e7c2c4410730017c50b9d.mockapi.io/users", {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      // Return only the data part of the response
      return {...response};
    })
    .catch((error) => {
      // Handle errors
      console.error("Error fetching user data:", error);
      throw error;
    });
}
