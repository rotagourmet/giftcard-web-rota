import React from 'react';
import { Row, Card, CardBody } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import moment from 'moment/min/moment-with-locales'

moment.locale('pt-BR');

function VouchersUsers({itemClass="dashboard-small-chart", day, vouchers}) {

    function calculaNumero(){
        let dayEscolhido;
        if (day === "hoje") {
            dayEscolhido = moment().subtract(1, "days");
        }else{
            day = Number(day);
            dayEscolhido = moment().subtract(day, "days");
        }
        dayEscolhido = moment().subtract(day, "days");
        let newArray = vouchers.filter(res => moment(res.createdAt) >= dayEscolhido)
        return newArray.length
    }

    return (
        <Row>
            <Colxx xxs="12" className="mb-4">
                <Card className={itemClass}>
                    <p style={{position: "absolute", top: "10%", right: "5%", color: "grey"}}>Nº Vouchers utilizados</p>
                    <CardBody className="d-flex align-items-center justify-content-between">
                        <span style={{fontSize: 28, paddingTop: 15, fontWeight: "700"}} >{calculaNumero()}</span>
                        <i className="iconsminds-qr-code" style={{color: "#65a300", fontSize: 20, marginTop: 15,}}></i>
                    </CardBody>
                </Card>
            </Colxx>
        </Row>
  );
}
export default VouchersUsers;