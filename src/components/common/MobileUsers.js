import React from 'react';
import { Row, Card, CardBody } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import moment from 'moment/min/moment-with-locales';
import { BarChart } from "../../components/charts";


moment.locale('pt-BR');

function MobileUsers({ day, mobileUser}) {
    const barChartData = {
        // labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
            label: 'Android',
            borderColor: "#65a300",
            backgroundColor: "#ecffcc",
            data: [mobileUser.android && mobileUser.android.length],
            borderWidth: 2
            },
            {
            label: 'Apple',
            borderColor: "#17c9b2",
            backgroundColor: "#d0fff9",
            data: [mobileUser.ios && mobileUser.ios.length],
            borderWidth: 2
            }
        ]
    }

    return (
        <Row className="h-100">
            <Colxx xxs="12" className="mb-4 h-100">
                <Card className={"dashboard-small-chart"} style={{height: "93%"}}>
                    <p style={{position: "absolute", top: "5%", right: "5%", color: "grey"}}>Usuários por plataforma</p>
                    <CardBody className="d-flex flex-column align-items-center justify-content-between mt-4">
                        <div className="chart-container">
                            <BarChart shadow data={barChartData} />
                        </div>
                    </CardBody>
                </Card>
            </Colxx>
        </Row>
  );
}
export default MobileUsers;