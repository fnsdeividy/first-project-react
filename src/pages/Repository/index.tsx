import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom'
import { Header, RepositoryInfo, Issues } from './styles';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

interface RepositoryParams {
    repository: string;
}

const Repository:React.FC = () => {
    const { params } = useRouteMatch<RepositoryParams>();

return (
    <>
    <Header>
        <img src="https://xesque.rocketseat.dev/platform/1587379765556-attachment.svg" alt="Github Explorer" />
        <Link to="/">
        <FiChevronLeft size={16} />
        Voltar
        </Link>
    </Header>

    <RepositoryInfo>
        <header>
            <img src="https://avatars.githubusercontent.com/u/89440440?v=4" alt="Deividy Ferreira" />
            <div>
                <strong>Deividy nfsdeividy</strong>
                <p>descrição do repositório</p>
            </div>
        </header>
        <ul>
            <li>
                <strong>1888</strong>
                <span>Stars</span>
            </li>
            <li>
                <strong>48</strong>
                <span>Forks</span>
            </li>
            <li>
                <strong>67</strong>
                <span>Issues Abertas</span>
            </li>
        </ul>
    </RepositoryInfo>

    <Issues>
        <Link  to="lm,fdlam,flçã">

            <div>
                <strong>nlknlkds</strong>
                <p>dfanjadslk f</p>
            </div>
        <FiChevronRight size={20}/>
        </Link>
    </Issues>
    </>
)
};

export default Repository;
