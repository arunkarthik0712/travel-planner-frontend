import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import Loader from "../components/Loader";
import {
  FaHeart,
  FaRegHeart,
  FaArrowLeft,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import SlickCarousel from "../components/SlickCarousel";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const DiscoveryDetailsPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [discovery, setDiscovery] = useState(null);
  const [comment, setComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const navigate = useNavigate();

  // Fetch Discovery Details
  const fetchDiscovery = async () => {
    try {
      const response = await axiosInstance.get(
        `/api/discoveries/discoveries/${id}`
      );
      setDiscovery(response.data);
      setIsLiked(response.data.likes.includes(user?._id));
    } catch (error) {
      toast.error("Failed to fetch discovery details");
    }
  };

  useEffect(() => {
    fetchDiscovery();
  }, [id, user]);

  const handleLike = async () => {
    if (!user) {
      toast.error("Please log in to like this discovery");
      return;
    }
    try {
      const response = await axiosInstance.post(
        `/api/discoveries/${id}/like`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (response.data.isLiked) {
        setIsLiked(true);
        setDiscovery((prev) => ({ ...prev, likes: [...prev.likes, user._id] }));
      }
    } catch (error) {
      toast.error("Failed to like discovery");
    }
  };

  const handleUnlike = async () => {
    try {
      const response = await axiosInstance.post(
        `/api/discoveries/${id}/unlike`,
        {},
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      if (!response.data.isLiked) {
        setIsLiked(false);
        setDiscovery((prev) => ({
          ...prev,
          likes: prev.likes.filter((like) => like !== user._id),
        }));
      }
    } catch (error) {
      toast.error("Failed to unlike discovery");
    }
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      toast.error("Please log in to leave a comment");
      return;
    }
    try {
      await axiosInstance.post(
        `/api/discoveries/discoveries/${id}/comment`,
        { text: comment },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setComment("");
      toast.success("Comment added");
      fetchDiscovery();
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handleCommentEdit = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditedCommentText(currentText);
  };

  const handleCommentUpdate = async () => {
    try {
      await axiosInstance.put(
        `/api/discoveries/discoveries/${id}/comment/${editingCommentId}`,
        { text: editedCommentText },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setDiscovery((prev) => ({
        ...prev,
        comments: prev.comments.map((comment) =>
          comment._id === editingCommentId
            ? { ...comment, text: editedCommentText }
            : comment
        ),
      }));
      setEditingCommentId(null);
      setEditedCommentText("");
      toast.success("Comment updated");
    } catch (error) {
      toast.error("Failed to update comment");
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      await axiosInstance.delete(
        `/api/discoveries/discoveries/${id}/comment/${commentId}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setDiscovery((prev) => ({
        ...prev,
        comments: prev.comments.filter((comment) => comment._id !== commentId),
      }));
      toast.success("Comment deleted");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  if (!discovery) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-teal-600 hover:text-teal-800 transition duration-200 mb-6"
          >
            <FaArrowLeft className="mr-2 text-lg" />
            <span>Back</span>
          </button>
          <h1 className="text-4xl font-bold mb-4">{discovery.location}</h1>
          <SlickCarousel images={discovery.images} />
          <p className="mt-4 text-lg leading-relaxed">
            {discovery.description}
          </p>
          <div className="flex items-center mt-6">
            <button
              onClick={isLiked ? handleUnlike : handleLike}
              className="flex items-center text-lg font-semibold text-red-600 hover:text-red-800 transition duration-200"
            >
              {isLiked ? (
                <FaHeart className="mr-2 text-xl" />
              ) : (
                <FaRegHeart className="mr-2 text-xl" />
              )}
              {discovery.likes.length} Likes
            </button>
          </div>
          <div className="mt-10">
            <h2 className="text-3xl font-bold mb-4">Comments</h2>
            <div className="space-y-4">
              {discovery.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-gray-100 p-4 rounded-lg shadow-md"
                >
                  {editingCommentId === comment._id ? (
                    <div>
                      <textarea
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                      />
                      <div className="flex justify-end mt-2 space-x-2">
                        <button
                          onClick={handleCommentUpdate}
                          className="p-2 bg-teal-500 text-white rounded hover:bg-teal-600 transition duration-200"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => setEditingCommentId(null)}
                          className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-lg font-semibold">
                          {comment.userId.username}
                        </p>
                        {comment.userId._id === user?._id && (
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() =>
                                handleCommentEdit(comment._id, comment.text)
                              }
                              className="text-teal-500 hover:text-teal-600 transition duration-200"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleCommentDelete(comment._id)}
                              className="text-red-500 hover:text-red-600 transition duration-200"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        )}
                      </div>
                      <p className="text-base">{comment.text}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6">
              <textarea
                className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                onClick={handleCommentSubmit}
                className="mt-4 w-full p-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-200"
              >
                Submit Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DiscoveryDetailsPage;
