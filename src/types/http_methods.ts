export interface FetchGetHook {
  isLoading: boolean;
  error: Error | null;
  data: any;
  getData: (url: string) => Promise<void>;
}

export interface FetchPutHook {
  isLoading: boolean;
  error: Error | null;
  data: any;
  putData: (url: string, data:any) => Promise<void>;
}

export interface FetchPostHook {
  isLoading: boolean;
  error: Error | null;
  data: any;
  postData: (url: string, data:any) => Promise<void>;
}

export interface FetchDeleteHook {
  isLoading: boolean;
  error: Error | null;
  data: any;
  deleteData: (url: string) => Promise<void>;
}


export interface ApiResponse {
  data: any;
  status: number;
}