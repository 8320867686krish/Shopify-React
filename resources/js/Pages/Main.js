
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Provider } from '@shopify/app-bridge-react';
import Routes from '../Routing/Routes'

export default function Main(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const history = useMemo(
        () => ({ replace: (path) => navigate(path, { replace: true }) }),
        [navigate],
    );
    const config = {
        apiKey: apiKey,
        shopOrigin: new URLSearchParams(document.location.search).get("shop"),
        host: new URLSearchParams(document.location.search).get("host"), // Add the 'host' property
        forceRedirect: true,

    };
    const router = useMemo(
        () => ({
            location,
            history,
        }),
        [location, history],
    );

    return (
        <Provider
            config={config}
            router={router}
        >

            <Routes {...props} />
        </Provider>
    );
}
