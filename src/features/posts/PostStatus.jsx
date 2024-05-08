function PostStatus({ status }) {
  let estado;
  switch (status) {
    case "posted":
      estado = "Publicado";
      break;
    case "editing":
      estado = "Editando";
      break;
    case "deleted":
      estado = "Eliminado";
      break;
    default:
      break;
  }

  const baseStyle = "font-semibold";
  const styles = {
    posted: baseStyle + " text-green-600",
    editing: baseStyle + " text-amber-600",
    deleted: baseStyle + " text-red-600",
  };

  return <p className={styles[status]}>Estado: {estado}</p>;
}

export default PostStatus;
