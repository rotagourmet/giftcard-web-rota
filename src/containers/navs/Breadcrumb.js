import React, { Fragment } from "react";
import { Breadcrumb } from "reactstrap";
import IntlMessages from "../../helpers/IntlMessages";

const BreadcrumbContainer = ({ heading, match }) => {
  return (
    <Fragment>
      {heading && <h1><IntlMessages id={heading}/></h1>}
      <BreadcrumbItems match={match} />
    </Fragment>
  );
};

export const BreadcrumbItems = ({ match }) => {
  const path = match.path.substr(1);
  let paths = path.split("/");
  if (paths[paths.length - 1].indexOf(":") > -1) {
    paths = paths.filter(x => x.indexOf(":") === -1);
  }
  return (
    <Fragment>
      <Breadcrumb className="pt-0 breadcrumb-container d-none d-sm-block d-lg-inline-block">
      </Breadcrumb>
    </Fragment>
  );
};

export default BreadcrumbContainer;
