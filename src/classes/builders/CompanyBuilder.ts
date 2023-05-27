import randomstring from "randomstring";
import Company from "../../interfaces/Company";

export default class CompanyBuilder {
  date: Date;
  company!: Company;
  constructor(date: Date) {
    this.date = date;
  }
  build(): Company {
    this.company = {
      city: randomstring.generate(8),
      country: "FI",
      dateCreated: this.date,
      dateModified: this.date,
      description:
        '{"fi":"<p>Poikkitieteellinen opiskelijajärjestö, jonka tavoitteena on lisätä yhteisöllisyyttä ja ehkäistä syrjäytymistä.</p>","en":"","sv":""}',
      email: randomstring.generate(6),
      favoritedTimes: 1,
      id: randomstring.generate(36),
      ingress:
        '{"fi":"Poikkitieteellinen tapahtumajärjestäjä","en":"Test company","sv":"Testföretag"}',
      isFavorited: false,
      latitude: 60.1644255,
      longitude: 24.9113595,
      mediaFilename:
        "xl_803649119a4bfd0801769bc69e952676a5aa4a82afdfbfaf657d2348.jpeg",
      name: randomstring.generate(7),
      organizationType: 1,
      phone: randomstring.generate(8),
      postalCode: randomstring.generate(5),
      productCount: 1,
      streetAddress: randomstring.generate(9),
      url: randomstring.generate(10),
    };
    return this.company;
  }
  getCompany(): Company {
    if (!this.company) {
      this.build();
    }
    return this.company;
  }
}
