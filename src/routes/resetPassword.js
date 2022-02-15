const nodemailer = require("nodemailer");
const { Router } = require("express");
const { Viewers } = require("../db");
const router = Router();

router.post("/", async (req, res, next) => {
  const { email } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "elena.wuckert95@ethereal.email",
      pass: "R2MdTagJTnnFFazbGQ",
    },
  });

  // Front => en Login(Viewer/Theater) => "Olvide mi contraseña" => Componente "ingrese su Email" dispatch action -
  // que envie un mail{Viewer.name, link que va a resetPassword/:id}  => componente reset password - dos inputs "password" "confirmPass"
  //action = put.Viewer => redirige a login(viewer/theater)
  let viewerToReset = await Viewers.findAll({
    where: {
      email: email,
    },
  });

  console.log(viewerToReset);
  viewerToReset.map((el) => {
    let mailOption = {
      from: "A Sala Llena",
      to: `${el.email}`,
      subject: "Recupera tu contraseña",
      // text: `Hola ${el.name} no te pierdas este show en el teatro`,
      html: `<h3>Hola ${el.name}</h3> en el siguiente link podras recuperar tu contraseña </br>
        <a>www.asalallena/resetpassword/${el.id}</a> </br>
        <h4>Sino solicitaste un cambio de contraseña, desestima este correo electronico</h4>`,
    };

    transporter.sendMail(mailOption, (error, info) => {
      if (error) {
        res.status(500).send(error.message);
      } else {
        res.status(200).json(req.body);
      }
    });
  });
});

module.exports = router;