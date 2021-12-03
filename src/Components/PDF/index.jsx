import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

const PDF = (donator, donations, unities, job) => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  const donData = donations.map((value) => {
    let stringDate;

    if (value.data) {
      const string = JSON.stringify(value.data);
      const year = string.slice(1, 5);
      const month = string.slice(6, 8) + "-";
      const day = string.slice(9, 11) + "-";
      stringDate = day + month + year;
    }

    let unityId = value.orgao_coletor_id;
    let unityName;

    if (unities) {
      unityName = unities.map((value) => {
        if (value.id === unityId) return value.nome;
        return null;
      });
    }

    return [
      { text: stringDate, margin: [0, 2, 0, 2] },
      { text: `${value.volume} ml`, margin: [0, 2, 0, 2] },
      { text: unityName, margin: [0, 2, 0, 2] },
    ];
  });

  const data = [
    {
      text:
        donator.genero === "Masculino"
          ? "Dados do doador"
          : donator.genero === "Feminino"
          ? "Dados da doadora"
          : "Dados do(a) doador(a)",
      fontSize: 16,
      bold: true,
      margin: [0, 0, 0, 15],
      alignment: "center",
    },
    {
      table: {
        widths: [150, "*"],
        body: [
          [{ text: "Nome", bold: true }, `${donator.nome}`],

          [{ text: "Gênero", bold: true }, `${donator.genero}`],

          [
            { text: "Data de nascimento", bold: true },
            `${donator.data_de_nascimento}`,
          ],

          [
            { text: "RG", bold: true },
            `${donator.rg.toString().slice(0, 2)}.${donator.rg
              .toString()
              .slice(2, 5)}.${donator.rg.toString().slice(5, 8)}`,
          ],

          [
            { text: "Orgão expedidor", bold: true },
            `${donator.orgao_expeditor_rg}`,
          ],

          [{ text: "Naturalidade", bold: true }, `${donator.naturalidade}`],

          [{ text: "Estado cívil", bold: true }, `${donator.estado_civil}`],

          [{ text: "Profissão", bold: true }, `${job}`],

          [{ text: "Nome do pai", bold: true }, `${donator.filiacao_pai}`],

          [{ text: "Nome da mãe", bold: true }, `${donator.filiacao_mae}`],

          [
            { text: "Grupo sanguíneo / RH", bold: true },
            `${donator.grupo_sanguineo}${donator.rh_sanguineo ? "+" : "-"}`,
          ],

          [
            { text: "Doador de medula?", bold: true },
            `${donator.doador_de_medula ? "Sim" : "Não"}`,
          ],

          [{ text: "Logradouro", bold: true }, `${donator.rua}`],

          [
            { text: "Número residencial", bold: true },
            `${donator.numero_residencia}`,
          ],

          [{ text: "Bairro", bold: true }, `${donator.bairro}`],

          [{ text: "Cidade", bold: true }, `${donator.cidade}`],

          [{ text: "Estado", bold: true }, `${donator.estado}`],

          [{ text: "CEP", bold: true }, `${donator.cep}`],

          [{ text: "Email", bold: true }, `${donator.email}`],

          [
            { text: "Telefone1", bold: true },
            `${
              donator.telefone1.length === 11
                ? `(${donator.telefone1.slice(0, 2)}) ${donator.telefone1.slice(
                    2,
                    7
                  )}-${donator.telefone1.slice(7, 11)}`
                : `(${donator.telefone1.slice(0, 2)}) ${donator.telefone1.slice(
                    2,
                    6
                  )}-${donator.telefone1.slice(6, 10)}`
            }`,
          ],

          [
            { text: "Telefone2", bold: true },
            `${
              donator.telefone2
                ? donator.telefone2.length === 11
                  ? `(${donator.telefone2.slice(
                      0,
                      2
                    )}) ${donator.telefone2.slice(
                      2,
                      7
                    )}-${donator.telefone2.slice(7, 11)}`
                  : `(${donator.telefone2.slice(
                      0,
                      2
                    )}) ${donator.telefone2.slice(
                      2,
                      6
                    )}-${donator.telefone2.slice(6, 10)}`
                : "Não informado"
            }`,
          ],

          [
            { text: "Telefone3", bold: true },
            `${
              donator.telefone3
                ? donator.telefone3.length === 11
                  ? `(${donator.telefone3.slice(
                      0,
                      2
                    )}) ${donator.telefone3.slice(
                      2,
                      7
                    )}-${donator.telefone3.slice(7, 11)}`
                  : `(${donator.telefone3.slice(
                      0,
                      2
                    )}) ${donator.telefone3.slice(
                      2,
                      6
                    )}-${donator.telefone3.slice(6, 10)}`
                : "Não informado"
            }`,
          ],
        ],
      },
    },
    {
      text:
        donator.genero === "Masculino"
          ? "Doações do doador"
          : donator.genero === "Feminino"
          ? "Doações da doadora"
          : "Doações do(a) doador(a)",
      fontSize: 16,
      bold: true,
      margin: [0, 25, 0, 15],
      alignment: "center",
    },
    {
      table: {
        headerRows: 1,
        widths: ["*", "*", "*"],
        body: [
          [
            { text: "Data", bold: true },
            { text: "Volume", bold: true },
            { text: "Unidade de coleta", bold: true },
          ],
          ...donData,
        ],
      },
      layout: "headerLineOnly",
    },
  ];

  const definitions = {
    pageSize: "A4",
    pageMargins: [30, 15, 30, 15],
    content: [data],
  };

  pdfMake.createPdf(definitions).download(`Dados_${donator.nome}`);
};

export default PDF;
