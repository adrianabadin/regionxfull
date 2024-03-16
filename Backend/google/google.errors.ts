export abstract class GoogleError extends Error {
    constructor (public ErrorContent?: any, public message: string = 'Generic Google Error', public code: number = 2000) {
      super(message)
      this.name = 'Google Error'
      this.message = message
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, GoogleError)
      }
    }
  }
 export class DocumentCreateError extends GoogleError{
    public text: string
    constructor (public ErrorContent?: any, public message: string = 'Error al crear el documento', public code: number = 2001) {
      super(ErrorContent, message, code)
      this.text = message
      this.name = 'Document create error'
    }

 }
 export class InvalidCredentials extends GoogleError
 {
  public text: string
  constructor (public ErrorContent?: any, public message: string = 'Credenciales invalidas', public code: number = 2003) {
    super(ErrorContent, message, code)
    this.text = message
    this.name = 'Invalid Credentials'
  }

}
 export function invalidCredentials(error:Error){
  if ("status" in error && error.status===401) return new InvalidCredentials()
}
 export class DocumentUpdateError extends GoogleError{
    public text: string
    constructor (public ErrorContent?: any, public message: string = 'Error al actualizar el documento', public code: number = 2002) {
      super(ErrorContent, message, code)
      this.text = message
      this.name = 'Document ùpdate error'
    }

 }
  export class TokenError extends GoogleError {
    public text: string
    constructor (public ErrorContent?: any, public message: string = 'El token es invalido intente reautenticar', public code: number = 1001) {
      super(ErrorContent, message, code)
      this.text = message
      this.name = 'Token Error'
    }
  }
  
  export class UnknownGoogleError extends GoogleError {
    public text: string
  
    constructor (public ErrorContent: any, public message: string = 'Error Desconocido de Google', public code: number = 1000) {
      super(ErrorContent, message, code)
      this.text = message
      this.name = 'Unknown Google Error'
    }
  }
  
  export class NeverAuthError extends GoogleError {
    public text: string
  
    constructor (public ErrorContent?: any, public message: string = 'No existe el refresh token en la base de datos', public code: number = 1002) {
      super(ErrorContent, message, code)
      this.text = message
      this.name = 'Never Authenticated Error'
    }
  }
  
  export class FolderCreateError extends GoogleError {
    public text: string
  
    constructor (ErrorContent?: any, public message: string = 'Error al crear la carpeta en Google Drive', public code: number = 1003) {
      super(ErrorContent, message, code)
      this.text = message
      this.name = 'Folder Create Error'
    }
  }
  
  export class FileCreateError extends GoogleError {
    public text: string
  
    constructor (public ErrorContent?: any, public message: string = 'Error al crear el archivo en Google Drive', public code: number = 1004) {
      super(ErrorContent, message, code)
      this.text = message
      this.name = 'File Create Error'
    }
  }
  
  export class PermissionsCreateError extends GoogleError {
    public text: string
  
    constructor (public ErrorContent?: any, public message: string = 'Error al asignar los permisos en Google Drive', public code: number = 1005) {
      super(ErrorContent, message, code)
      this.text = message
      this.name = 'Permissions Create Error'
    }
  }
  export class VideoCreateError extends GoogleError {
    public text: string
    constructor (public ErrorContent?: any, public message: string = 'Error al crear el video en youtube', public code: number = 1006) {
      super(ErrorContent, message, code)
      this.text = message
      this.name = 'Video Create Error'
    }
  }
  export class QuotaExceededError extends GoogleError {
    public text: string
    constructor (public ErrorContent?: any, public message: string = 'Se ha exedido la quota de Youtube carga el link de tu video para continuar', public code: number = 1007) {
      super(ErrorContent, message, code)
      this.text = message
      this.name = 'Quota Exceeded Error'
    }
  }
