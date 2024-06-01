exports.generateInvoiceNumber = () => {
  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "");
  return `INV${timestamp}-001`;
};

exports.generateInvoiceNumberTopUp = () => {
  const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, "");
  return `INVTOPUP${timestamp}-001`;
};
