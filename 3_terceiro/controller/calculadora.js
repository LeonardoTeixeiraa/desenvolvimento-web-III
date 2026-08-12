function obterNumeros(req, res) {
  const { num1, num2 } = req.body || {};

  if (!Number.isFinite(num1) || !Number.isFinite(num2)) {
    res
      .status(400)
      .json({
        status: "erro",
        mensagem: "Os valores fornecidos não são números válidos.",
      });
    return null;
  }
  return { num1, num2 };
}

function somar(req, res) {
  const numeros = obterNumeros(req, res);
  if (!numeros) return null;

  const resultado = numeros.num1 + numeros.num2;
  res.json({ status: "ok", resultado });
}

function subtrair(req, res) {
  const numeros = obterNumeros(req, res);
  if (!numeros) return null;

  const resultado = numeros.num1 - numeros.num2;
  res.json({ status: "ok", resultado });
}

function multiplicar(req, res) {
  const numeros = obterNumeros(req, res);
  if (!numeros) return null;

  const resultado = numeros.num1 * numeros.num2;
  res.json({ status: "ok", resultado });
}

function dividir(req, res) {
  const numeros = obterNumeros(req, res);
  if (!numeros) return null;

  if (numeros.num2 === 0) {
    res
      .status(400)
      .json({ status: "erro", mensagem: "Não é possível dividir por zero." });
    return null;
  }

  const resultado = numeros.num1 / numeros.num2;
  res.json({ status: "ok", resultado });
}

module.exports = {
  soma: somar,
  subtracao: subtrair,
  multiplicacao: multiplicar,
  divisao: dividir,
};
