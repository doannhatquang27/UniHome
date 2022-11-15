import "./index.scss";
import NotFound from "../../assets/images/undraw_not_found_-60-pq.svg";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <img src={NotFound} alt="not found" className="not-found-page_image" />
      <span>Không tìm thấy kết quả phù hợp</span>
    </div>
  );
};

export default NotFoundPage;
