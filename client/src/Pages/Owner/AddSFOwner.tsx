import { type FC, useState, type BaseSyntheticEvent, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { GiSoccerField } from 'react-icons/gi';
import { GrGroup } from 'react-icons/gr';
import { MdTitle } from 'react-icons/md';

import Input from '../../Components/inputs/Input';
import Select from '../../Components/inputs/Select';
import Layout from '../../Components/layout/Layout';
import PrimaryButton from '../../Components/PrimaryButton';
import { OwnerAddSFQuery, OwnerEditSFQuery } from '../../Functions/OwnerQuery';
import { getSportDetail } from '../../Functions/SportFieldsQuery';
import { AppUser, type appSport } from '../../types/App.type';
import { inputData, objectProp, validationInputs } from '../../utils/validationInputs';
import { modifyObj } from '../../utils/modifyObj';
import { PostFile } from '../../Functions/FileQuery';

interface Props {
  edit?: boolean;
}

interface stateType {
  [key: string]: inputData;
  name: inputData;
  fieldType: inputData;
  sport: inputData;
  dimensions: inputData;
  capacity: inputData;
}

const AddSFOwner: FC<Props> = ({ edit = false }) => {
  const { id = '' } = useParams();

  const defaultState: stateType = {
    name: { value: '', validation: true },
    fieldType: { value: '', validation: true, select: true },
    sport: { value: '', validation: true, select: true },
    dimensions: { value: '', validation: true, select: true },
    capacity: { value: '', validation: true, select: true },
  };
  const [state, setState] = useState<stateType | objectProp>(defaultState);

  const [image, setImage] = useState('');
  const [file, setFile] = useState<null | File>(null);
  const handleFile = (e: BaseSyntheticEvent) => setFile(e.target.files[0]);

  const userInfo = useSelector((state: AppUser) => state.user.user);
  const sportInfo = useSelector((state: appSport) => state.sport.sport);
  const sportNames = sportInfo?.map((item) => item.name);
  const sportFields = sportInfo?.find((item) => item.name === state.sport.value);

  const handleChange = (event: BaseSyntheticEvent) => {
    setState((prev) => {
      const target = event.target;
      const name = target.name;
      return {
        ...prev,
        [name]: { ...state[name], value: target.value },
      };
    });
  };

  const handleSubmit = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const { newState, pass } = validationInputs({ ...state }, 5);
    setState(newState);
    if (!pass) return;

    const body = {
      ...state,
    };

    const newObj = modifyObj({ ...body });

    if (!file && !userInfo.image) throw new Error(`Error: file es null y no hay imagen guardada`);
    const image = file ? await PostFile(file) : userInfo.image;
    console.log(image);
    if (!image) throw new Error('No se pudo guardar la imagen');

    if (edit) {
      OwnerEditSFQuery(newObj, id).catch((err) => console.log(err));
      return;
    }

    OwnerAddSFQuery(newObj)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setImage(userInfo?.image ?? '');

    if (edit) {
      getSportDetail(id)
        .then((sportField) => {
          if (!sportField) {
            console.log('Not found');
            return;
          }
          const { name, fieldType, sport, dimensions, capacity } = sportField;
          setState({
            name: { value: name, validation: true },
            fieldType: { value: fieldType, validation: true },
            sport: { value: sport.name, validation: true },
            dimensions: { value: dimensions, validation: true },
            capacity: { value: `${capacity}`, validation: true },
          });
        })
        .catch(console.error);
    }
  }, [userInfo]);

  return (
    <Layout title="Agregar cancha">
      <form onSubmit={handleSubmit} className="relative min-h-[100vh] flex flex-col items-center">
        <input type="file" hidden id="ownerFiles" onChange={handleFile} />
        <label
          style={{
            backgroundImage: `url(${image})`,
          }}
          htmlFor="ownerFiles"
          className="bg-[#D9D9D9] rounded-lg w-10/12 cursor-pointer my-[70px] relative h-[225px] lg:h-[400px] lg:w-[600px] text-center "
        ></label>
        <div className="flex flex-col w-full items-center gap-10 lg:w-[700px]">
          <Input
            type="text"
            label="Nombre"
            icon={<MdTitle />}
            handleChange={handleChange}
            value={state.name.value}
            name={'name'}
            validation={state.name.validation}
          />
          <Select
            array={sportNames}
            label="Deporte"
            value={state.sport.value}
            handleClick={(option) =>
              setState((prev) => ({ ...prev, sport: { value: option, validation: true } }))
            }
            icon={<GiSoccerField />}
            anyOption={false}
            validation={state.sport.validation}
          />
          <Select
            array={sportFields?.types ?? []}
            label="Tipo de Cancha"
            value={state.fieldType.value}
            handleClick={(option) =>
              setState((prev) => ({ ...prev, fieldType: { value: option, validation: true } }))
            }
            anyOption={false}
            icon={<GiSoccerField />}
            validation={state.fieldType.validation}
          />
          <Input
            type="text"
            label="Dimensiones"
            icon={<GrGroup />}
            value={state.dimensions.value}
            handleChange={handleChange}
            name={'dimensions'}
            validation={state.dimensions.validation}
          />
          <Input
            type="number"
            label="Capacidad"
            icon={<GrGroup />}
            value={state.capacity.value}
            handleChange={handleChange}
            name={'capacity'}
            validation={state.capacity.validation}
          />
        </div>
        <div className="flex justify-end w-full px-20">
          <PrimaryButton text={edit ? 'GUARDAR' : 'CREAR'} />
        </div>
      </form>
    </Layout>
  );
};

export default AddSFOwner;
