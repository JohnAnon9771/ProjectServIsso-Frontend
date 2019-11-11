import React, { useState, useEffect } from "react";

import api from "../../../services/api";

import MaterialTable from "material-table";

function RegisterPosts() {
  const [posts, setPosts] = useState([]);
  const table = {
    columns: [
      { title: "Empresa", field: "empresa" },
      { title: "Cidade", field: "cidade" },
      { title: "Descrição", field: "descrição" },
      { title: "Categoria", field: "categoria" }
    ],
    data: posts.map(post => {
      return {
        empresa: post.company,
        cidade: post.city,
        descrição: post.description,
        categoria: post.category
      };
    })
  };
  useEffect(() => {
    async function getPosts() {
      const response = await api.get("/posts/index");
      setPosts(response.data);
    }
    getPosts();
  }, []);

  return (
    <MaterialTable
      title="Cadastro de Posts"
      columns={table.columns}
      data={table.data}
      editable={{
        onRowAdd: newData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setPosts(prevState => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setPosts(prevState => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: oldData =>
          new Promise(resolve => {
            setTimeout(() => {
              resolve();
              setPosts(prevState => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          })
      }}
    />
  );
}

export default RegisterPosts;
