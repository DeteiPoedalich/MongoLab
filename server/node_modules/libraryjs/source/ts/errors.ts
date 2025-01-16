//Errors manager
class Errors {

  errors:Array<any> = [];
  exists:boolean = false;

  addError(message?, code?) {
    var f = this;

    message = message || "Unknown error";
    code = code || 0;

    f.errors.push({
      message: message,
      code: code
    });

    f.exists = true;

    return f;
  }

  checkError(code) {
    var f = this;

    for(let error of f.errors) {
      if (error.code === code) return true;
    }

    return false;
  }

  getErrors() {
    var f = this;

    if (!f.exists) return "";

    let errors = "", i = 0;
    for(let error of f.errors) {
      errors += `[${i+1}] Error`;

      if (error.code) 
      errors += ` ${error.code}`;

      errors += ": " + error.message;

      i++; if (i === f.errors.length) break;
      errors += "\n";
    }
    return errors;
  }

  exportErrors() {
    var f = this;

    return {
      error: f.exists,
      errors: f.errors
    }
  }

  importErrors(res) {
    var f = this;

    f.exists = res.error;
    if (f.exists) {
      f.errors = res.errors;
    }

    return f;
  }

}