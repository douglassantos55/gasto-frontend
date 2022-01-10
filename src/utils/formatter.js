class Formater {
  constructor() {
    this.currencyFormatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    this.periodFormatter = new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "long",
    });
  }

  currency(value) {
    return this.currencyFormatter.format(value);
  }

  period({ month, year }) {
    return this.periodFormatter.format(new Date(year, month - 1));
  }
}

export default new Formater();
