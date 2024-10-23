
import { useState, useEffect } from 'react';
import * as hootService from '../../services/hootService';


const HootDetails = (props) => {
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

const [hoot, setHoot] = useState(null)


useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      console.log('hootData', hootData);
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootId]);
console.log('hoot state:', hoot);

const { hootId } = useParams();

console.log('hootId', hootId)
  export default HootDetails;
  