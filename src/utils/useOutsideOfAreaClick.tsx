import { RefObject, useEffect } from "react";
import { useDispatch } from "react-redux";

export const useOutsideOfAreaClick = (
  ref: RefObject<any>,
  actionFunc: () => void
) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        dispatch(actionFunc());
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [actionFunc, dispatch, ref]);
};
