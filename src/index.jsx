import ForgeUI, { render, QueuePage, Fragment, Text, useProductContext, useState } from '@forge/ui';
import api, { route } from '@forge/api'

const getJsmQueues = async (serviceDeskKey) => {
    const res = await api
        .asUser()
        .requestJira(
            route`/rest/servicedeskapi/servicedesk/${serviceDeskKey}/queue`
        );
    const data = await res.json();
    return data.values;
};

const App = () => {
    const context = useProductContext();
    const [queues] = useState(async () => await getJsmQueues(context.extensionContext.project.key));
    console.log(`Number of queues: ${queues.length}`);
    return (
        <Fragment>
            <Text>Hello world!</Text>
        </Fragment>
    );
};

export const run = render(
    <QueuePage>
        <App />
    </QueuePage>
);
