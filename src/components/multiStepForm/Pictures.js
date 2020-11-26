import React, { useState } from "react";
import { Row, Button, Card } from "reactstrap";
import S3FileUpload from 'react-s3';

import { Colxx, Separator } from "../../components/common/CustomBootstrap";
import imageCompression from 'browser-image-compression';
import { NotificationManager } from "../../components/common/react-notifications";
import { getApi } from '../../environment/environment'
const server = getApi('url');

const Pictures = ({ setForm, formData, navigation, history, restaurante, unidade}) => {
  const [loading_rep, setLoading_rep] = useState(false);
  const [loading_pic, setLoading_pic] = useState(false);
  const [logo, setLogo] = useState("");
  const [foto, setFoto] = useState("");
  const { previous } = navigation;

  function onChangeHandler (event, pasta, identificador) {
    const imageFile = event.target.files[0];
    let config = {
        bucketName: 'file-upload-rota',
        dirName: pasta, /* optional */
        region: 'us-east-1',
        accessKeyId: 'AKIAILS5OOOPOL7FLWMQ',
        secretAccessKey: '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',
    }

    S3FileUpload
    .uploadFile(imageFile, config)
    .then(async data => {
        //Requisição de 
        let response = await fetch(server + `restaurants/updatePicture`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data, 
            _id: restaurante._id,
            identificador: identificador
          })
        });
        response = await response.json()
        if (response.error) {
            NotificationManager.warning( "Problemas em realizar upload da foto solicitada. Tente novamente.", "Erro", 5000, null, '', '');
        } else {
            if (identificador === "_logo") {
              setLogo(response.restaurant.logo);
            } else {
              setFoto(response.restaurant.fotoRepresentativa)
            }
            NotificationManager.success( "Sucesso em realizar upload da foto solicitada.", "Sucesso", 5000, null, '', '');
        }
        setLoading_pic(false);
        setLoading_rep(false);
    })
    .catch(err => {
      setLoading_pic(false);
      setLoading_rep(false);
    })
  }

  async function handleImageUpload(event, pasta, index) {
 
    const imageFile = event.target.files[0];
    
    const options = {
        maxSizeMB: .3,
        maxWidthOrHeight: 1920,
        useWebWorker: true
    }
    try {
        const compressedFile = await imageCompression(imageFile, options);
        await onChangeHandlerLogo(compressedFile, pasta, index); // write your own logic
    } catch (error) {
        console.log(error);
    }   
  }

  function onChangeHandlerLogo (file, pasta, identificador) {
        
    let config = {
      bucketName: 'file-upload-rota',
      dirName: pasta, /* optional */
      region: 'us-east-1',
      accessKeyId: 'AKIAILS5OOOPOL7FLWMQ',
      secretAccessKey: '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',
    }

    S3FileUpload
    .uploadFile(file, config)
    .then(async data => {
        //Requisição de 
      let response = await fetch(server + `restaurants/updatePicture`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data, 
            _id: restaurante._id,
            identificador: identificador
          })
      });
      response = await response.json()
      console.log('response', response);

      if (response.error) {
        NotificationManager.warning( "Tivemos problemas em realizar upload da foto solicitada. Tente novamente.", "Erro", 5000, null, '', '');
      } else {
        if (identificador === "_logo") {
          setLogo(response.restaurant.logo);
        } else {
          setFoto(response.restaurant.fotoRepresentativa)
        }
        NotificationManager.success( "Sucesso em realizar upload da foto solicitada.", "Sucesso", 5000, null, '', '');
      }
        setLoading_pic(false);
        setLoading_rep(false);
    })
    .catch(err => {
      setLoading_pic(false);
      setLoading_rep(false);
    })
  }

  return (
    <>
        <Row className="justify-content-center">
          <Colxx xxs="12" md="8">
            <Row className="justify-content-center">
            <Colxx xxs="12" className="text-center mb-4" >
                <h2 className="text-center mb-2" >Adicionar um Restaurante - Passo 02</h2> 
                <p className="text-center mb-4 font-weight-thin" style={{fontWeight: "300"}} >Para continuar o processo faça upload da foto representativa e da logo do restaurante abaixo.</p> 
                <Separator className="mb-3 mx-0" />
              </Colxx>
              <Colxx xxs="12" md="12" className="mx-auto my-auto mb-5">
                <Card className="rounded">
                  {loading_rep ? 
                    <div style={{ borderRadius: 10, cursor: 'pointer', margin: 0, backgroundColor: 'grey'}}>
                        <div className="loading" style={{position: 'absolute', width: 20, height: 20, zIndex: 10, bottom: 30, left: "48%"}}></div> 
                        <div style={{opacity: 0.5, height: 210, backgroundColor: 'grey' }} className="social-header card-img"/>
                    </div>
                  :
                    <label htmlFor="fotoRepresentativa" className="cursor" 
                      style={{backgroundColor: 'black', borderRadius: 20, cursor: 'pointer', margin: 0}}>
                      <input id="fotoRepresentativa" type="file" name="img_input" 
                      onChange={(event) => {setLoading_rep(true); onChangeHandler(event, "representacao", "_representacao")} }/>
                      <img src={foto ? foto : '/assets/img/thumb.jpg'} alt="thumbnail" 
                      style={{opacity: 0.5, height: 210, borderTopRightRadius: 20, borderTopLeftRadius: 20}} 
                      className="social-header card-img"/>
                    </label>
                  }
                </Card>
              </Colxx>
              <Colxx xxs="12" md="12" className="mx-auto my-auto mb-5">
                {loading_pic ? 
                    <div>
                      <div className="loading" style={{position: 'relative', width: 20, height: 20, zIndex: 10, bottom: 30, left: "48.8%"}}></div> 
                      <div style={{backgroundColor: 'grey', height: 110, width:110}} className="img-thumbnail card-img social-profile-img custom-shadow"/>
                    </div>
                :
                    <label htmlFor="logo-pic" className="cursor" style={{cursor: 'pointer', margin: 0}}>
                      <img src={logo ? logo : '/assets/icons/camera.png'} alt="thumbnail" className="img-thumbnail card-img social-profile-img custom-shadow"/>
                      <input id="logo-pic" type="file" onChange={(event) => {setLoading_pic(true); handleImageUpload(event, "logo", "_logo")}} />
                      {/* <input id="logo-pic" type="file" name="img_input" value="" onChange={(e) => this.handleChange(e.target.files)}/> */}
                    </label>
                }
              </Colxx>
              <Colxx xxs="12" md="12" className="mx-auto my-auto mb-5 text-center">
                <h1 className="text-center mt-3">{formData.nomeRestaurante}</h1>
              </Colxx>
              
              <Colxx xxs="12" md="12" className="mx-auto my-auto mb-5 text-center">
                <Button 
                color="secondary" 
                size="lg" 
                onClick={previous}>ANTERIOR</Button>
                <Button 
                color="primary" 
                size="lg" 
                style={{marginLeft: 20}}
                onClick={() => {history.push(`/app/unidade/${unidade.nomeUnidade}`, {unidade})}}>CRIAR RESTAURANTE</Button>
              </Colxx>
            </Row>
          </Colxx>
        </Row>
    </>
  );
};

export default Pictures;



