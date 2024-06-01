// controllers/transactionController.js
const { validationResult } = require("express-validator");
const { createTransaction } = require("../models/transactionModels");
const { getServiceTarif } = require("../models/servicesModels");
const { getUserBalance } = require("../models/balanceModels");
const { generateInvoiceNumber } = require("../helpers/helpers");

const createTransactionHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ status: 400, message: "Bad Request", errors: errors.array() });
  }

  const { service_code } = req.body;
  const userId = req.userId;

  try {
    // Verifikasi token dan periksa saldo
    const balance = await getUserBalance(userId);
    if (balance === null) {
      return res
        .status(400)
        .json({ status: 400, message: "Saldo tidak ditemukan", data: null });
    }

    // Periksa service_code valid
    const serviceInfo = await getServiceTarif(service_code);
    if (!serviceInfo) {
      return res.status(400).json({
        status: 102,
        message: "Service atau Layanan tidak ditemukan",
        data: null,
      });
    }

    // Hitung total_amount berdasarkan service_tarif
    const total_amount = serviceInfo.service_tarif;

    if (balance < total_amount) {
      return res
        .status(400)
        .json({ status: 400, message: "Saldo tidak mencukupi", data: null });
    }

    // Lakukan transaksi
    const invoice_number = generateInvoiceNumber();

    // Simpan transaksi ke database
    const success = await createTransaction(
      userId,
      service_code,
      invoice_number,
      total_amount
    );

    if (!success) {
      return res.status(500).json({
        status: 500,
        message: "Terjadi kesalahan dalam melakukan transaksi",
        data: null,
      });
    }

    // Response transaksi berhasil
    res.status(200).json({
      status: 0,
      message: "Transaksi berhasil",
      data: {
        invoice_number,
        service_code,
        service_name: serviceInfo.service_name,
        transaction_type: "PAYMENT",
        total_amount,
        created_on: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("Error in transaction:", error);
    res.status(500).json({
      status: 500,
      message: "Terjadi kesalahan dalam melakukan transaksi",
      data: null,
    });
  }
};

module.exports = { createTransactionHandler };
