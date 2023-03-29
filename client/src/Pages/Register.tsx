import { BaseSyntheticEvent, FC, useState } from "react";

import axios from "axios";

import Input from "../Components/Input";

const Register: FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000", {
        mail: email,
        fullName: `${name} ${lastName}`,
        password,
        confirmPass,
      })
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <header className="bg-primary flex justify-center shadow-lg">
        <h1 className="text-white text-xl w-10/12 pb-5 pt-10 text-left font-semibold">
          Registrarse
        </h1>
      </header>
      <form onSubmit={handleSubmit} className="flex flex-col w-full items-center">
        <div className="flex flex-col w-full items-center gap-5 py-12">
          <Input type="mail" label="Mail" state={email} setState={setEmail} />
          <Input type="text" label="Nombre" state={name} setState={setName} />
          <Input type="text" label="Apellido" state={lastName} setState={setLastName} />
          <Input type="password" label="Contraseña" state={password} setState={setPassword} />
          <Input
            type="password"
            label="Confirmar contraseña"
            state={confirmPass}
            setState={setConfirmPass}
          />
        </div>
        <input
          className="mt-5 w-10/12 py-2 rounded-full font-bold bg-gradient-to-tr from-gradone to-gradtwo"
          type="submit"
          value="REGISTRARSE"
        />
      </form>
    </div>
  );
};

export default Register;
