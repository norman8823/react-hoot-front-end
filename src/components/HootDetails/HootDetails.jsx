import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as hootService from "../../services/hootService";
import CommentForm from "../CommentForm/CommentForm";

const HootDetails = (props) => {
  const [hoot, setHoot] = useState(null);
  const { hootid } = useParams();

  const handleAddComment = async (commentFormData) => {
    const newComment = await hootService.createComment(hootid, commentFormData);
    setHoot({ ...hoot, comments: [...hoot.comments, newComment] });
    console.log("commentFormData", commentFormData);
  };

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootid);
      console.log("hootData", hootData);
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootid]);
  console.log("hoot state:", hoot);
  if (!hoot) return <main>Loading...</main>;
  return (
    <main>
      <header>
        <p>{hoot.category.toUpperCase()}</p>
        <h1>{hoot.title}</h1>
        <p>
          {hoot.author.username} posted on
          {new Date(hoot.createdAt).toLocaleDateString()}
        </p>
      </header>
      <p>{hoot.text}</p>
      <section>
        <h2>Comments</h2>
        <CommentForm handleAddComment={handleAddComment} />
        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {comment.author.username} posted on
                {new Date(comment.createdAt).toLocaleDateString()}
              </p>
            </header>
            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HootDetails;
