import React from 'react';
import { Row, Card, CardBody } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import moment from 'moment/min/moment-with-locales'

moment.locale('pt-BR');

function AllDataDashboard({info, title, icon, color }) {

    return (
        <Row>
            <Colxx xxs="12" className="mb-4">
                <Card className={"dashboard-small-chart"}>
                    <p className="box-subtitle">{title}</p>
                    <CardBody className="d-flex align-items-center justify-content-between">
                        <span className="box-title">{info}</span>
                        <i className={icon} style={{color: color ? color : "#4079bb", fontSize: 22, marginTop: 15,}}></i>
                    </CardBody>
                </Card>
            </Colxx>
        </Row>
  );
}
export default AllDataDashboard;