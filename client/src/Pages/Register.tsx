import { type BaseSyntheticEvent, type FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { AiFillEye } from 'react-icons/ai';
import { HiOutlineUser, HiUser } from 'react-icons/hi';
import { IoMdMail } from 'react-icons/io';

import Input from '../Components/Input';
import Layout from '../Components/Layout';
import { registerUser } from '../Functions/userPetition';

const Register: FC = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    // axios
    //   .post("http://localhost:3000/register", {
    //     mail: email,
    //     fullName: `${name} ${lastName}`,
    //     password,
    //     confirmPass,
    //   })
    //   .then((res) => console.log(res))
    //   .catch((error) => console.log(error));
    registerUser({
      email,
      firstName: name,
      lastName,
      password,
    })
      .then(() => {
        navigate(`/inicio`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout title="Registrarse">
      <form onSubmit={handleSubmit} className="flex flex-col w-full items-center">
        <div className="flex flex-col w-full items-center gap-5 py-12">
          <Input type="mail" label="Mail" state={email} setState={setEmail} icon={<IoMdMail />} />
          <Input
            type="text"
            label="Nombre"
            state={name}
            setState={setName}
            icon={<HiOutlineUser />}
          />
          <Input
            type="text"
            label="Apellido"
            state={lastName}
            setState={setLastName}
            icon={<HiUser />}
          />
          <Input
            type="password"
            label="Contraseña"
            state={password}
            setState={setPassword}
            icon={<AiFillEye />}
          />
          <Input
            type="password"
            label="Confirmar contraseña"
            state={confirmPass}
            setState={setConfirmPass}
            icon={<AiFillEye />}
          />
        </div>
        <input
          className="mt-5 w-10/12 py-2 rounded-full font-bold bg-gradient-to-tr from-gradone to-gradtwo"
          type="submit"
          value="REGISTRARSE"
        />
      </form>
    </Layout>
  );
};

export default Register;
