import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetImageById } from "../hooks/hooks";
import styles from "../styles/FullPost.module.scss";

type Tag = {
  title: string;
  type: string;
};

const FullPost = () => {
  const { id } = useParams<{ id: string }>();
  const [image, setImage] = useState<any>();
  const [loading, setLoading] = useState(false);
  const handleGetImage = async () => {
    setLoading(true);
    try {
      const data = await useGetImageById(id || null);
      setImage(data);
    } catch (err) {
      console.log("Failed to fetch images. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetImage();
  }, []);
  return (
    <div className={styles.full_post}>
      <div className={styles.full_post_image}>
        {loading && <div className={styles.full_post_skeleton}></div>}
        {!loading && <img src={image?.urls.regular} alt="Full image" />}
      </div>
      <div className={styles.full_post_details}>
        <div className={styles.full_post_info}>
          <p>
            Views:<span>{image?.views}</span>
          </p>
          <p>
            Downloads:<span>{image?.downloads}</span>
          </p>
          <p>
            Likes:<span>{image?.likes}</span>
          </p>
        </div>

        <div className={styles.full_post_tags}>
          {image?.tags.map((tag: Tag) => (
            <FullPostTag key={tag.title} text={tag.title} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FullPostTag = ({ text }: { text: string }) => {
  return (
    <Link to={`/collection/${text}`} className={styles.full_post_tag}>
      #{text}
    </Link>
  );
};

export default FullPost;
