import axios, { AxiosError } from "axios";

interface UserForm {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	age: string | number;
	phone: string;
	birthDate: string;
}

// Function for handling sign-in requests
export const FormSignIn = async (formData: {
  username: string;
  password: string;
}): Promise<{
  accessToken: string;
  refreshToken: string;
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}> => {
  try {
    const res = await axios.post("https://dummyjson.com/auth/login", formData);
    console.log(res);
    return res.data; // Return `res.data` to get the actual response body
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error((error.response?.data as string) || "Failed in Sign In");
    }
    throw new Error("Failed in Sign In");
  }
};


// Function to fetch all users
export const getAllUsers = async (): Promise<unknown> => {
	try {
		const res = await axios.get("https://dummyjson.com/users");
		return res.data.users;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			return (error as AxiosError).response || "Failed in getting users";
		}
		return "Failed in getting users";
	}
};

// Function to delete a user by ID
export const DeleteUser = async (id: number): Promise<unknown> => {
	try {
		const res = await axios.delete(`https://dummyjson.com/users/${id}`);
		return res.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			return (error as AxiosError).response || "Failed in deleting user";
		}
		return "Failed in deleting user";
	}
};

// Function to add a new user
export const AddNewUser = async (data: UserForm): Promise<unknown> => {
	try {
		const res = await axios.post("https://dummyjson.com/users/add", data);
		return res.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			return (error as AxiosError).response || "Failed in adding user";
		}
		return "Failed in adding user";
	}
};

// Function to edit an existing user
export const EditUser = async (
	data: Partial<UserForm>,
	id: number | undefined
): Promise<unknown> => {
	try {
		const res = await axios.patch(`https://dummyjson.com/users/${id}`, data);
		return res.data;
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			return (error as AxiosError).response || "Failed in editing user";
		}
		return "Failed in editing user";
	}
};
