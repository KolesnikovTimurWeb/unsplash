import { Link } from "react-router-dom";

const Images = ({
  id,
  imageSrc,
  height,
}: {
  id: number;
  imageSrc: string;
  height: number;
}) => {
  return (
    <Link to={`/photos/${id}`}>
      <img src={imageSrc} height={height} />
    </Link>
  );
};

export default Images;
