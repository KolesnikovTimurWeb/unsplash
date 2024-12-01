import React, { useEffect, useState } from "react";
import { useGetAllImagesByTag } from "../hooks/hooks";
import { Link, useParams } from "react-router-dom";
import styles from "../styles/Tag.module.scss";
import ReactPaginate from "react-paginate";
import { ArrowLeft, ArrowRight, Columns3, Columns4 } from "lucide-react";
import Images from "../components/Images";
import ImageSkeleton from "../components/ImageSkeleton";

const TagPage = () => {
  const [page, setPage] = useState(1);
  const { tag } = useParams<{ tag: string }>();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [columns, setColumns] = useState<1 | 3 | 5>(3);

  const handlePageClick = (event: any) => {
    console.log(event);
    setPage(event.selected + 1);
  };

  const handleGetImagesByTag = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await useGetAllImagesByTag(page, tag);
      setImages(data.results);
    } catch (err) {
      setError("Failed to fetch images. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetImagesByTag();
  }, [page, tag]);

  return (
    <div>
      {/* Home */}
      <div className={styles.tag_heading}>
        <h1>Unsplash clone</h1>
        <h2>#{tag}</h2>
        {/* Search */}
        <input />
        {/* Grid */}
        {window.innerWidth < 768 && (
          <div className={styles.tag_heading_grid_buttons}>
            <button
              style={{ opacity: columns === 1 ? 1 : 0.4 }}
              onClick={() => setColumns(1)}
            >
              <Columns3 width={20} height={20} />1 columns
            </button>

            <button
              style={{ opacity: columns === 3 ? 1 : 0.4 }}
              onClick={() => setColumns(3)}
            >
              <Columns4 width={20} height={20} />3 columns
            </button>
          </div>
        )}
        {window.innerWidth >= 768 && (
          <div className={styles.tag_heading_grid_buttons}>
            <button
              style={{ opacity: columns === 3 ? 1 : 0.4 }}
              onClick={() => setColumns(3)}
            >
              <Columns3 width={20} height={20} />3 columns
            </button>

            <button
              style={{ opacity: columns === 5 ? 1 : 0.4 }}
              onClick={() => setColumns(5)}
            >
              <Columns4 width={20} height={20} />5 columns
            </button>
          </div>
        )}
      </div>
      {loading === false && images.length === 0 && (
        <div className={styles.tag_not_found}>
          <h2>No images Found</h2>
          <Link to={"/"}> Home Page</Link>
        </div>
      )}

      {loading === false && images.length !== 0 && (
        <div
          className={
            columns === 3
              ? styles.tag_images_3
              : columns === 1
              ? styles.tag_images_1
              : columns === 5
              ? styles.tag_images_5
              : ""
          }
        >
          {loading === false
            ? images?.map((image: any) => (
                <Images
                  id={image.id}
                  key={image.id}
                  imageSrc={image.urls.regular}
                  height={image.height}
                />
              ))
            : Array.from({ length: 6 }).map(() => <ImageSkeleton />)}
        </div>
      )}

      {/* Pagination */}
      {window.innerWidth >= 768 && images.length !== 0 && (
        <div className={styles.tag_pagination}>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<ArrowRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={10}
            previousLabel={<ArrowLeft />}
            renderOnZeroPageCount={null}
          />
        </div>
      )}

      {window.innerWidth < 768 && images.length !== 0 && (
        <div className={styles.tag_pagination}>
          <ReactPaginate
            breakLabel="..."
            nextLabel={<ArrowRight />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={10}
            pageCount={10}
            previousLabel={<ArrowLeft />}
            renderOnZeroPageCount={null}
          />
        </div>
      )}
    </div>
  );
};

export default TagPage;
