import { ReactElement, useState } from "react";
import { AddBtn, DeleteBtn, ViewDetailsBtn } from "../index";

import "./style.scss";

interface IToolbarProps {
  addTooltipMsg: string;
  children?: (data?: any) => ReactElement;
  deleteFunction: () => void;
  deleteTooltipMsg: string;
  selectedItem: any;
}

const Toolbar = ({
  addTooltipMsg,
  children,
  deleteFunction,
  deleteTooltipMsg,
  selectedItem,
}: IToolbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <nav className="amber accent-4">
      <div className="nav-wrapper toolbar">
        {children &&
          children({
            isEditMode,
            isOpen,
            isViewMode,
            selectedItem,
            setIsEditMode,
            setIsOpen,
            setIsViewMode,
          })}

        {selectedItem && (
          <ViewDetailsBtn setIsOpen={setIsOpen} setIsViewMode={setIsViewMode} />
        )}

        {selectedItem && (
          <DeleteBtn onClick={deleteFunction} tooltipMsg={deleteTooltipMsg} />
        )}

        <div className="add-btn-container">
          <AddBtn setIsOpen={setIsOpen} tooltipMsg={addTooltipMsg} />
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
