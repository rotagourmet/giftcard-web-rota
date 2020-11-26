import React, { Component } from "react";
import { 
	Row, 
	Card, 
	CardTitle, 
	Form, 
	Label, 
	Input, 
	Button,
	Modal,
	ModalBody
} from "reactstrap";

import FieldsValidation from "../helpers/FieldsValidation";
import { NotificationManager } from "../components/common/react-notifications";
import IntlMessages from "../helpers/IntlMessages";
import { Colxx } from "../components/common/CustomBootstrap";
import { getApi } from '../environment/environment'
const server = getApi('url');

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			cupom: "",
			loading: false,
			modal: false,
			modalTitle: "Voucher validado com sucesso",
		};
	}

	componentDidMount(){
		let search = window.location.search.split("=")[1]
        console.log('search', search);
        this.setState({
            cupom: search
        })
	}

  	async emailVerify(){
		let emailValid = FieldsValidation.validEmail(this.state.email);
	  	if (this.state.email && emailValid && this.state.cupom) {
			this.setState({loading: true})
			//Requisição de 
			let response = await fetch(server + `auth/cadastroPorEmail`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({email: this.state.email.trim(), cupom: this.state.cupom.trim()})
			});
			response = await response.json();
			if (response.error) {
				NotificationManager.error(response.message, "ERRO", 5000, null, null, '');
				this.setState({
					loading: false
				})
			}else{
				NotificationManager.success(response.message, "SUCESSO", 5000, null, null, '');
				this.setState({
					loading: false,
					modal: true,
					modalTitle: "Voucher validado com sucesso!",
					modalMessage: "Seu e-mail e Gift card foram ativados. \n Para aproveitar seu plano presente e conhecer todos os restaurantes, faça o download do nosso aplicativo clicando no ícone da loja virtual abaixo compatível com seu celular.\n\nSeja bem vindo e aproveite ao máximo!",
				})
			}
		} else if(!this.state.email || !emailValid) {
			NotificationManager.error("Digite um e-mail válido, por favor.", "ERRO", 5000, null, null, '');
		}else if(!this.state.cupom){
			NotificationManager.error("Digite um cupom válido, por favor.", "ERRO", 5000, null, null, '');
		}
  	}

  	render() {
		return (
			<Row className="h-100">
				<Colxx xxs="12" md="10" className="mx-auto my-auto">
					<Card className="auth-card">
						<div className="position-relative image-side ">
							<p className="text-white h2">SEJA BEM-VINDO</p>
							<p className="white mb-0">
								O seu clube gastronomico que te ajuda a<br/>{" "}
								economizar em dobro.
							</p>
						</div>
						<div className="form-side">
							<img alt="" src="../assets/dourado.png" className="logo-size-custom-register" />
							

							<CardTitle className="mb-4">
								<span>
								Insira seu e-mail e o código do seu GIFT CARD abaixo
								</span>
							</CardTitle>
							<Form>
								<Label className="form-group has-float-label mb-4">
									<Input type="email" defaultValue={this.state.email} onChange={(event) => this.setState({email: event.target.value})} />
									<IntlMessages id="user.email" />
								</Label>
								<Label className="form-group has-float-label mb-4"> 
									<Input className="cupom-field form-control" value={this.state.cupom} onChange={(event) => {
										this.setState({cupom: event.target.value})
									}} />
									<span> Número do seu cupom</span>
								</Label>
								<div className="d-flex justify-content-end align-items-center">
								<Button
									color="primary"
									className={`btn-shadow btn-multiple-state ${this.state.loading ? "show-spinner" : ""}`} 
									size="lg"
									onClick={() => this.emailVerify()}
								>
									<span className="spinner d-inline-block">
										<span className="bounce1" />
										<span className="bounce2" />
										<span className="bounce3" />
									</span>
									<span className="label">VALIDAR VOUCHER</span>
								</Button>
								</div>
							</Form>
						</div>
					</Card>
				</Colxx>
				 <Modal isOpen={this.state.modal} toggle={() => this.setState({modal: false})} centered >
					<ModalBody>
						<div className="d-flex flex-column align-items-center justify-content-center p-2 animate__animated animate__bounce">
						<h5 className="p-4" style={{fontSize: 22,fontWeight: "700", textAlign: "center"}}> {this.state.modalTitle}</h5>
						<p className="text-center pb-3" style={{fontWeight: "300", textAlign: "center"}}> {this.state.modalMessage}</p>

						<p className="text-center " style={{fontWeight: "300"}}> Escolha sua loja virtual</p>
						<div className="d-flex align-items-center justify-content-center mb-5" >
							<div className="cursor-pointer mr-2" onClick={()=> window.open("https://apps.apple.com/br/app/clube-rota-gourmet/id1420293322")} >
								<img alt="apple" className="btn-loja-virtual" src="/assets/payment/applestore.png" />
							</div>
							<div className="cursor-pointer ml-2" onClick={()=> window.open("https://play.google.com/store/apps/details?id=br.com.approtagourmet")} >
								<img alt="google" className="btn-loja-virtual" src="/assets/payment/googleplay.png"/>
							</div>
						</div>

						<Button
							color="primary"
							size="lg" 
							className={`w-80 btn-shadow btn-multiple-state ${this.state.loading ? "show-spinner" : ""}`} 
							onClick={() => this.setState({modal: false})}
						>
							<span className="spinner d-inline-block">
								<span className="bounce1" />
								<span className="bounce2" />
								<span className="bounce3" />
							</span>
							<span className="label">OK</span>
						</Button>{' '}
						</div>
					</ModalBody>
					</Modal>
			</Row>
		);
	}
}