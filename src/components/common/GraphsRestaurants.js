import React, {useEffect, useState} from 'react';
import { Row, Card, CardBody } from "reactstrap";

import { Colxx } from "../../components/common/CustomBootstrap";
import  {SmallLineChart}  from "../../components/charts";
import moment from 'moment/min/moment-with-locales'
import { ThemeColors } from '../../helpers/ThemeColors'
import { getApi } from '../../environment/environment'

const server = getApi('url');
const colors = ThemeColors()
moment.locale('pt-BR');

function GraphsRestaurants({itemClass="dashboard-small-chart"}) {


    const [cadastros, setCadastros] = useState([])
    const [assintantes, setAssinantes] = useState([])
    useEffect(() => {
        settingAssinantes();
        settingCadastros();
    },[]);

    function settingLastDays (){
        let hoje = "Hoje"
        
        let ontem = moment().subtract(1, "days").format("dddd");
        let antesdeontem = moment().subtract(2, "days").format("dddd");
        let tresdiasatras = moment().subtract(3, "days").format("dddd");
        let quatrodiasatras = moment().subtract(4, "days").format("dddd");
        let cincodiasatras = moment().subtract(5, "days").format("dddd");
        let seisdiasatras = moment().subtract(6, "days").format("dddd");
        let array = [seisdiasatras, cincodiasatras, quatrodiasatras,tresdiasatras, antesdeontem, ontem, hoje ]
        return array
    }

    async function settingAssinantes (){
        //Requisição de Buscar assinantes
        let response = await fetch(server + `powerbi/subscribers`);
        response = await response.json();
        setAssinantes(response)
    }

    function loadChart1() {
        let form = {
            labels: settingLastDays(),
            datasets: [
                {
                label: 'Novos assinantes',
                borderColor: colors.themeColor1,
                pointBorderColor: colors.themeColor1,
                pointHoverBackgroundColor: colors.themeColor1,
                pointHoverBorderColor: colors.themeColor1,
                pointRadius: 2,
                pointBorderWidth: 3,
                pointHoverRadius: 2,
                fill: false,
                borderWidth: 2,
                data: assintantes,
                datalabels: {
                    align: 'end',
                    anchor: 'end'
                }
                }
            ]
        };
        return form
    }
    async function settingCadastros (){
        //Requisição de Buscar assinantes
        let response = await fetch(server + `powerbi/userscreatedat`);
        response = await response.json();
        setCadastros(response)
    }

    function loadChart2() {
        let form = {
            labels: settingLastDays(),
            datasets: [
                {
                label: 'Novos cadastros',
                borderColor: colors.themeColor1,
                pointBorderColor: colors.themeColor1,
                pointHoverBackgroundColor: colors.themeColor1,
                pointHoverBorderColor: colors.themeColor1,
                pointRadius: 2,
                pointBorderWidth: 3,
                pointHoverRadius: 2,
                fill: false,
                borderWidth: 2,
                data: cadastros,
                datalabels: {
                    align: 'end',
                    anchor: 'end'
                }
                }
            ]
        };
        return form
    }

    return (
        <Row>
            <Colxx xxs="6" className="mb-4">
                <Card className={itemClass}>
                <p style={{position: "absolute", top: "10%", right: "5%", color: "grey"}}>Novos Assinantes</p>
                <CardBody>
                    {assintantes && assintantes.length > 0 ? <SmallLineChart data={loadChart1} /> : <div className="loading" style={{position: 'relative', width: 17, height: 17, marginTop: 10,}}></div>}
                </CardBody>
                </Card>
            </Colxx>
            <Colxx xxs="6" className="mb-4">
                <Card className={itemClass}>
                    <p style={{position: "absolute", top: "10%", right: "5%", color: "grey"}}>Novos Cadastros</p>
                <CardBody>
                    {cadastros && cadastros.length > 0 ? <SmallLineChart data={loadChart2} /> : <div className="loading" style={{position: 'relative', width: 17, height: 17, marginTop: 10,}}></div>}
                </CardBody>
                </Card>
            </Colxx>
        </Row>
  );
}
export default GraphsRestaurants;