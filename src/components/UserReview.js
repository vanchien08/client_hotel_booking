// ReviewComponent.jsx
import React, { Component } from "react";
import { Star, User, ThumbsUp, Reply } from "lucide-react";
import "./ReviewComponent.scss";
import { handleGetReviewByHotel } from "../services/hotelService";
class ReviewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      newReview: {
        rating: 0,
        comment: "",
        userName: "",
        email: "",
      },
      hoveredStar: 0,
      showReviewForm: false,
      dataReview: [],
    };
  }

  async componentDidMount() {
    const hotelId = this.props.hotelId;

    let respon = await handleGetReviewByHotel(hotelId);
    this.setState({
      dataReview: respon.dataReviews,
    });
    console.log("sdfgsdfg", respon.dataReviews);
    const mockReviews = [
      {
        id: 1,
        userName: "Nguyễn Văn A",
        rating: 5,
        comment:
          "Khách sạn rất tuyệt vời! Phòng sạch sẽ, dịch vụ chu đáo. Sẽ quay lại lần sau.",
        date: "2024-03-15",
        likes: 12,
        avatar: null,
      },
      {
        id: 2,
        userName: "Trần Thị B",
        rating: 4,
        comment:
          "Vị trí thuận tiện, gần trung tâm. Nhân viên thân thiện. Chỉ có điều Wi-Fi hơi chậm.",
        date: "2024-03-10",
        likes: 8,
        avatar: null,
      },
      {
        id: 3,
        userName: "Lê Minh C",
        rating: 5,
        comment:
          "Trải nghiệm tuyệt vời! Phòng rộng rãi, tầm nhìn đẹp. Bữa sáng ngon miệng.",
        date: "2024-03-08",
        likes: 15,
        avatar: null,
      },
    ];
    this.setState({ reviews: mockReviews });
  }

  handleStarClick = (rating) => {
    this.setState((prevState) => ({
      newReview: { ...prevState.newReview, rating },
    }));
  };

  changeTime = (isoDate) => {
    //  const isoDate = "2025-01-25T23:43:20.000+00:00";
    const date = new Date(isoDate);

    // Format theo kiểu dd/MM/yyyy HH:mm
    const formatted =
      date.getDate().toString().padStart(2, "0") +
      "/" +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      date.getFullYear() +
      " " +
      date.getHours().toString().padStart(2, "0") +
      ":" +
      date.getMinutes().toString().padStart(2, "0");

    return formatted;
  };
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      newReview: { ...prevState.newReview, [name]: value },
    }));
  };

  handleSubmitReview = (e) => {
    e.preventDefault();
    const { newReview, reviews } = this.state;

    if (newReview.rating === 0 || !newReview.comment.trim()) {
      alert("Vui lòng chọn số sao và viết bình luận!");
      return;
    }

    const review = {
      id: reviews.length + 1,
      userName: newReview.userName || "Khách ẩn danh",
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
      likes: 0,
      avatar: null,
    };

    this.setState({
      reviews: [review, ...reviews],
      newReview: {
        rating: 0,
        comment: "",
        userName: "",
        email: "",
      },
      showReviewForm: false,
    });

    alert("Cảm ơn bạn đã đánh giá!");
  };

  handleLike = (reviewId) => {
    this.setState((prevState) => ({
      reviews: prevState.reviews.map((review) =>
        review.id === reviewId ? { ...review, likes: review.likes + 1 } : review
      ),
    }));
  };

  renderStars = (rating, interactive = false, size = 20) => {
    const { hoveredStar } = this.state;

    return [...Array(5)].map((_, index) => {
      const starNumber = index + 1;
      const isActive =
        starNumber <= (interactive ? hoveredStar || rating : rating);

      return (
        <Star
          key={index}
          size={size}
          className={`star ${interactive ? "interactive" : ""} ${
            isActive ? "active" : ""
          }`}
          onClick={
            interactive ? () => this.handleStarClick(starNumber) : undefined
          }
          onMouseEnter={
            interactive
              ? () => this.setState({ hoveredStar: starNumber })
              : undefined
          }
          onMouseLeave={
            interactive ? () => this.setState({ hoveredStar: 0 }) : undefined
          }
        />
      );
    });
  };

  calculateAverageRating = () => {
    const { reviews } = this.state;
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  getRatingText = (rating) => {
    switch (rating) {
      case 1:
        return "Rất tệ";
      case 2:
        return "Tệ";
      case 3:
        return "Trung bình";
      case 4:
        return "Tốt";
      case 5:
        return "Xuất sắc";
      default:
        return "";
    }
  };

  render() {
    const { reviews, newReview, showReviewForm, dataReview } = this.state;
    const averageRating = this.calculateAverageRating();

    return (
      <div className="review-component">
        {/* Header */}
        <div className="review-header">
          <h2 className="review-title">Đánh giá từ khách hàng</h2>

          <div className="rating-summary">
            <div className="average-rating">
              <span className="rating-number">{averageRating}</span>
              <div className="stars-container">
                {this.renderStars(Math.round(averageRating))}
              </div>
            </div>
            <span className="review-count">({reviews.length} đánh giá)</span>
          </div>

          <button
            className="write-review-btn"
            onClick={() => this.setState({ showReviewForm: !showReviewForm })}
          >
            {showReviewForm ? "Hủy đánh giá" : "Viết đánh giá"}
          </button>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="review-form-container">
            <h3 className="form-title">Chia sẻ trải nghiệm của bạn</h3>

            <div className="review-form">
              <div className="form-group">
                <label className="form-label">Đánh giá của bạn *</label>
                <div className="stars-input">
                  {this.renderStars(newReview.rating, true, 28)}
                </div>
                {newReview.rating > 0 && (
                  <span className="rating-text">
                    {this.getRatingText(newReview.rating)}
                  </span>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Tên của bạn</label>
                  <input
                    type="text"
                    name="userName"
                    value={newReview.userName}
                    onChange={this.handleInputChange}
                    className="form-input"
                    placeholder="Nhập tên của bạn"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newReview.email}
                    onChange={this.handleInputChange}
                    className="form-input"
                    placeholder="Nhập email của bạn"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Bình luận của bạn *</label>
                <textarea
                  name="comment"
                  value={newReview.comment}
                  onChange={this.handleInputChange}
                  rows={4}
                  className="form-textarea"
                  placeholder="Chia sẻ trải nghiệm của bạn về khách sạn..."
                  required
                />
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="submit-btn"
                  onClick={this.handleSubmitReview}
                >
                  Gửi đánh giá
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => this.setState({ showReviewForm: false })}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="reviews-list">
          {dataReview && dataReview.length === 0 ? (
            <div className="no-reviews">
              <p>Chưa có đánh giá nào. Hãy là người đầu tiên đánh giá!</p>
            </div>
          ) : (
            dataReview.map((review) => (
              <div key={review.id} className="review-item">
                <div className="review-content">
                  <div className="user-avatar">
                    {review.avatar ? (
                      <img
                        src={review.user.avatar}
                        alt={review.user.name}
                        className="avatar-img"
                      />
                    ) : (
                      <User size={24} className="avatar-icon" />
                    )}
                  </div>

                  <div className="review-details">
                    <div className="review-meta">
                      <h4 className="user-name">{review.user.name}</h4>
                      <div className="review-rating">
                        {this.renderStars(review.rating)}
                      </div>
                      <span className="review-date">
                        {this.changeTime(review.createdAt)}
                      </span>
                    </div>

                    <p className="review-comment">{review.comment}</p>

                    <div className="review-actions">
                      <button
                        className="action-btn like-btn"
                        onClick={() => this.handleLike(review.id)}
                      >
                        <ThumbsUp size={16} />
                        {/* <span>{review.}</span> */}
                      </button>
                      <button className="action-btn reply-btn">
                        <Reply size={16} />
                        <span>Trả lời</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }
}

export default ReviewComponent;
