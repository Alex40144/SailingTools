type ResultsDataType = {
  [key: string]: any;
  id: number;
  Helm: string;
  Crew: string;
  Class: BoatDataType;
  BoatNumber: string;
  Time: string;
  CorrectedTime: number;
  Laps: number;
  Position: number;
};

type BoatDataType = {
  Name: string;
  Crew: number;
  PY: number;
};
