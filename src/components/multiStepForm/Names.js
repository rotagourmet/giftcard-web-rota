import React, { useState, useEffect } from "react";
import { Row, Label, Button, Input } from "reactstrap";

import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import { NotificationManager } from "../../components/common/react-notifications";
import { getApi } from '../../environment/environment'

const server = getApi('url');

const Names = ({navigation, setForm, formData, setRestaurant, setUnidade}) => {
  
  const [cidades, setCidades] = useState([]);
  const { next } = navigation;

  useEffect(() => {
    listCidades()
  }, [])

  const listCidades = async () => {
    //Requisição de Listar Cidades
    let response = await fetch(server + `admin/listCidades`);
    response = await response.json();
    if (response.error) {
        setCidades([])
    } else {
        setCidades(response.cidades)
    }
  }

  async function create() {
    //Requisição de dados básicos do Restaurante
    let response = await fetch(server + `restaurants/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    response = await response.json();
    console.log('response', response)
    if (response.error) {
      NotificationManager.error( response.message, "ERRO", 5000, null, '', '');
    } else {
      NotificationManager.success( "Sucesso em realizar pré-cadastro do restaurante.", "Sucesso", 5000, null, '', '');
      setRestaurant(response.restaurante)
      setUnidade(response.unidade)
      next();  
    }
    
  }

  return (
    <>
      {cidades && cidades.length > 0?
        <Row className="justify-content-center">
          <Colxx xxs="12" md="8">
            <Row className="justify-content-center">
              <Colxx xxs="12" className="text-center mb-4" >
                <img alt="Vetor de restaurante" src="/assets/restaurantes/5284-01.png" style={{height: 140}} />
                <h2 className="text-center mb-2" >Adicionar um Restaurante - Passo 01</h2> 
                <p className="text-center mb-4 font-weight-thin" style={{fontWeight: "300"}} >Digite abaixo os dados para iniciar o cadastro de um novo restaurante e uma nova unidade</p> 
                <Separator className="mb-3 mx-0" />
              </Colxx>
              <Colxx xxs="12" md="12" className="mx-auto my-auto">                    
                  <Label className="form-group has-float-label mb-4">
                      <input name="nomeRestaurante" className="form-control" value={formData.nomeRestaurante} onChange={setForm} />
                      <span>Nome do Restaurante</span>
                  </Label>
              </Colxx>
              <Colxx xxs="12" md="12" className="mx-auto my-auto">                    
                <Label className="form-group has-float-label mb-4">
                    <Input type="select" name="cidade" className="form-control" value={formData.cidade} onChange={setForm}>
                      <option value={null}>Clique para selecionar</option>
                    {cidades && cidades.length > 0 && cidades.map((item, index) => {
                      return (<option key={index} value={item._id}>{item.municipio}</option>)
                    })}
                    </Input>
                    <span>Selecione a cidade</span>
                </Label>
              </Colxx>
              <Colxx xxs="12" md="12" className="mx-auto my-auto">                    
                  <Label className="form-group has-float-label mb-4">
                      <input name="descricao" className="form-control" value={formData.descricao} onChange={setForm} />
                      <span>Descrição do restaurante</span>
                  </Label>
              </Colxx>
              <div>
                <Button 
                color="primary" 
                size="lg" 
                onClick={create}>PRÓXIMO</Button>
              </div>
            </Row>
          </Colxx>
        </Row>
      : null }
    </>
  );
};

export default Names;