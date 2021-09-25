import React from 'react'
import { Title, Image, Form, Repositories } from './styles';
import { FiChevronRight } from 'react-icons/fi'

const Dashboard:React.FC = () => {
return (
    <>
    <Image src="https://xesque.rocketseat.dev/platform/1587379765556-attachment.svg" alt="Github Explorer" />
    <Title>Explore repositórios no Github</Title>
    <Form action="" >
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
    </Form>

    <Repositories>
    <a href="teste">
        <img src="https://avatars.githubusercontent.com/u/89440440?v=4" alt="Deividy Ferreira" />
        <div>
            <strong>Deividy/first-project-react</strong>
            <p>My first project with ReactJs</p>
        </div>
        <FiChevronRight size={20}/>
    </a>
    </Repositories>
    </>
    )
};

export default Dashboard;
