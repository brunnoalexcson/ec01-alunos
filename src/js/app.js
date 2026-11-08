class Aluno {
  constructor(nome, idade, curso, notaFinal) {
    this.nome = nome;
    this.idade = idade;
    this.curso = curso;
    this.notaFinal = notaFinal;
  }

  isAprovado() {
    return this.notaFinal >= 7;
  }

  toString() {
    return `${this.nome} | ${this.idade} anos | Curso: ${this.curso} | Nota final: ${this.notaFinal}`;
  }
}

const alunos = [];
let alunoEmEdicao = null;

const formulario = document.getElementById("formulario-aluno");
const campoNome = document.getElementById("nome");
const campoIdade = document.getElementById("idade");
const campoCurso = document.getElementById("curso");
const campoNota = document.getElementById("nota-final");
const mensagemErro = document.getElementById("erro");
const botaoSalvar = document.getElementById("salvar");
const botaoCancelar = document.getElementById("cancelar");
const linhasAlunos = document.getElementById("linhas-alunos");

function indicarErro(campo, mensagem) {
  mensagemErro.textContent = mensagem;
  campo.focus();
  return null;
}

function lerFormulario() {
  const nome = campoNome.value.trim();
  const idade = campoIdade.valueAsNumber;
  const curso = campoCurso.value;
  const notaFinal = campoNota.valueAsNumber;

  if (nome === "") {
    return indicarErro(campoNome, "Informe o nome do aluno.");
  }

  if (!Number.isSafeInteger(idade) || idade < 1) {
    return indicarErro(campoIdade, "Informe uma idade inteira maior que zero.");
  }

  if (!["JavaScript", "Python", "Java"].includes(curso)) {
    return indicarErro(campoCurso, "Selecione JavaScript, Python ou Java.");
  }

  if (!Number.isFinite(notaFinal)) {
    return indicarErro(campoNota, "Informe uma nota final.");
  }

  return { nome, idade, curso, notaFinal };
}

function voltarAoCadastro() {
  alunoEmEdicao = null;
  formulario.reset();
  mensagemErro.textContent = "";
  botaoSalvar.textContent = "Cadastrar";
  botaoCancelar.hidden = true;
  campoNome.focus();
}

function editarAluno(aluno) {
  alunoEmEdicao = aluno;
  campoNome.value = aluno.nome;
  campoIdade.value = aluno.idade;
  campoCurso.value = aluno.curso;
  campoNota.value = aluno.notaFinal;
  mensagemErro.textContent = "";
  botaoSalvar.textContent = "Salvar";
  botaoCancelar.hidden = false;
  campoNome.focus();
}

function excluirAluno(aluno) {
  const indice = alunos.indexOf(aluno);
  if (indice === -1) return;

  alunos.splice(indice, 1);
  if (alunoEmEdicao === aluno) {
    voltarAoCadastro();
  }
  renderizarTabela();
}

function renderizarTabela() {
  linhasAlunos.replaceChildren();

  if (alunos.length === 0) {
    const celula = linhasAlunos.insertRow().insertCell();
    celula.colSpan = 5;
    celula.textContent = "Nenhum aluno cadastrado.";
    return;
  }

  alunos.forEach(function (aluno) {
    const linha = linhasAlunos.insertRow();
    linha.insertCell().textContent = aluno.nome;
    linha.insertCell().textContent = aluno.idade;
    linha.insertCell().textContent = aluno.curso;
    linha.insertCell().textContent = aluno.notaFinal;

    const acoes = linha.insertCell();
    const editar = document.createElement("button");
    editar.type = "button";
    editar.textContent = "Editar";
    editar.onclick = function () {
      editarAluno(aluno);
    };

    const excluir = document.createElement("button");
    excluir.type = "button";
    excluir.textContent = "Excluir";
    excluir.onclick = function () {
      excluirAluno(aluno);
    };

    acoes.append(editar, " ", excluir);
  });
}

botaoSalvar.onclick = function (evento) {
  evento.preventDefault();

  const dados = lerFormulario();
  if (dados === null) return;

  if (alunoEmEdicao === null) {
    const { nome, idade, curso, notaFinal } = dados;
    alunos.push(new Aluno(nome, idade, curso, notaFinal));
  } else {
    Object.assign(alunoEmEdicao, dados);
  }

  renderizarTabela();
  voltarAoCadastro();
};

botaoCancelar.onclick = voltarAoCadastro;

renderizarTabela();