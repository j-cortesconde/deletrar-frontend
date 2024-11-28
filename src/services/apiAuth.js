import axiosService from "./axiosService";

export async function login({ email, password }) {
  const response = await axiosService.login({ email, password });

  localStorage.setItem("jwt", response.data.token);

  return response.data.data;
}

export async function logout() {
  await axiosService.logout();

  localStorage.removeItem("jwt");
}

export async function requestAccount({ name, email, request, friendUsername }) {
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
}

export async function inviteFriend({ name, email }) {
  const response = await axiosService.inviteFriend({
    name,
    email,
  });

  return response.data;
}

export async function forgotPassword({ email }) {
  const response = await axiosService.forgotPassword({ email });

  return response.data;
}

export async function resetPassword({ password, passwordConfirm, token }) {
  const response = await axiosService.resetPassword({
    password,
    passwordConfirm,
    token,
  });

  localStorage.setItem("jwt", response.data.token);

  return response.data.data;
}

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
