import NavigatorRoot from './src/navigators/NavigatorRoot';
import { Provider } from 'react-redux';
import { store } from './src/utilities/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigatorRoot />
    </Provider>
  );
}