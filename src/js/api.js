import axios from 'axios';

export const getReviews = async () => {
  const responseReviews = await axios.get(
    'https://portfolio-js.b.goit.study/api/reviews'
  );
  return responseReviews.data;
};

export const postRequest = async (email, comment) => {
  const responseRequest = await axios.post(
    'https://portfolio-js.b.goit.study/api/requests',
    {
      email,
      comment,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return responseRequest.data;
};
