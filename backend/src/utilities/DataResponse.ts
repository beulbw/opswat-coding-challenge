export class DataResponse {
  declare code: number;
  declare result: any;
  declare message: string;
  declare description: string | undefined;

  constructor(
    code: number,
    result: any,
    message: string,
    description?: string
  ) {
    this.code = code;
    this.result = result;
    this.message = message;
    this.description = description;
  }

  static Builder = class {
    declare code: number;
    declare result: any;
    declare message: string;
    declare description: string | undefined;

    withCode(code: number) {
      this.code = code;
      return this;
    }

    withResult(result: any) {
      this.result = result;
      return this;
    }

    withMessage(message: string) {
      this.message = message;
      return this;
    }

    withDescription(description?: string) {
      this.description = description;
      return this;
    }

    build() {
      return new DataResponse(
        this.code,
        this.result,
        this.message,
        this.description
      );
    }
  };
}

export const CommonResponse = {
  SUCCESSFUL: new DataResponse.Builder()
    .withCode(200)
    .withMessage("Action completed successfully")
    .build(),
  FAILED: new DataResponse.Builder()
    .withCode(200)
    .withMessage("Action completed successfully")
    .build(),
  CREATED: new DataResponse.Builder()
    .withCode(201)
    .withMessage("Object created successfully")
    .build(),
};
