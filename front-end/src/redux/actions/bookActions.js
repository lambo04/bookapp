export const fetchBooks = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5000/api/books');
    const data = await response.json();

    if (response.ok) {
      dispatch({
        type: 'FETCH_BOOKS_SUCCESS',
        payload: data,
      });
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }
};
