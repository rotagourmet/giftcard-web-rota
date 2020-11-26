import React from 'react';
import { Row, Card, CardBody } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import moment from 'moment/min/moment-with-locales'

moment.locale('pt-BR');

function TransactionsData({itemClass="dashboard-small-chart", day, transactions}) {

    function calculaVolume(){
        let dayEscolhido;
        if (day === "hoje") {
            dayEscolhido = moment().subtract(1, "days");
        }else{
            day = Number(day);
            dayEscolhido = moment().subtract(day, "days");
        }
        dayEscolhido = moment().subtract(day, "days");
        let valor = 0;
        transactions.map(res => {
            if (moment(res.createdAt) >= dayEscolhido && res.Method === "CreditCard" ) {
                valor = valor + res.Amount;
            }
            return null;
        })
        valor = valor/10;
        return valor.toLocaleString("pt-BR", {style: 'currency', currency: 'BRL'});
    }

    return (
        <Row>
            <Colxx xxs="12" className="mb-4">
                <Card className={itemClass}>
                    <p style={{position: "absolute", top: "10%", right: "5%", color: "grey"}}>Volume transacionado</p>
                    <CardBody className="d-flex align-items-center justify-content-between">
                        <span style={{fontSize: 28, paddingTop: 15, fontWeight: "700"}} >{calculaVolume()}</span>
                        <i className="iconsminds-double-circle" style={{color: "#4079bb", fontSize: 22, marginTop: 15,}}></i>
                    </CardBody>
                </Card>
            </Colxx>
        </Row>
  );
}
export default TransactionsData;