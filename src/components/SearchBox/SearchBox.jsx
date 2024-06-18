import { useDispatch, useSelector } from "react-redux";
import css from "../SearchBox/SearchBox.module.css";
import { selectFilter } from "../../redux/selectors";
import { changeFilter } from "../../redux/filtersSlice";

const SearchBox = () => {
  const filter = useSelector(selectFilter);
  const dispatch = useDispatch();
  const handleChangeInput = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.searchBoxContainer}>
      <h3 className={css.title}>Find your contacts</h3>
      <input
        type="text"
        value={filter.name}
        onChange={handleChangeInput}
        className={css.searchBoxInput}
        placeholder="Search..."
      />
    </div>
  );
};

export default SearchBox;
