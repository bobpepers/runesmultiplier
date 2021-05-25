import React from 'react';
import {
  Grid,
  Box,
} from '@material-ui/core';
import Rating from 'react-rating';
import EmptyStar from '../assets/images/Empty_Star.svg';
import FullStar from '../assets/images/Full_Star_Yellow.svg';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className="list-group mb-4">
      {posts.map((post) => (
        <li
          key={post.id}
          className="list-group-item"
          style={{
            borderBottom: '1px solid black',
          }}
        >
          <Grid container>
            <Grid container item xs={12}>
              <Grid container item xs={6}>
                <div
                  style={{
                    maxHeight: '50px',
                    maxWidth: '50px',
                  }}
                  className="avatar-image"
                >
                  <img
                    src={`/uploads/avatars/${post.userRating.avatar_path}`}
                    alt="avatar"
                  />
                </div>
                <p style={{ width: '100%' }}>
                  {post.userRating.username}
                  :
                </p>
              </Grid>
              <Grid container item xs={6}>
                <div
                  className="datetime"
                  style={{ width: '100%' }}
                >
                  {post.updatedAt}
                </div>
                <div
                  className="datetime"
                >
                  <Rating
                    readonly
                    initialRating={post.rating}
                    emptySymbol={(
                      <EmptyStar />
)}
                    fullSymbol={(
                      <FullStar />
)}
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container item xs={12}>
              <p style={{ width: '100%' }}>
                {post.feedback}
              </p>
            </Grid>
          </Grid>
        </li>
      ))}
    </ul>
  );
};

export default Posts;
