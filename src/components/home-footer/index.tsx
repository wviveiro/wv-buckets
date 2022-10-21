import { faHouse, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, useMatch } from "react-router-dom";
import { IconButton } from "../buttons/icon-button";
import { FooterComponent } from "../footer-component";
import { LinkWithActiveProps } from "./types";

export const HomeFooter: React.FC = () => {
  return (
    <FooterComponent>
      <LinkWithActive to="/" icon={faHouse} />
      <LinkWithActive to="/new" icon={faPlus} />
    </FooterComponent>
  );
};

const LinkWithActive: React.FC<LinkWithActiveProps> = ({ to, icon }) => {
  const isActive = useMatch(to);

  return (
    <Link to={to}>
      <IconButton active={!!isActive}>
        <FontAwesomeIcon icon={icon} />
      </IconButton>
    </Link>
  );
};
