import emailjs from "emailjs-com";

export interface ChangeNewEmailType extends Record<string, string> {
  username: string;
  toEmail: string;
  newEmail: string;
  verificationCode: string;
}

export class SendEmail<T extends Record<string, string>> {
  private serviceID: string = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  private userID: string = import.meta.env.VITE_EMAILJS_USER_ID;
  private templateID: string = "";
  
  constructor() { emailjs.init(this.userID); }

  setServiceID(serviceID: string) {
    this.serviceID = serviceID;
    return this;
  }

  setTemplateID(templateID: string) {
    this.templateID = templateID;
    return this;
  }

  async send(params: T) {
    if (this.templateID == "") {
      throw new Error("the template ID is missing!");
    }
    const result = await emailjs.send(this.serviceID, this.templateID, params);
    return result; 
  }
};