export interface ClassRoom {
  id: string;
  name: string;
  session: string;
}

export interface CreateClassPayload {
  name: string;
  session: string;
}

export interface UpdateClassPayload {
  name: string;
  session: string;
}
