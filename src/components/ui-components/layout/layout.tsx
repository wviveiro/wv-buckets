import { faBars, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useLayoutState } from './layout.hook';
import { LayoutContainer } from './layout.styled';

export const Layout: React.FC = (props) => {
  const { children } = props;
  const { state, toggleSideMenu, onSignout, confirmDeleteSettings } =
    useLayoutState();

  return (
    <LayoutContainer>
      <div className="layout-header">
        <button
          className="menu-button"
          onClick={toggleSideMenu(true)}
          disabled={state.disabled}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
      {children}
      <div
        className="slide-right-menu"
        style={{ right: !state.sideMenu ? `-${state.width}px` : undefined }}
      >
        <div className="slide-header">
          <div className="right-side">
            <button
              className="button-close-slide"
              disabled={state.disabled}
              onClick={toggleSideMenu(false)}
            >
              <FontAwesomeIcon icon={faCaretLeft} />
            </button>
          </div>
          <div className="center-side">WVBuckets</div>
        </div>
        <div className="slide-content">
          <hr />
          <ul>
            <li>
              <button
                className="logout-button text-primary"
                disabled={state.disabled}
                onClick={onSignout}
              >
                <i className="fas fa-sign-out-alt" /> Logout
              </button>
            </li>
            <li>
              <button
                className="delete-settings-button text-danger"
                disabled={state.disabled}
                onClick={confirmDeleteSettings}
              >
                Delete Settings
              </button>
            </li>
            <li>
              <span className="info-versioning">
                version: {process.env.REACT_APP_VERSION}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </LayoutContainer>
  );
};
