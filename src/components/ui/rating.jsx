import { Star } from "lucide-react";

const Rating = ({ rating = 0, starCount = 5, className = "", ...props }) => {
  return (
    <div
      className={`flex rating-stars mr-1 ${className}`}
      role="img"
      aria-label={`Rating: ${rating} out of ${starCount} stars`}
      {...props}
    >
      {[...Array(starCount)].map((_, index) => (
        <Star
          key={index}
          size={14}
          fill={index < Math.floor(rating) ? "currentColor" : "none"}
          className={
            index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
};

export { Rating };
