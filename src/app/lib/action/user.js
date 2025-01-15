import User from "../models/users.model";
import { connectToDatabase } from "../mongodb/mongoose";


export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses
) => {
  try {
    await connectToDatabase();
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name,
          lastName: last_name,
          profilePicture: image_url,
          email: email_addresses[0].email_address,
        },
      },
      { upsert: true, new: true }
    );
    return user;
  } catch (error) {
    console.log('Error: Could not create or update user:', error);
  }
};

export const deleteUser = async (id) => {
  try {
    await connectToDatabase();
    await User.findOneAndDelete({ clerkId: id });
  } catch (error) {
    console.log('Error: Could not delete user:', error);
  }
};