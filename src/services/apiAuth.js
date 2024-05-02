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

export async function logout() {
  try {
    await axiosService.logout();

    localStorage.removeItem("jwt");
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function requestAccount({ name, email, request, friendUsername }) {
  try {
    const toWhom = {
      isUser: friendUsername !== "",
      username: friendUsername,
    };

    const response = await axiosService.requestAccount({
      name,
      email,
      request,
      toWhom,
    });

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function inviteFriend({ name, email }) {
  try {
    const response = await axiosService.inviteFriend({
      name,
      email,
    });

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function forgotPassword({ email }) {
  try {
    const response = await axiosService.forgotPassword({ email });

    return response.data;
  } catch (err) {
    throw new Error(err.response.data.message);
  }
}

export async function resetPassword({ password, passwordConfirm, token }) {
  try {
    const response = await axiosService.resetPassword({
      password,
      passwordConfirm,
      token,
    });

    localStorage.setItem("jwt", response.data.token);

    return response.data.data;
  } catch (err) {
    throw new Error(err.response.data.message);
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
