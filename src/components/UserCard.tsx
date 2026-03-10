import { useState, useEffect } from 'react';

const UserCard = ({ userId }: { userId: number }) => {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true; // 1. Track if the component is still in the DOM

    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(r => r.json())
      .then(data => {
        if (isMounted) { // 2. Only update state if mounted
          setName(data.name);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false; // 3. Set to false when the component unmounts
    };
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  return <div><h2>{name}</h2></div>;
};

export default UserCard;