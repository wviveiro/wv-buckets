import { faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import BlackModal from 'components/ui-components/black-modal';
import React from 'react';
import { useRowModalContext } from '../../context/row-modal-context';

export const SelectCategory: React.FC = () => {
  const { accountBuckets, setState, state } = useRowModalContext();

  const onClose = () => {
    setState({ openCategoryList: false });
  };

  const onSelectCategory = (category: string) => {
    return () => {
      setState({
        category,
        openCategoryList: false,
      });
    };
  };

  const onAddCategory = () => {
    setState({ openAddCategory: true });
  };

  return (
    <>
      <BlackModal.Title
        leftButton={
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faChevronDown} />
          </button>
        }
        rightButton={
          <button className="text-primary" onClick={onAddCategory}>
            Add
          </button>
        }
      >
        Select a Category
      </BlackModal.Title>
      <BlackModal.List>
        {accountBuckets.ids.map((id, i) => (
          <BlackModal.List.Item key={i} onClick={onSelectCategory(id)}>
            <div className="flex">
              <div className="flexGrow">
                <h4>{id}</h4>
              </div>
              <div className="tick-container">
                {id === state.category && <FontAwesomeIcon icon={faCheck} />}
              </div>
            </div>
          </BlackModal.List.Item>
        ))}
      </BlackModal.List>
    </>
  );
};
