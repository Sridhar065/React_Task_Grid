import CommonHelper from "./commonHelper";

const commonCall = new CommonHelper();

export default class ValidationHelper {
  constructor(rule) {
    this.rule = rule;
    this.form_error = {};
    this.error = false;
  }

  async validate(thisProps) {
    this.error = false;
    for (var field in this.rule) {
      await this.checkFieldRule(thisProps, field);
    }

    return { status: this.error, form_error: this.form_error };
  }

  async checkFieldRule(thisProps, field) {
    let checkRule = false;
    let message = "";

    for (var rule in this.rule[field]) {
      // eslint-disable-next-line
      switch (rule) {
        case "required": {
          checkRule = await this.isRequired(field, thisProps);
          break;
        }
        case "minLength": {
          checkRule = await this.checkMinLength(field, thisProps);
          break;
        }
        case "maxLength": {
          checkRule = await this.checkMaxLength(field, thisProps);
          break;
        }
        case "mail": {
          checkRule = await this.isMail(field, thisProps);
          break;
        }
        case "numeric": {
          checkRule = await this.isNumeric(field, thisProps);
          break;
        }
        case "max": {
          checkRule = await this.maxValue(field, thisProps);
          break;
        }
        case "min": {
          checkRule = await this.minValue(field, thisProps);
          break;
        }
        case "equalTo": {
          checkRule = await this.CheckEqual(field, thisProps);
          break;
        }
        case "isAlpha": {
          checkRule = await this.isAlpaOnly(field, thisProps);
          break;
        }
        case "website": {
          checkRule = await this.isUrl(field, thisProps);
          break;
        }
      }
      if ((await this.checkFieldIsEmpty(message)) || message === false) {
        message = checkRule;
      }
    }
    await this.setErrorMessage(field, message);

    if (message) {
      this.error = true;
    }

    return message;
  }

  async fieldOnlyValidation(thisProps, field) {
    let form_error = thisProps.form_error;
    let message = await this.checkFieldRule(thisProps, field);
    form_error[field] = message;

    return { status: this.error, form_error: this.form_error };
  }

  async CheckEqual(field, stateProps) {
    if (await this.checkFieldIsEmpty(stateProps[field])) {
      return false;
    }
    if (stateProps[field] !== stateProps[this.rule[field].equalTo.condition]) {
      return this.rule[field].equalTo.message;
    }
    return false;
  }

  async maxValue(field, stateProps) {
    if (await this.checkFieldIsEmpty(stateProps[field])) {
      return false;
    }
    if (stateProps[field] * 1 > this.rule[field].max.condition) {
      return this.rule[field].max.message;
    }
    return false;
  }

  async minValue(field, stateProps) {
    if (await this.checkFieldIsEmpty(stateProps[field])) {
      return false;
    }
    if (stateProps[field] * 1 < this.rule[field].min.condition) {
      return this.rule[field].min.message;
    }
    return false;
  }

  async isNumeric(field, stateProps) {
    if (await this.checkFieldIsEmpty(stateProps[field])) {
      return this.rule[field].numeric.reqMessage;
    }
    if (parseInt(stateProps[field]) * 1 <= 0) {
      return this.rule[field].numeric.message;
    }
    return false;
  }

  async isRequired(field, stateProps) {
    if (commonCall.isArray(stateProps[field])) {
      if (stateProps[field].length === 0) {
        return this.rule[field].required.message;
      }
    } else if (await this.checkFieldIsEmpty(stateProps[field])) {
      return this.rule[field].required.message;
    }
    return false;
  }

  async checkMinLength(field, stateProps) {
    if (await this.checkFieldIsEmpty(stateProps[field])) {
      return false;
    }
    if (stateProps[field].length < this.rule[field].minLength.condition) {
      return this.rule[field].minLength.message;
    }
    return false;
  }

  async checkMaxLength(field, stateProps) {
    if (await this.checkFieldIsEmpty(stateProps[field])) {
      return false;
    }
    if (stateProps[field].length > this.rule[field].maxLength.condition) {
      return this.rule[field].maxLength.message;
    }
    return false;
  }

  async isMail(field, stateProps) {
    // eslint-disable-next-line
    let patten = /^\w+([\.-]\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (await this.checkFieldIsEmpty(stateProps[field])) {
      return false;
    }

    if (stateProps[field].match(patten)) {
      return false;
    }
    return this.rule[field].mail.message;
  }

  async isAlpaOnly(field, stateProps) {
    let patten = /^[a-zA-Z]+(\s[a-zA-Z]+)*?$/;

    if (await this.checkFieldIsEmpty(stateProps[field])) {
      return false;
    }

    if (stateProps[field].match(patten)) {
      return false;
    }
    return this.rule[field].isAlpha.message;
  }
  async isUrl(field, stateProps) {
    // eslint-disable-next-line
    let pattern = /^(http|https)?:\/\/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    // eslint-disable-next-line
    // let pattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/g;

    if (await this.checkFieldIsEmpty(stateProps[field])) {
      return false;
    }

    if (stateProps[field].match(pattern)) {
      return false;
    }
    return this.rule[field].website.message;
  }

  setErrorMessage(field, message) {
    this.form_error[field] = message;
  }

  checkFieldIsEmpty(value) {
    if (value === "" || value === undefined || value == null) {
      return true;
    }
    return false;
  }
}
