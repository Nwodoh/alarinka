const pug = require("pug");
const nodemailer = require("nodemailer");

const { EMAIL_FROM, SENDGRID_USERNAME, SENDGRID_PASSWORD } = process.env;

module.exports = class Email {
  #from = `Alarinka <${EMAIL_FROM}>`;

  constructor({ user, place, owner, url, otp }) {
    this.user = user;
    this.owner = owner;
    this.place = place;
    this.to = user.email;
    this.url = url;
    this.otp = otp;
  }

  setProp(prop, newValue) {
    this[prop] = newValue;
    return this;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: SENDGRID_USERNAME,
        pass: SENDGRID_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // SEND actual email
    const html = pug.renderFile(
      `${__dirname}/../emailsTemplates/${template}.pug`,
      {
        user: this.user,
        owner: this.owner,
        place: this.place,
        url: this.url,
        subject,
      }
    );

    const mailOptions = {
      from: this.#from,
      to: this.to,
      subject,
      html,
      text: this.message,
    };

    try {
      await this.newTransport().sendMail(mailOptions);
    } catch (err) {
      console.log(err);
    }
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      `Alarinka password reset code [${this.otp}].  (expires in 20 minutes)`
    );
  }

  async sendEmailVerificationOTP() {
    await this.send(
      "emailVerificationOTP",
      `Alarinka Verification Code [${this.otp}] (expires in 20 minutes)`
    );
  }

  async sendBookedPlace() {
    await this.send(
      "bookPlace",
      `Alarinka booking successful (${this.place.title})`
    );
  }

  async sendBookedMyPlace() {
    await this.send(
      "bookMyPlace",
      `Alarinka - (${this.place.title}) new booking.`
    );
  }

  async acceptedBooking() {
    await this.send(
      "acceptedBooking",
      `Your booking of (${this.place.title}) was accepted.`
    );
  }

  async rejectedBooking() {
    await this.send(
      "rejectedBooking",
      `Your request to book (${this.place.title}) was not accepted.`
    );
  }
};
