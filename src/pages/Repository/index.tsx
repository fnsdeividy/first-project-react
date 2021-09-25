import React from 'react';
import { useRouteMatch } from 'react-router-dom'
import { Header } from './styles'

interface RepositoryParams {
    repository: string;
}

const Repository:React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();

return (
    <Header>
        <img src="https://xesque.rocketseat.dev/platform/1587379765556-attachment.svg" alt="Github Explorer" alt="" />
    </Header>
)
};

export default Repository;
