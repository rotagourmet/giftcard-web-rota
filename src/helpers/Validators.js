// eslint-disable-next-line
import { cpf, cnpj } from 'cpf-cnpj-validator';
import FieldsValidation from './FieldsValidation';

const Validators = {
    register: (form) => {
        let { name, email, phone } = form;

        if (name) {
            name = name.trim();
            name = name.split(' ');
        }
        if (cpf) {
            cpf = cpf.trim();
        }
        if (phone) {
            phone = phone.trim();
        }
        if (name && name.length > 1 && name[0].length > 1 && email && FieldsValidation.validEmail(email)  && phone && phone.length === 11) {
            return { error: false }
        } else if (!name || name.length <= 1 || name[0].length <= 1) {
            return { error:true, message: "Nome completo é um campo obrigatório", campo: "Cpf"}
        } else if (!email) {
            return { error:true, message: "E-mail é um campo obrigatório", campo: "Cpf"}
        } else if (!FieldsValidation.validEmail(email)) {
            return { error:true, message: "O E-mail inserido não é válido. Tente novamente", campo: "Cpf"}
        } else if (!phone || phone.length < 11) {
            return { error:true, message: "Campo Celular é um campo obrigatório. Digite um Celular válido.", campo: "Celular"}
        }
    },
    
    update: (form) => {
        let { name, email, cpf, phone, zipcode, state, city, district, street, number } = form;

        if (name) {
            name = name.trim();
            name = name.split(' ');
        }
        if (cpf) {
            cpf = cpf.trim();
        }
        if (email) {
            email = email.trim();
        }
        if (phone) {
            phone = phone.trim();
        }
        if (zipcode) {
            zipcode = zipcode.trim();
        }
        if (state) {
            state = state.trim();
        }
        if (city) {
            city = city.trim();
        }
        if (district) {
            district = district.trim();
        }
        if (street) {
            street = street.trim();
        }
        if (name && name.length > 1 && name[0].length > 1 && email && FieldsValidation.validEmail(email) && cpf && (FieldsValidation.isValidCPF(cpf) || cnpj.isValid(cpf)) && phone && phone.length === 11 &&
            zipcode && zipcode.length === 8 && street && number && district && city && state && state.length === 2) {
            return { error: false }
        } else if (!name || name.length <= 1 || name[0].length <= 1) {
            return { error:true, message: "Nome completo é um campo obrigatório", campo: "nameField"}
        } else if (!email) {
            return { error:true, message: "E-mail é um campo obrigatório", campo: "emailField"}
        } else if (!FieldsValidation.validEmail(email)) {
            return { error:true, message: "O E-mail inserido não é válido. Tente novamente", campo: "emailField"}
        } else if (!cpf && (!FieldsValidation.cpf(cpf) && !cnpj.isValid(cpf))) {
            return { error:true, message: "O CPF/CNPJ inserido não é válido. Tente novamente", campo: "cpfField"}
        } else if (!phone || phone.length < 11) {
            return { error:true, message: "Campo Celular é um campo obrigatório. Digite um Celular válido.", campo: "phoneField"}
        } else if (!zipcode || zipcode.length < 8) {
            return { error:true, message: "O CEP inserido é inválido", campo: "zipcodeField"}
        } else if (!street) {
            return { error:true, message: "Insira um endereço válido.", campo: "streetField"}
        } else if (!number) {
            return { error:true, message: "Insira um número válido.", campo: "numberField"}
        } else if (!district) {
            return { error:true, message: "Insira um bairro válido.", campo: "districtField"}
        } else if (!city) {
            return { error:true, message: "Insira uma cidade válida.", campo: "cityField"}
        } else if (!state || state.length < 2) {
            return { error:true, message: "A UF inserida é inválida, preencha corretamente.", campo: "stateField"}
        }        
    },
}

export { Validators };