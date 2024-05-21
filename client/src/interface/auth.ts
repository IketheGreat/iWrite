export interface UserRes {
    userData: {
      _id: string;
      username: string;
      email: string;
      createdAt: Date;
      updatedAt: Date;
      __v: number;
    };
  }
  
  export interface ApiErrorResponse {
      message: string;
      errors: Record<string, string[]>;
    }
  
  export interface UserData {
    data: UserRes | null;
    status: string;
    error: ApiErrorResponse | unknown;
  }