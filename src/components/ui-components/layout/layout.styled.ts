import styled from 'styled-components/macro';

export const LayoutContainer = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.textWhite};

  & > .layout-header {
    position: fixed;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 10px;

    & > .menu-button {
      color: ${(props) => props.theme.colors.textWhite};
      font-size: 1.3em;
    }
  }

  & > .slide-right-menu {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: var(--bs-gray-dark);
    padding: ${(props) => props.theme.device.padding};
    width: 100%;
    transition: right 0.5s;

    & > .slide-header {
      height: 50px;
      display: flex;
      align-items: center;
      padding: 0 10px;

      & > .right-side {
        & > .button-close-slide {
          color: ${(props) => props.theme.colors.textWhite};
          font-size: 1.3em;
        }
      }

      & > .center-side {
        flex-grow: 1;
        text-align: center;
      }
    }

    & > .slide-content {
      & > ul {
        list-style: none;
        padding: 0;

        & > li {
          padding: 10px 5px;
        }
      }
    }
  }
`;
