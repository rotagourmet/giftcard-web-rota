import React, { useState, useEffect } from "react";
import { useStep } from "react-hooks-helper";

import Names from "./Names";
import Pictures from "./Pictures";
import Contact from "./Contact";
import Review from "./Review";
import Submit from "./Submit";


const steps = [
  { id: "names" },
  { id: "pictures" },
  { id: "contact" },
  { id: "review" },
  { id: "submit" }
];

const MultiStepForm = ({ images, history }) => {
  const [restaurante, setRestaurante] = useState({});
  const [unidade, setUnidade] = useState({});
  const [form, setForm] = useState({
    nomeRestaurante: "",
    cidade: "",
    descricao: "",
    fotoRepresentativa: "",
    logo: "",
    incluidoPor: "",
    status: false
    
  });
  const { step, navigation } = useStep({ initialStep: 0, steps });
  const { id } = step;

  const props = { form, navigation };
  
  useEffect(() => {
    let user = localStorage.getItem("user");
    user = JSON.parse(user)
    setForm(prevState => ({ ...prevState, incluidoPor: user.user._id }));
  }, [])

  function onPress(event) {
    if(event.target && event.target.name && event.target.value){
      let name = `${event.target.name}`
      let value = `${event.target.value}`
      setForm(prevState => ({ ...prevState, [name]: value }));
    }
  }

  function setRestaurant(content){
    setRestaurante(content)
  }

  switch (id) {
    case "names":
      return <Names navigation={navigation} setForm={onPress} formData={form} setRestaurant={setRestaurant} setUnidade={(content) => setUnidade(content)}/>;
    case "pictures":
      return <Pictures setForm={onPress} formData={form} navigation={navigation} history={history} restaurante={restaurante} unidade={unidade} />;
    case "contact":
      return <Contact {...props} />;
    case "review":
      return <Review {...props} />;
    case "submit":
      return <Submit {...props} />;
    default:
      return null;
  }
};

export default MultiStepForm;