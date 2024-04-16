import axiosService from "./axiosService";

export async function login({ email, password }) {
  try {
    const response = await axiosService.login({ email, password });

    localStorage.setItem("jwt", response.data.token);

    return response.data.data;
  } catch (err) {
    throw new Error("Invalid credentials");
  }
}

export async function getCurrentUser() {
  try {
    const response = await axiosService.getCurrentUser();
    return response.data.data;
  } catch (err) {
    throw new Error("You don't seem to be logged in");
  }
}

// export async function logout() {
//   const { error } = await supabase.auth.signOut();

//   if (error) throw new Error(error.message);
// }

// export async function updateCurrentUser({ password, fullName, avatar }) {
//   // 1. Update password OR fullName
//   let updateData;
//   if (password) updateData = { password };
//   if (fullName) updateData = { data: { fullName } };

//   const { data, error: updateError } =
//     await supabase.auth.updateUser(updateData);

//   if (updateError) throw new Error(updateError.message);
//   if (!avatar) return data;

//   // 2. Upload the avatar image
//   const fileName = `avatar-${data.user.id}-${Math.random()}`;

//   const { error: storageError } = await supabase.storage
//     .from("avatars")
//     .upload(fileName, avatar);

//   if (storageError) throw new Error(storageError.message);

//   // 3. Update avatar in the user
//   const { data: updatedUser, error: avatarUpdateError } =
//     await supabase.auth.updateUser({
//       data: {
//         avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
//       },
//     });

//   if (avatarUpdateError) throw new Error(avatarUpdateError.message);
//   return updatedUser;
// }
