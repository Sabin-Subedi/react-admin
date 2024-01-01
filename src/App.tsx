
import { Admin, ListGuesser, Resource } from 'react-admin';
import { authProvider } from './providers/authProvider';
import { dataProvider } from './providers/dataProvider';

export const App = () => (
    <Admin authProvider={authProvider} dataProvider={dataProvider} requireAuth>
        <Resource name="users" list={ListGuesser} />
    </Admin>
);

