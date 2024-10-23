
import { useState, useEffect, useParams } from 'react';
import * as hootService from '../../services/hootService';


const HootDetails = (props) => {
    if (!hoot) return <main>Loading...</main>;
    const [hoot, setHoot] = useState(null)
    const { hootId } = useParams();

    
useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      console.log('hootData', hootData);
      setHoot(hootData);
    };
    fetchHoot();
  }, [hootId]);
console.log('hoot state:', hoot);

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


  export default HootDetails;
  