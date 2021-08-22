const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const myEmail = process.env.EMAIL;
const myPassword = process.env.PASSWORD;

router.post('/', async (req, res) => {
	const output = `
          <p>You have a new contact request</p>
          <h3>Contact Details</h3>
          <ul>  
            <li>name: ${req.body.name}</li>
            <li>email: ${req.body.email}</li>
            <li>subject: ${req.body.subject}</li>
          </ul>
          <h3>message</h3>
          <p>${req.body.message}</p>
        `;

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: myEmail,
			pass: myPassword,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	let mailOptions = {
		from: myEmail,
		to: 'kudziemadzongwe6@gmail.com',
		subject: 'Contact request',
		html: output,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			res.json('Thank you, your email has been sent');
			console.log('Email sent: ' + info.response);
		}
	});
});

router.post('/quote', async (req, res) => {
	const output = `
          <p>You have a new quote request</p>
          <h3>Quote Details</h3>
          <ul>  
            <li>name: ${req.body.name}</li>
            <li>email: ${req.body.email}</li>
            <li>departure: ${req.body.departure}</li>
            <li>arrival: ${req.body.arrival}</li>
            <li>method: ${req.body.method}</li>
          </ul>
          <h3>description</h3>
          <p>${req.body.description}</p>
        `;

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: myEmail,
			pass: myPassword,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	let mailOptions = {
		from: myEmail,
		to: 'kudziemadzongwe6@gmail.com',
		subject: 'Contact request',
		html: output,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			res.json('Thank you, your email has been sent');
			console.log('Email sent: ' + info.response);
		}
	});
});

router.post('/newsletter', async (req, res) => {
	const output = `
          <p>You have a new newsletter subscription</p>
          <h3>Newsletter Subscription</h3>
          <ul>  
            <li>Email: ${req.body.email}</li>
          </ul>
        `;

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: myEmail,
			pass: myPassword,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	let mailOptions = {
		from: myEmail,
		to: 'kudziemadzongwe6@gmail.com',
		subject: 'Newsletter Subscription',
		html: output,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			res.json('Thank you, your email has been sent');
			console.log('Email sent: ' + info.response);
		}
	});
});

router.post('/newsletter', async (req, res) => {
	const output = `
          <p>You have a new newsletter subscription</p>
          <h3>Newsletter Subscription</h3>
          <ul>  
            <li>Email: ${req.body.email}</li>
          </ul>
        `;

	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: myEmail,
			pass: myPassword,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	let mailOptions = {
		from: myEmail,
		to: 'kudziemadzongwe6@gmail.com',
		subject: 'Newsletter Subscription',
		html: output,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			res.json('Thank you, your email has been sent');
			console.log('Email sent: ' + info.response);
		}
	});
});

module.exports = router;
