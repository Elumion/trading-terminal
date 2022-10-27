import { Link } from 'react-router-dom';
import { ReloadBtn } from './ReloadBtn';
import {
    Header,
    BtnLink,
    Navigation,
    HeaderOuterContainer,
    AddExchangeBtn,
    SelectContainer,
    LayoutContainer,
} from './Layout.styles';
import { SelectExchange } from './SelectEcxhange';
import { TopBar } from '../TopBar';

interface Props {
    children: JSX.Element;
}

const Layout = ({ children }: Props) => {
    return (
        <LayoutContainer>
            <TopBar />
            <Header>
                <HeaderOuterContainer>
                    <Navigation>
                        <BtnLink>
                            <Link to={'/exchanges'}>Exchanges</Link>
                        </BtnLink>
                        <BtnLink>
                            <Link to={'/terminal'}>Terminal</Link>
                        </BtnLink>
                        <BtnLink>
                            <Link to={'/balances'}>Balances</Link>
                        </BtnLink>
                    </Navigation>
                    <SelectContainer>
                        <SelectExchange />
                        <AddExchangeBtn>
                            <Link to={'/addExchange'}>Add</Link>
                        </AddExchangeBtn>
                    </SelectContainer>
                </HeaderOuterContainer>
                <ReloadBtn />
            </Header>
            <div>{children}</div>
        </LayoutContainer>
    );
};

export default Layout;
