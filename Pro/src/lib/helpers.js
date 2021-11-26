const bcrypt = require('bcryptjs');

const helpers = {};
// utiliza el modulo de cifrado bcryptjs para cifrar la contraseña 
helpers.encryptPassword = async (password) => {
  // genSalt genera un hash y este se ejecuta la cantidad de veces que se requiera (mas repeticiones mas tiempo)
  const salt = await bcrypt.genSalt(10);
  //se utiliza el metodo hash y se utilizan dos parametros la cadena de caracteres que genero el metodo anterio y la contraseña para que lo cifre basado en esta cadena 
  const hash = await bcrypt.hash(password, salt);
  return hash;
};
//ayuda a verificar la contraseña para permitir entrar al usuario comparando dos strings con ayuda de bcrypt de igual modo 
helpers.matchPassword = async (password, savedPassword) => {
  try {
    return await bcrypt.compare(password, savedPassword);
  } catch (e) {
    console.log(e)
  }
};

module.exports = helpers;