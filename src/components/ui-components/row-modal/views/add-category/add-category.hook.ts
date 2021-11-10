import { Status } from 'components/util/status';
import { useStateStatus } from 'components/util/use-state-status';
import { useRowModalContext } from '../../context/row-modal-context';

export const useAddCategory = () => {
  const context = useRowModalContext();

  const onCancel = () => {
    context.setState({ openAddCategory: false });
    setState({ category: '', error: false });
  };

  const [state, setState] = useStateStatus<{
    category: string;
    error: false | string;
    status: Status;
  }>({
    status: Status.loaded,
    category: '',
    error: false,
  });

  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ category: e.target.value, error: false });
  };

  const onAddCategory = () => {
    if (state.category === '') {
      setState({ error: 'Please enter a category name.' });
    } else {
      const categoryExist = context.accountBuckets.ids.find(
        (id) => id === state.category
      );
      if (categoryExist) {
        setState({ error: 'Category already exist.' });
      } else {
        context.setState({
          category: state.category,
          openAddCategory: false,
          openCategoryList: false,
        });
        setState({ category: '', error: false });
      }
    }
  };

  return { state, onCancel, onChangeCategory, onAddCategory };
};
