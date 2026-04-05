export type VersionRow = {
  id: string;
  version: string;
  name: string;
  description: string;
  createdAt: string;
};

export type ModelRow = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: boolean;
};

export type CriteriaRow = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

export type SubcriteriaRow = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

export type IndicatorsRow = {
  id: string;
  name: string;
  type: string;
  information_sources: string;
  createdAt: string;
};

export type Fundamental_ElementsRow = {
  id: string;
  name: string;
  satisfactory: string;
  quasi_satisfactory: string;
  somewhat_satisfactory: string;
  deficient: string;
  evidence: string[];
  createdAt: string;
  extra_info?: string;
};

export type FileTableRow = {
  id: string;
  name: string;
  size: string;
  url: string;
  createdAt: string;
  type: string;
  file?: File;
};
