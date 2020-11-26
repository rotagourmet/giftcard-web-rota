import React from 'react';
import { Row, Card, CardBody } from "reactstrap";
import { Colxx } from "../../components/common/CustomBootstrap";
import moment from 'moment/min/moment-with-locales'
import {DoughnutChart} from "../../components/charts"
moment.locale('pt-BR');

function TransactionsData({ day, transactions}) {
    
    function calculaGraph(){
        let graph = {
            labels: ['Cartão de Crédito', 'Boleto'],
            datasets: [
                {
                label: 'Método de pagamento',
                borderColor: ["#ffbc00", "#6eadf1"],
                backgroundColor: [
                    "#ffecb8",
                    "#d0ddec",
                ],
                borderWidth: 2,
                data: calculaMethod()
                }
            ]
        };
        return graph
    }
    

    function calculaMethod(){
        let dayEscolhido;
        if (day === "hoje") {
            dayEscolhido = moment().subtract(1, "days");
        }else{
            day = Number(day);
            dayEscolhido = moment().subtract(day, "days");
        }
        dayEscolhido = moment().subtract(day, "days");
        let cartao = 0;
        let boleto = 0;
        transactions.map(res => {
            if (moment(res.createdAt) >= dayEscolhido && res.Method === "CreditCard" ) {
                cartao = cartao + 1;
            }else if(moment(res.createdAt) >= dayEscolhido && res.Method === "Boleto" ){
                boleto = boleto + 1;
            }
            return null;
        })
        return [cartao, boleto]
    }

    return (
        <Row className="h-100">
            <Colxx xxs="12" className="mb-4 h-100">
                <Card className={"dashboard-small-chart"} style={{height: "93%"}}>
                    <CardBody className="d-flex align-items-center justify-content-between">
                    <div className="dashboard-donut-chart">
                        <DoughnutChart shadow data={calculaGraph} />
                    </div>
                    </CardBody>
                </Card>
            </Colxx>
        </Row>
  );
}
export default TransactionsData;