import React, { useState } from 'react';
import classNames from 'classnames';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { AddRow } from '../../components/add-row';
import { modalRow } from '../../components/add-row/add-row.hook';
import { LayoutContainer } from './layout.styled';
import { handleSignout } from '../../components/settings';

export const Layout: React.FC = ({ children }) => {
  const [expanded, setExpanded] = useState(false);

  const onAddRows = () => {
    modalRow.open();
    setExpanded(false);
  };

  return (
    <LayoutContainer className={classNames('wv-bucket-layout-container')}>
      <Navbar bg="primary" variant="dark" expand="lg" expanded={expanded}>
        <Container>
          <Navbar.Brand>WV Bucket</Navbar.Brand>
          <Navbar.Toggle onClick={() => setExpanded(!expanded)} />
          <Navbar.Collapse>
            <Nav>
              <Link
                to="/"
                className={classNames('layout-menu-buttons', 'nav-link')}
                onClick={() => setExpanded(false)}
              >
                Buckets
              </Link>
              <Link
                className={classNames('layout-menu-buttons', 'nav-link')}
                to="/settings"
                onClick={() => setExpanded(false)}
              >
                Settings
              </Link>
              <button
                className={classNames('layout-menu-buttons', 'nav-link')}
                onClick={onAddRows}
              >
                Add Rows
              </button>
              <Link
                className={classNames('layout-menu-buttons', 'nav-link')}
                to="/accounts"
                onClick={() => setExpanded(false)}
              >
                Accounts
              </Link>
              <Link
                className={classNames('layout-menu-buttons', 'nav-link')}
                to="/account-list"
                onClick={() => setExpanded(false)}
              >
                Account List
              </Link>
              <button
                className={classNames('layout-menu-buttons', 'nav-link')}
                onClick={handleSignout}
              >
                Logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className={classNames('wv-bucket-layout-children')}>{children}</div>
      <AddRow />
    </LayoutContainer>
  );
};
