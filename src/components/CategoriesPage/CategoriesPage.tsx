import { useRef } from "react";
import {
  CategoryModal,
  CategoryTitleBar,
  List,
  NavBtn,
  Toolbar,
} from "../index";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCurrentCategory,
  deleteCategory,
  setCurrentCategory,
} from "../../actions/categoryActions";
import { RootState } from "../../reducers";
import { ICategory } from "../../entityTypes/ICategory";
import { useOutsideOfAreaClick } from "../../utils/useOutsideOfAreaClick";

const CategoriesPage = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  useOutsideOfAreaClick(wrapperRef, clearCurrentCategory);

  const categoriesState = useSelector(
    (state: RootState) => state.categoriesReducer
  );
  const {
    categories,
    currentCategory,
  }: { categories: ICategory[]; currentCategory: ICategory } = categoriesState;
  const dispatch = useDispatch();

  const deleteFunction = () => {
    dispatch(deleteCategory(currentCategory.id));
    dispatch(clearCurrentCategory());
  };

  const onItemClick = (selectedItem: ICategory) => {
    dispatch(setCurrentCategory(selectedItem));
  };

  return (
    <div className="container" ref={wrapperRef}>
      <div className="section">
        <Toolbar
          addTooltipMsg="Add a new category"
          deleteFunction={deleteFunction}
          deleteTooltipMsg="Delete category"
          selectedItem={currentCategory}
        >
          {({
            isEditMode,
            isOpen,
            isViewMode,
            selectedItem,
            setIsEditMode,
            setIsOpen,
            setIsViewMode,
          }) => (
            <>
              <CategoryTitleBar
                isEditMode={isEditMode}
                setIsEditMode={setIsEditMode}
              />
              <CategoryModal
                isOpen={isOpen}
                isViewMode={isViewMode}
                selectedCategory={selectedItem}
                setIsOpen={setIsOpen}
                setIsViewMode={setIsViewMode}
              />
            </>
          )}
        </Toolbar>
        <List
          emptyMsg="List is currently empty. Add some categories."
          listItems={categories}
          onItemClick={onItemClick}
          selectedItem={currentCategory}
        >
          {(item) => <NavBtn currentCategory={item} />}
        </List>
      </div>
    </div>
  );
};

export default CategoriesPage;
