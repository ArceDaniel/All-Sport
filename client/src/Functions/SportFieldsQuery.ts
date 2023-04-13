import { searchType } from '../types/Search.type';
import { type sportData } from '../types/Sport.type';
import { ISportField } from '../types/SportField.type';

import axios from './axios';

export async function getSportFieldsWithSport(data: searchType) {
  const { rHour, date, sport, lat, lng } = data;
  try {
    const { data }: { data: sportData[] } =
      await axios.get(`/sportfields/search?lat=${lat}&lng=${lng}&rHour=${rHour}&date=${date}&sport=${sport}
    `);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getSportDetail(id: string) {
  try {
    const { data }: { data: sportData } = await axios.get(`/sportfields/${id}`);
    return data;
  } catch (error) {
    console.error(error);
  }
}

interface hoursType {
  end_hour: string;
  id: string;
  start_hour: string;
}

export async function getSportAvailability(id: string, token: string) {
  try {
    const { data }: { data: hoursType[] } = await axios.get(`/sportfields/${id}/availability`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function getOwnerSportFields() {
  try {
    const { data } = await axios.get<ISportField[]>('/sportfields/');
    return data;
  } catch (e) {
    console.error(e);
  }
}
