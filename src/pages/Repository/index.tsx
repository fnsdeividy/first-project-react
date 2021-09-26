import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom'
import { Header, RepositoryInfo, Issues, Image } from './styles';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import api from '../../services/api'

interface RepositoryParams {
    repository: string;

}


interface Repos {
    full_name: string;
    description:string;
    stargazers_count: number;
    forks_count:number;
    open_issues_count: number;
    owner: {
        login: string;
        avatar_url:string;
    };

}

interface Issue {
    id: number;
    title: string;
    html_url:string;
    user:{
        login:string;
    }
}


const Repository:React.FC = () => {
    const [repository, setRepository] = useState<Repos | null >(null)
    const [issues, setIssues] = useState<Issue[]>([])

    const { params } = useRouteMatch<RepositoryParams>();

    useEffect(() => {


 api.get(`repos/${params.repository}`).then(res => {
            setRepository(res.data);
        });

        api.get(`repos/${params.repository}/issues`).then(res => {
            setIssues(res.data)
        })
    },   [params.repository])




return (
    <>
    <Header>
        <Image src="https://xesque.rocketseat.dev/platform/1587379765556-attachment.svg" alt="Github Explorer" />
        <Link to="/">
        <FiChevronLeft size={16} />
        Voltar
        </Link>
    </Header>

    { repository && (
        <RepositoryInfo>
        <header>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
                <strong>{repository.full_name}</strong>
                <p>{repository.description}</p>
            </div>
        </header>
        <ul>
            <li>
                <strong>{repository.stargazers_count}</strong>
                <span>Stars</span>
            </li>
            <li>
                <strong>{repository.forks_count}</strong>
                <span>Forks</span>
            </li>
            <li>
                <strong>{repository.open_issues_count}</strong>
                <span>Issues Abertas</span>
            </li>
        </ul>
    </RepositoryInfo>
    ) }

    <Issues>
        {issues.map(issue => (
            <a key={issue.id} href={issue.html_url} target="_blank">
                <div>
                    <strong>{issue.title}</strong>
                    <p>{issue.user.login}</p>
                </div>
                <FiChevronRight size={20}/>
            </a>
        ))}
    </Issues>
    </>
)
};

export default Repository;
