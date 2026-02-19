import { httpService } from "../http.service";

export const DataSetService = {
  query,
  save,
};

async function query() {
  return httpService.get(`dataSet`);
}

async function save(data) {
    console.log(data);
  await httpService.post(`dataSet`, data);
}

