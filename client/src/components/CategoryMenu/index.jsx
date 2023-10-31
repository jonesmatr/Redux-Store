import { useQuery } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../utils/reducers';  // adjust path as needed
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';

function CategoryMenu() {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.app);  // Assuming your slice name is 'app'

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch(actions.updateCategories(categoryData.categories));
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch(actions.updateCategories(categories));
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch(actions.updateCurrentCategory(id));
  };

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id);
          }}
        >
          {item.name}
        </button>
      ))}
      <button
        onClick={() => {
          handleClick('');
        }}
      >
        All
      </button>
    </div>
  );
}

export default CategoryMenu;
