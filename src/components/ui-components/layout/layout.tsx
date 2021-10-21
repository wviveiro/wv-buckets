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
          <i className="fas fa-bars" />
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
              <i className="fas fa-caret-left" />
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
          </ul>
        </div>
      </div>
    </LayoutContainer>
  );
};
