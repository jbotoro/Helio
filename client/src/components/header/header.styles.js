import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { ReactComponent as SearchSVG } from '../../assets/search.svg'

export const HeaderContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const SearchLogo = styled(SearchSVG)`
  width: 14px;
  height: 14px;
  display:flex;
  justify-content: center;
`

export const SearchContainer = styled(Link)`
  width: 45px;
  height: 45px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

SearchContainer.displayName = 'SearchContainer';

export const LogoContainer = styled(Link)`
  height: 100%;
  width: 70px;
  padding: 25px;

  .logo {
    height: 60px;
    width: 60px;
  }
`;

export const OptionsContainer = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const OptionLink = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;

