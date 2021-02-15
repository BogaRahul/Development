export interface Common {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  image: string;
}

export interface Cast extends Common{
  cast_id: number;
  character: string;
  order: number;
}

export interface Crew extends Common{
  department: string;
  job: string;
}


