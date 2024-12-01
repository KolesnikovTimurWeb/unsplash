import React, { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";
import "../styles/ExtraCss.css";
import { useGetAllImages } from "../hooks/hooks";
import Images from "../components/Images";
import ReactPaginate from "react-paginate";
import {
  ArrowLeft,
  ArrowRight,
  Columns3,
  Columns4,
  Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ImageSkeleton from "../components/ImageSkeleton";
const Home = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [columns, setColumns] = useState<1 | 3 | 5>(3);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query === "") return;
    navigate(`/collection/${query}`);
  };

  const fetchImages = async () => {
    setLoading(true);
    try {
      const data = await useGetAllImages(page);
      console.log(data);
      setImages(data);
    } catch (err) {
      console.log("Failed to fetch images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [page]);
  const handlePageClick = (event: any) => {
    setPage(event.selected + 1);
  };
  return (
    <div>
      {/* Home */}
      <div className={styles.home_heading}>
        <h1>Unsplash clone</h1>
        {/* Search */}
        <form className={styles.home_search} onSubmit={handleSubmit}>
          <button onClick={handleSubmit}>
            <Search color="#767676" width={20} height={20} />
          </button>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search photos and illustrations"
          />
        </form>
        {/* Grid */}
        {window.innerWidth < 768 && (
          <div className={styles.home_heading_grid_buttons}>
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
          <div className={styles.home_heading_grid_buttons}>
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
      <div
        className={
          columns === 3
            ? styles.home_images_3
            : columns === 1
            ? styles.home_images_1
            : columns === 5
            ? styles.home_images_5
            : ""
        }
      >
        {loading === false &&
          images.map((image: any) => (
            <Images
              id={image.id}
              key={image.id}
              imageSrc={image.urls.regular}
              height={image.height}
            />
          ))}

        {loading === true &&
          Array.from({ length: 6 }).map(() => <ImageSkeleton />)}
      </div>

      {/* Pagination */}
      {window.innerWidth >= 768 && images.length !== 0 && (
        <div className={styles.home_pagination}>
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
        <div className={styles.home_pagination}>
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

export default Home;
