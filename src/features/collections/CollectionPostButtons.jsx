import Button from "../../ui/Button";

function CollectionPostButtons({ index }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col gap-1">
        <Button size="small">+ Anterior</Button>
        <Button size="small">+ Posterior</Button>
      </div>
      <div>
        <Button variation="danger">Quitar</Button>
      </div>
    </div>
  );
}

export default CollectionPostButtons;
