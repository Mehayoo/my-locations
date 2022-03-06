import { ReactElement } from "react";
import { ListItem } from "../index";
import { ICategory } from "../../entityTypes/ICategory";
import { ILocation } from "../../entityTypes/ILocation";

interface IListProps {
  children?: (data: any) => ReactElement;
  emptyMsg: string;
  listItems: ICategory[] | ILocation[];
  onItemClick: (arg: any) => void;
  selectedItem: ICategory | ILocation;
}

const List = ({
  children,
  emptyMsg,
  listItems,
  onItemClick,
  selectedItem,
}: IListProps) => {
  return (
    <ul className="collection">
      {listItems.length > 0 ? (
        listItems.map((item) => (
          <ListItem
            item={item}
            key={item.id}
            onItemClick={onItemClick}
            selectedItem={selectedItem}
          >
            {children}
          </ListItem>
        ))
      ) : (
        <li className="collection-item">{emptyMsg}</li>
      )}
    </ul>
  );
};

export default List;
