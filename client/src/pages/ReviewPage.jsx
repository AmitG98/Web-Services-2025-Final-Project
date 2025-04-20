import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useSubmitReview } from "../hooks/useUserReviews";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Checkbox } from "../components/ui/checkbox";
import { Button } from "../components/ui/button";
import Spinner from "../components/ui/spinner";
import MainHeader from "../components/coreUi/MainHeader";
import { FaStar } from "react-icons/fa";
import { addInteraction } from "../api/logs";
import { toast } from "sonner";

const ReviewPage = () => {
  const { programId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const posterPath = new URLSearchParams(location.search).get("posterPath");

  const [form, setForm] = useState({
    rating: 0,
    comment: "",
    isPublic: true,
  });

  const selectedProfile = JSON.parse(sessionStorage.getItem("selectedProfile"));
  const { mutate: addReview, isLoading } = useSubmitReview();

  if (!selectedProfile) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const handleChange = (field) => (e) => {
    const value = field === "isPublic" ? !form.isPublic : e.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleStarClick = (value) => {
    setForm((prev) => ({
      ...prev,
      rating: prev.rating === value ? 0 : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedProfile?._id) return;

    if (form.rating === 0 && form.comment.trim() === "") {
      toast.error("Please rate or write something before submitting.");
      return;
    }

    const reviewData = {
      mediaId: programId,
      posterPath,
      ...form,
      profileId: selectedProfile._id,
      userId: selectedProfile.user,
    };

    addReview(reviewData, {
      onSuccess: async () => {
        try {
          await addInteraction(
            selectedProfile._id,
            `tmdb-${programId}`,
            "review"
          );
        } catch (err) {
        } finally {
          navigate("/home");
        }
      },
    });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 left-0 w-full z-50">
        <MainHeader activePage={null} />
      </div>

      <div className="pt-32 px-4 max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Write a Review</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="text-gray-300 block mb-2">Rating:</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar
                  key={i}
                  onClick={() => handleStarClick(i)}
                  className={`cursor-pointer text-3xl transition ${
                    form.rating >= i ? "text-yellow-400" : "text-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="comment" className="text-gray-300 block mb-2">
              Comment:
            </Label>
            <Textarea
              id="comment"
              rows="4"
              value={form.comment}
              onChange={handleChange("comment")}
              className="bg-[#1c1c1c] text-white border border-gray-700 w-full"
              placeholder="Write your review here..."
              maxLength={500}
            />
          </div>

          <div className="text-right text-sm text-gray-400 mt-1">
            {form.comment.length}/500
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={form.isPublic}
              onChange={handleChange("isPublic")}
              className="border-gray-600"
            />
            <Label className="text-gray-300">Make this review public</Label>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold"
          >
            {isLoading ? <Spinner size="sm" /> : "Submit Review"}
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="w-full border border-gray-600 text-white bg-transparent hover:bg-gray-700 transition"
            >
            Cancel
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ReviewPage;
